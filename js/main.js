/**
 * Main JavaScript file for the Timetable application
 * Handles core functionality and initialization
 */

document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const navButtons = document.querySelectorAll(".nav-button");
  console.log("Navigation buttons found:", navButtons.length);
  const contentSections = document.querySelectorAll(".content-section");
  const daySelectorButtons = document.querySelectorAll(".day-selector-btn");
  const dailyScheduleBody = document.getElementById("daily-schedule-body");
  const monthTabButtons = document.querySelectorAll(".month-tab-button");
  const monthlyGoalsContent = document.getElementById("monthly-goals-content");
  const weeklyPlanContent = document.getElementById("weekly-plan-content");
  const resetScheduleBtn = document.getElementById("resetScheduleBtn");
  const exportDropdown = document.getElementById("exportDropdown");
  const exportBtn = document.getElementById("exportBtn");

  // Initialize the application
  initApp();

  /**
   * Initialize the application
   */
  function initApp() {
    // Set up event listeners
    setupEventListeners();

    // Load data from localStorage or use default data
    loadUserData();

    // Initial population of content
    const firstDayButton = daySelectorButtons[0];
    firstDayButton.classList.replace("bg-sky-500", "bg-sky-600"); // Set Mon active by default
    populateDailySchedule(firstDayButton.dataset.day);

    populateWeeklyPlan();
    populateMonthlyGoals(1); // Default to Month 1

    // Set default view
    setActiveNav("daily"); // Default to daily view
  }

  /**
   * Set up event listeners for the application
   */
  function setupEventListeners() {
    // Navigation buttons
    console.log("Setting up navigation button event listeners");
    navButtons.forEach((button) => {
      console.log("Adding click listener to button:", button.dataset.target);
      button.addEventListener("click", function () {
        console.log("Navigation button clicked:", this.dataset.target);
        const target = this.dataset.target;
        setActiveNav(target);
      });
    });

    // Day selector buttons
    daySelectorButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Reset all buttons to default style
        daySelectorButtons.forEach((btn) => {
          btn.classList.replace("bg-sky-600", "bg-sky-500");
        });
        // Set clicked button to active style
        this.classList.replace("bg-sky-500", "bg-sky-600");
        // Populate schedule for selected day
        populateDailySchedule(this.dataset.day);
      });
    });

    // Month tab buttons
    monthTabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        monthTabButtons.forEach((btn) => {
          btn.classList.remove("active");
        });
        // Add active class to clicked button
        this.classList.add("active");
        // Populate goals for selected month
        populateMonthlyGoals(this.dataset.month);
      });
    });

    // Reset schedule button
    resetScheduleBtn.addEventListener("click", function () {
      if (confirm("Are you sure you want to reset the schedule to default?")) {
        resetSchedule();
      }
    });

    // Export button dropdown toggle
    exportBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      exportDropdown.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function () {
      exportDropdown.classList.add("hidden");
    });
  }

  /**
   * Set the active navigation section
   * @param {string} target - The ID of the section to activate
   */
  function setActiveNav(target) {
    // Hide all content sections
    contentSections.forEach((section) => {
      section.classList.add("hidden");
    });

    // Show the target section
    const targetSection = document.getElementById(target);
    if (targetSection) {
      targetSection.classList.remove("hidden");

      // If dashboard is selected, trigger dashboard update
      if (target === "dashboard") {
        // Use global functions if available
        if (typeof window.updateDashboardProgress === "function") {
          window.updateDashboardProgress();
        }
        if (typeof window.updateDashboardTasks === "function") {
          window.updateDashboardTasks();
        }
        // Also dispatch a custom event as a fallback
        const dashboardEvent = new CustomEvent("dashboardSelected");
        document.dispatchEvent(dashboardEvent);
      }

      // If practitioner mode is selected, trigger practitioner update
      if (target === "practitioner") {
        // Dispatch a custom event for practitioner mode
        const practitionerEvent = new CustomEvent("practitionerSelected");
        document.dispatchEvent(practitionerEvent);
      }

      // If company prep is selected, trigger company prep update
      if (target === "company-prep") {
        // Dispatch a custom event for company prep mode
        const companyPrepEvent = new CustomEvent("companyPrepSelected");
        document.dispatchEvent(companyPrepEvent);
      }

      // If behavioral questions is selected, trigger behavioral questions update
      if (target === "behavioral") {
        // Dispatch a custom event for behavioral questions mode
        const behavioralQuestionsEvent = new CustomEvent(
          "behavioralQuestionsSelected"
        );
        document.dispatchEvent(behavioralQuestionsEvent);
      }
    }

    // Update active state of nav buttons
    navButtons.forEach((button) => {
      if (button.dataset.target === target) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  /**
   * Populate the daily schedule table for a specific day
   * @param {string} day - The day to display (mon, tue, etc.)
   */
  function populateDailySchedule(day) {
    // Clear the table body
    dailyScheduleBody.innerHTML = "";

    // Use the dailySchedule for the selected day
    const daySchedule = scheduleData.dailySchedule[day] || [];

    // Create table rows for each schedule item
    daySchedule.forEach((item, index) => {
      const row = document.createElement("tr");

      // Status cell with checkbox
      const statusCell = document.createElement("td");
      statusCell.className = "px-3 py-3";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className =
        "task-checkbox w-4 h-4 text-sky-600 rounded border-stone-300 focus:ring-sky-500";
      checkbox.checked = item.completed;
      checkbox.addEventListener("change", function () {
        toggleTaskCompletion(day, index, this.checked);
      });
      statusCell.appendChild(checkbox);

      // Time cell
      const timeCell = document.createElement("td");
      timeCell.className = "px-4 py-3 text-sm text-stone-700";
      timeCell.innerHTML = `<span contenteditable="true" class="time-slot">${item.time}</span>`;
      timeCell
        .querySelector(".time-slot")
        .addEventListener("blur", function () {
          updateScheduleItem(day, index, "time", this.textContent);
        });

      // Activity cell
      const activityCell = document.createElement("td");
      activityCell.className = "px-4 py-3 text-sm text-stone-700";
      activityCell.innerHTML = `<span contenteditable="true" class="activity-text">${item.activity}</span>`;
      activityCell
        .querySelector(".activity-text")
        .addEventListener("blur", function () {
          updateScheduleItem(day, index, "activity", this.textContent);
        });

      // Notes cell
      const notesCell = document.createElement("td");
      notesCell.className = "px-4 py-3 text-sm text-stone-700";
      notesCell.innerHTML = `<span contenteditable="true" class="notes-text">${item.notes}</span>`;
      notesCell
        .querySelector(".notes-text")
        .addEventListener("blur", function () {
          updateScheduleItem(day, index, "notes", this.textContent);
        });

      // Apply completed styling if task is completed
      if (item.completed) {
        activityCell.classList.add("task-completed");
        notesCell.classList.add("task-completed");
      }

      // Append cells to row
      row.appendChild(statusCell);
      row.appendChild(timeCell);
      row.appendChild(activityCell);
      row.appendChild(notesCell);

      // Append row to table body
      dailyScheduleBody.appendChild(row);
    });
  }

  /**
   * Toggle the completion status of a task
   * @param {string} day - The day (mon, tue, etc.)
   * @param {number} index - The index of the task in the day's schedule
   * @param {boolean} completed - The new completion status
   */
  function toggleTaskCompletion(day, index, completed) {
    // Update the data
    const userData = getUserData();
    if (!userData.dailySchedule) {
      userData.dailySchedule = JSON.parse(
        JSON.stringify(scheduleData.dailySchedule)
      );
    }

    if (!userData.dailySchedule[day]) {
      userData.dailySchedule[day] = JSON.parse(
        JSON.stringify(scheduleData.dailySchedule[day])
      );
    }

    userData.dailySchedule[day][index].completed = completed;

    // Save the updated data
    saveUserData(userData);

    // Update the UI
    const row = dailyScheduleBody.querySelectorAll("tr")[index];
    const activityCell = row.querySelectorAll("td")[2];
    const notesCell = row.querySelectorAll("td")[3];

    if (completed) {
      activityCell.classList.add("task-completed");
      notesCell.classList.add("task-completed");
    } else {
      activityCell.classList.remove("task-completed");
      notesCell.classList.remove("task-completed");
    }

    // Dispatch task completed event for progress tracking
    const taskCompletedEvent = new CustomEvent("taskCompleted", {
      detail: {
        day: day,
        taskIndex: index,
        completed: completed,
      },
    });
    document.dispatchEvent(taskCompletedEvent);
  }

  /**
   * Update a schedule item property
   * @param {string} day - The day (mon, tue, etc.)
   * @param {number} index - The index of the task in the day's schedule
   * @param {string} property - The property to update (time, activity, notes)
   * @param {string} value - The new value
   */
  function updateScheduleItem(day, index, property, value) {
    // Update the data
    const userData = getUserData();
    if (!userData.dailySchedule) {
      userData.dailySchedule = JSON.parse(
        JSON.stringify(scheduleData.dailySchedule)
      );
    }

    if (!userData.dailySchedule[day]) {
      userData.dailySchedule[day] = JSON.parse(
        JSON.stringify(scheduleData.dailySchedule[day])
      );
    }

    userData.dailySchedule[day][index][property] = value;

    // Save the updated data
    saveUserData(userData);
  }

  /**
   * Populate the weekly plan section
   */
  function populateWeeklyPlan() {
    weeklyPlanContent.innerHTML = "";

    // Create a container for the weekly plan
    const weekCard = document.createElement("div");
    weekCard.className = "bg-stone-50 rounded-lg shadow mb-6 overflow-hidden";

    const weekHeader = document.createElement("div");
    weekHeader.className = "bg-sky-100 px-4 py-3 border-b border-stone-200";
    weekHeader.innerHTML = `
      <h4 class="text-lg font-medium text-sky-800">Interview Preparation Weekly Plan</h4>
      <p class="text-sm text-stone-600">Structured approach to ace technical interviews</p>
    `;
    weekCard.appendChild(weekHeader);

    const weekContent = document.createElement("div");
    weekContent.className = "p-4";

    const weekTable = document.createElement("div");
    weekTable.className = "overflow-x-auto";
    weekTable.innerHTML = `
      <table class="min-w-full divide-y divide-stone-200">
        <thead class="bg-stone-50">
          <tr>
            <th class="px-3 py-2 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Day</th>
            <th class="px-3 py-2 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">DSA</th>
            <th class="px-3 py-2 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Aptitude</th>
            <th class="px-3 py-2 text-left text-xs font-medium text-stone-500 uppercase tracking-wider">Core/Projects</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-stone-200">
          ${scheduleData.weeklyPlan
            .map(
              (day) => `
            <tr>
              <td class="px-3 py-2 text-sm text-stone-700 font-medium">${day.day}</td>
              <td class="px-3 py-2 text-sm text-stone-700">${day.dsa}</td>
              <td class="px-3 py-2 text-sm text-stone-700">${day.aptitude}</td>
              <td class="px-3 py-2 text-sm text-stone-700">${day.core}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;
    weekContent.appendChild(weekTable);
    weekCard.appendChild(weekContent);

    weeklyPlanContent.appendChild(weekCard);
  }

  /**
   * Populate the monthly goals section
   * @param {number} month - The month number (1, 2, or 3)
   */
  function populateMonthlyGoals(month) {
    monthlyGoalsContent.innerHTML = "";

    const monthData = scheduleData.monthlyGoals[`month${month}`];
    if (!monthData) return;

    const goalsCard = document.createElement("div");
    goalsCard.className = "bg-stone-50 rounded-lg shadow p-4";

    // Add title header
    const titleHeader = document.createElement("h3");
    titleHeader.className =
      "text-xl font-bold text-sky-800 mb-4 border-b pb-2 border-sky-200";
    titleHeader.textContent = monthData.title || `Month ${month} Goals`;
    goalsCard.appendChild(titleHeader);

    const goalsList = document.createElement("div");
    goalsList.className = "space-y-4";

    // Create goal items for each property in the month data
    Object.entries(monthData).forEach(([key, value]) => {
      // Skip the title property
      if (key === "title") return;

      const goalItem = document.createElement("div");
      goalItem.className = "border-l-4 border-sky-500 pl-4 py-2 mb-3";

      const goalTitle = document.createElement("h4");
      goalTitle.className = "text-md font-medium text-sky-800 mb-1";
      goalTitle.textContent =
        key.charAt(0).toUpperCase() +
        key
          .slice(1)
          .replace(/([A-Z])/g, " $1")
          .trim();

      const goalDescription = document.createElement("p");
      goalDescription.className = "text-sm text-stone-600";
      goalDescription.textContent = value;

      goalItem.appendChild(goalTitle);
      goalItem.appendChild(goalDescription);
      goalsList.appendChild(goalItem);
    });

    goalsCard.appendChild(goalsList);
    monthlyGoalsContent.appendChild(goalsCard);
  }

  /**
   * Reset the schedule to default
   */
  function resetSchedule() {
    // Get user data
    const userData = getUserData();

    // Reset daily schedule
    userData.dailySchedule = JSON.parse(
      JSON.stringify(scheduleData.dailySchedule)
    );

    // Save the updated data
    saveUserData(userData);

    // Refresh the UI
    const activeDay = Array.from(daySelectorButtons).find((btn) =>
      btn.classList.contains("bg-sky-600")
    ).dataset.day;

    populateDailySchedule(activeDay);
  }

  /**
   * Update UI with user data (called when data is loaded from Firebase)
   */
  function updateUI() {
    // Refresh the active day
    const activeDay = Array.from(daySelectorButtons).find((btn) =>
      btn.classList.contains("bg-sky-600")
    ).dataset.day;

    populateDailySchedule(activeDay);

    // Refresh other sections if needed
    populateWeeklyPlan();
    populateMonthlyGoals(1); // Default to Month 1
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
   * Save user data to localStorage and Firebase if user is logged in
   * @param {Object} userData - The user data to save
   */
  function saveUserData(userData) {
    // Save to localStorage
    localStorage.setItem("timetableUserData", JSON.stringify(userData));
  }

  // Make saveUserData available globally
  window.saveSchedule = saveUserData;

  /**
   * Load user data from localStorage or Firebase
   */
  function loadUserData() {
    // First load from localStorage
    const userData = getUserData();

    // If user has saved daily schedule data, use it
    if (userData.dailySchedule) {
      // Update the scheduleData object with user data
      scheduleData.dailySchedule = userData.dailySchedule;
    }
  }
});
