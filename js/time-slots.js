/**
 * Time Slots Module
 * Handles customizable time slots functionality
 */

document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const addTaskBtn = document.getElementById("addTaskBtn");
  const addTaskModal = document.getElementById("addTaskModal");
  const closeAddTaskModal = document.getElementById("closeAddTaskModal");
  const addTaskForm = document.getElementById("addTaskForm");

  // Initialize time slots functionality
  initTimeSlots();

  /**
   * Initialize time slots functionality
   */
  function initTimeSlots() {
    // Add event listeners
    if (addTaskBtn) {
      addTaskBtn.addEventListener("click", openAddTaskModal);
    }

    if (closeAddTaskModal) {
      closeAddTaskModal.addEventListener("click", closeModal);
    }

    if (addTaskForm) {
      addTaskForm.addEventListener("submit", addNewTask);
    }

    // Close modal when clicking outside
    window.addEventListener("click", function (e) {
      if (e.target === addTaskModal) {
        closeModal();
      }
    });

    // Make time slots editable
    makeTimeSlotsEditable();
  }

  /**
   * Make time slots editable with time pickers
   */
  function makeTimeSlotsEditable() {
    // Get all time slot elements
    const timeSlots = document.querySelectorAll(".time-slot");

    timeSlots.forEach((timeSlot) => {
      timeSlot.addEventListener("dblclick", function (e) {
        e.stopPropagation();

        // Get current time range
        const timeRange = this.textContent.trim();
        const [startTime, endTime] = timeRange
          .split(" - ")
          .map((t) => t.trim());

        // Create time editor
        const timeEditor = document.createElement("div");
        timeEditor.className = "time-editor flex items-center";
        timeEditor.innerHTML = `
          <input type="time" class="start-time" value="${convertTo24Hour(
            startTime
          )}">
          <span class="mx-1">-</span>
          <input type="time" class="end-time" value="${convertTo24Hour(
            endTime
          )}">
          <button type="button" class="save-time-btn ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded">Save</button>
        `;

        // Replace time slot with editor
        this.innerHTML = "";
        this.appendChild(timeEditor);

        // Focus on start time input
        timeEditor.querySelector(".start-time").focus();

        // Add event listener for save button
        timeEditor
          .querySelector(".save-time-btn")
          .addEventListener("click", function () {
            saveTimeSlot(timeSlot);
          });

        // Add event listeners for enter key
        timeEditor
          .querySelector(".start-time")
          .addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
              saveTimeSlot(timeSlot);
            }
          });

        timeEditor
          .querySelector(".end-time")
          .addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
              saveTimeSlot(timeSlot);
            }
          });
      });
    });
  }

  /**
   * Save time slot changes
   * @param {HTMLElement} timeSlot - The time slot element
   */
  function saveTimeSlot(timeSlot) {
    // Get time inputs
    const startTimeInput = timeSlot.querySelector(".start-time");
    const endTimeInput = timeSlot.querySelector(".end-time");

    if (!startTimeInput || !endTimeInput) return;

    // Get values
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;

    if (!startTime || !endTime) {
      alert("Please enter both start and end times.");
      return;
    }

    // Convert to 12-hour format
    const formattedStartTime = convertTo12Hour(startTime);
    const formattedEndTime = convertTo12Hour(endTime);

    // Update time slot text
    timeSlot.textContent = `${formattedStartTime} - ${formattedEndTime}`;

    // Get day and index
    const row = timeSlot.closest("tr");
    const tbody = row.closest("tbody");
    const rowIndex = Array.from(tbody.querySelectorAll("tr")).indexOf(row);

    // Get active day
    const activeDay = document.querySelector(".day-selector-btn.bg-sky-600")
      .dataset.day;

    // Update data
    updateTimeSlot(
      activeDay,
      rowIndex,
      `${formattedStartTime} - ${formattedEndTime}`
    );
  }

  /**
   * Update time slot in data
   * @param {string} day - The day (mon, tue, etc.)
   * @param {number} index - The index of the task
   * @param {string} newTime - The new time range
   */
  function updateTimeSlot(day, index, newTime) {
    // Get user data
    const userData = getUserData();

    // Ensure dailySchedule exists
    if (!userData.dailySchedule) {
      userData.dailySchedule = JSON.parse(
        JSON.stringify(scheduleData.dailySchedule)
      );
    }

    // Ensure day exists
    if (!userData.dailySchedule[day]) {
      userData.dailySchedule[day] = JSON.parse(
        JSON.stringify(scheduleData.dailySchedule[day])
      );
    }

    // Update time
    userData.dailySchedule[day][index].time = newTime;

    // Save user data
    saveUserData(userData);

    // Log activity
    logActivity("timeSlotUpdated", { day, index, newTime });
  }

  /**
   * Open add task modal
   */
  function openAddTaskModal() {
    if (addTaskModal) {
      addTaskModal.classList.remove("hidden");

      // Set default values
      const taskDay = document.getElementById("taskDay");
      const taskStartTime = document.getElementById("taskStartTime");
      const taskEndTime = document.getElementById("taskEndTime");

      if (taskDay) {
        // Set to active day
        const activeDay = document.querySelector(".day-selector-btn.bg-sky-600")
          .dataset.day;
        taskDay.value = activeDay;
      }

      if (taskStartTime && taskEndTime) {
        // Set default times
        const now = new Date();
        const startHour = now.getHours();
        const endHour = (startHour + 1) % 24;

        taskStartTime.value = `${startHour.toString().padStart(2, "0")}:00`;
        taskEndTime.value = `${endHour.toString().padStart(2, "0")}:00`;
      }
    }
  }

  /**
   * Close modal
   */
  function closeModal() {
    if (addTaskModal) {
      addTaskModal.classList.add("hidden");
    }
  }

  /**
   * Add new task
   * @param {Event} e - The submit event
   */
  function addNewTask(e) {
    e.preventDefault();

    // Get form values
    const taskDay = document.getElementById("taskDay").value;
    const taskStartTime = document.getElementById("taskStartTime").value;
    const taskEndTime = document.getElementById("taskEndTime").value;
    const taskActivity = document.getElementById("taskActivity").value;
    const taskNotes = document.getElementById("taskNotes").value;

    // Validate inputs
    if (!taskDay || !taskStartTime || !taskEndTime || !taskActivity) {
      alert("Please fill in all required fields.");
      return;
    }

    // Format time range
    const formattedStartTime = convertTo12Hour(taskStartTime);
    const formattedEndTime = convertTo12Hour(taskEndTime);
    const timeRange = `${formattedStartTime} - ${formattedEndTime}`;

    // Create new task
    const newTask = {
      time: timeRange,
      activity: taskActivity,
      notes: taskNotes || "",
      completed: false,
    };

    // Add task to data
    addTaskToSchedule(taskDay, newTask);

    // Close modal
    closeModal();

    // Refresh schedule if current day is selected
    const activeDay = document.querySelector(".day-selector-btn.bg-sky-600")
      .dataset.day;
    if (activeDay === taskDay) {
      populateDailySchedule(activeDay);
    }

    // Reset form
    addTaskForm.reset();
  }

  /**
   * Add task to schedule
   * @param {string} day - The day (mon, tue, etc.)
   * @param {Object} task - The task object
   */
  function addTaskToSchedule(day, task) {
    // Get user data
    const userData = getUserData();

    // Ensure dailySchedule exists
    if (!userData.dailySchedule) {
      userData.dailySchedule = JSON.parse(
        JSON.stringify(scheduleData.dailySchedule)
      );
    }

    // Ensure day exists
    if (!userData.dailySchedule[day]) {
      userData.dailySchedule[day] = JSON.parse(
        JSON.stringify(scheduleData.dailySchedule[day])
      );
    }

    // Add task
    userData.dailySchedule[day].push(task);

    // Sort tasks by time
    userData.dailySchedule[day].sort((a, b) => {
      const aStartTime = a.time.split(" - ")[0];
      const bStartTime = b.time.split(" - ")[0];

      return (
        convertTimeToMinutes(aStartTime) - convertTimeToMinutes(bStartTime)
      );
    });

    // Save user data
    saveUserData(userData);

    // Log activity
    logActivity("taskAdded", { day, task });
  }

  /**
   * Convert time to minutes for sorting
   * @param {string} time - Time in 12-hour format (e.g., "06:00 AM")
   * @returns {number} Minutes since midnight
   */
  function convertTimeToMinutes(time) {
    // Parse time
    const [hourMinute, period] = time.split(" ");
    let [hours, minutes] = hourMinute.split(":").map(Number);

    // Convert to 24-hour format
    if (period === "PM" && hours < 12) {
      hours += 12;
    } else if (period === "AM" && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  }

  /**
   * Convert time from 24-hour to 12-hour format
   * @param {string} time - Time in 24-hour format (e.g., "14:30")
   * @returns {string} Time in 12-hour format (e.g., "02:30 PM")
   */
  function convertTo12Hour(time) {
    if (!time) return "";

    const [hours, minutes] = time.split(":").map(Number);

    let period = "AM";
    let hour = hours;

    if (hours >= 12) {
      period = "PM";
      hour = hours === 12 ? 12 : hours - 12;
    }

    hour = hour === 0 ? 12 : hour;

    return `${hour
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;
  }

  /**
   * Convert time from 12-hour to 24-hour format
   * @param {string} time - Time in 12-hour format (e.g., "02:30 PM")
   * @returns {string} Time in 24-hour format (e.g., "14:30")
   */
  function convertTo24Hour(time) {
    if (!time) return "";

    const [timePart, period] = time.split(" ");
    const [hours, minutes] = timePart.split(":").map(Number);

    let hour = hours;

    if (period === "PM" && hours < 12) {
      hour = hours + 12;
    } else if (period === "AM" && hours === 12) {
      hour = 0;
    }

    return `${hour
      .toString()
      .padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  }

  /**
   * Get user data from localStorage or use default data
   * @returns {Object} The user data
   */
  function getUserData() {
    const storedData = localStorage.getItem("timetableUserData");
    return storedData ? JSON.parse(storedData) : {};
  }

  /**
   * Save user data to localStorage
   * @param {Object} userData - The user data to save
   */
  function saveUserData(userData) {
    localStorage.setItem("timetableUserData", JSON.stringify(userData));
  }

  /**
   * Log user activity
   * @param {string} type - The type of activity
   * @param {Object} details - Activity details
   */
  function logActivity(type, details) {
    // Get user data
    const userData = getUserData();

    // Ensure activityLog exists
    if (!userData.activityLog) {
      userData.activityLog = [];
    }

    // Add activity
    userData.activityLog.push({
      type,
      details,
      date: new Date().toISOString(),
    });

    // Limit log size (keep last 100 entries)
    if (userData.activityLog.length > 100) {
      userData.activityLog = userData.activityLog.slice(-100);
    }

    // Save user data
    saveUserData(userData);
  }
});
