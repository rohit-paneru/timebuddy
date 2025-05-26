/**
 * Calendar Integration Module
 * Handles integration with calendar services and displays a calendar view
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize calendar integration
  initCalendarIntegration();

  /**
   * Initialize calendar integration functionality
   */
  function initCalendarIntegration() {
    // Add calendar button to navigation
    addCalendarNavButton();

    // Create calendar section
    createCalendarSection();

    // Add event listeners
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("export-calendar-btn")) {
        exportToCalendar();
      } else if (e.target.classList.contains("calendar-day")) {
        selectCalendarDay(e.target);
      } else if (e.target.id === "prevMonth") {
        navigateMonth(-1);
      } else if (e.target.id === "nextMonth") {
        navigateMonth(1);
      } else if (e.target.id === "todayBtn") {
        goToToday();
      }
    });
  }

  /**
   * Add calendar button to navigation
   */
  function addCalendarNavButton() {
    // Get navigation container
    const navContainer = document.querySelector("nav");
    if (!navContainer) return;

    // Create calendar button
    const calendarButton = document.createElement("button");
    calendarButton.dataset.target = "calendar";
    calendarButton.className =
      "nav-button text-sm sm:text-base bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-3 sm:px-4 rounded-lg shadow transition duration-150 ease-in-out";
    calendarButton.textContent = "Calendar";

    // Add button to navigation
    navContainer.appendChild(calendarButton);

    // Add event listener
    calendarButton.addEventListener("click", function () {
      // Hide all content sections
      document.querySelectorAll(".content-section").forEach((section) => {
        section.classList.add("hidden");
      });

      // Show calendar section
      document.getElementById("calendar").classList.remove("hidden");

      // Update active state of nav buttons
      document.querySelectorAll(".nav-button").forEach((button) => {
        if (button.dataset.target === "calendar") {
          button.classList.add("active");
        } else {
          button.classList.remove("active");
        }
      });

      // Render calendar
      renderCalendar();
    });
  }

  /**
   * Create calendar section
   */
  function createCalendarSection() {
    // Get main content container
    const mainContent = document.getElementById("app-content");
    if (!mainContent) return;

    // Create calendar section
    const calendarSection = document.createElement("section");
    calendarSection.id = "calendar";
    calendarSection.className = "content-section hidden space-y-6";

    calendarSection.innerHTML = `
      <div class="bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-semibold text-teal-700">Calendar View</h2>
          <div class="flex gap-2">
            <button id="todayBtn" class="bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs sm:text-sm font-medium py-1.5 px-3 rounded-md shadow transition duration-150 ease-in-out">
              Today
            </button>
            <button class="export-calendar-btn bg-sky-500 hover:bg-sky-600 text-white text-xs sm:text-sm font-medium py-1.5 px-3 rounded-md shadow transition duration-150 ease-in-out">
              Export to Calendar
            </button>
          </div>
        </div>
        <p class="text-stone-600 mb-4">
          View your schedule in a calendar format. Click on a day to see the tasks for that day. You can also export your schedule to your preferred calendar application.
        </p>
        
        <div class="calendar-container">
          <div class="flex justify-between items-center mb-4">
            <button id="prevMonth" class="p-2 rounded-full hover:bg-stone-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 id="currentMonthYear" class="text-lg font-medium text-sky-700">June 2023</h3>
            <button id="nextMonth" class="p-2 rounded-full hover:bg-stone-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div class="calendar-grid mb-6">
            <div class="grid grid-cols-7 gap-1">
              <div class="calendar-header text-center py-2 font-medium text-stone-600">Sun</div>
              <div class="calendar-header text-center py-2 font-medium text-stone-600">Mon</div>
              <div class="calendar-header text-center py-2 font-medium text-stone-600">Tue</div>
              <div class="calendar-header text-center py-2 font-medium text-stone-600">Wed</div>
              <div class="calendar-header text-center py-2 font-medium text-stone-600">Thu</div>
              <div class="calendar-header text-center py-2 font-medium text-stone-600">Fri</div>
              <div class="calendar-header text-center py-2 font-medium text-stone-600">Sat</div>
            </div>
            <div id="calendarDays" class="grid grid-cols-7 gap-1">
              <!-- Calendar days will be populated here -->
            </div>
          </div>
        </div>
        
        <div id="dayScheduleContainer" class="mt-6 hidden">
          <h3 id="selectedDate" class="text-lg font-medium text-sky-700 mb-3">June 15, 2023</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-stone-200 border border-stone-200 rounded-lg">
              <thead class="bg-stone-50">
                <tr>
                  <th class="px-3 py-2 text-left text-xs font-medium text-stone-500 uppercase tracking-wider w-1/12">Status</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-stone-500 uppercase tracking-wider w-2/12">Time</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-stone-500 uppercase tracking-wider w-4/12">Activity</th>
                  <th class="px-4 py-2 text-left text-xs font-medium text-stone-500 uppercase tracking-wider w-5/12">Notes</th>
                </tr>
              </thead>
              <tbody id="calendarDaySchedule" class="bg-white divide-y divide-stone-200">
                <!-- Day schedule will be populated here -->
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    // Add calendar section to main content
    mainContent.appendChild(calendarSection);

    // Create export calendar modal
    createExportCalendarModal();
  }

  /**
   * Create export calendar modal
   */
  function createExportCalendarModal() {
    // Create modal element
    const modal = document.createElement("div");
    modal.id = "exportCalendarModal";
    modal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden";

    modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-teal-700">Export to Calendar</h3>
          <button id="closeExportCalendarModal" class="text-stone-400 hover:text-stone-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p class="text-stone-600 mb-4">
          Export your schedule to your preferred calendar application. Choose the export format and date range below.
        </p>
        <form id="exportCalendarForm" class="space-y-4">
          <div>
            <label for="calendarFormat" class="block text-sm font-medium text-stone-700 mb-1">Export Format</label>
            <select id="calendarFormat" class="w-full rounded-md border-stone-300 shadow-sm focus:border-sky-500 focus:ring-sky-500">
              <option value="ics">iCalendar (.ics) - Google Calendar, Apple Calendar, Outlook</option>
              <option value="csv">CSV - Excel, Google Sheets</option>
            </select>
          </div>
          <div>
            <label for="dateRange" class="block text-sm font-medium text-stone-700 mb-1">Date Range</label>
            <select id="dateRange" class="w-full rounded-md border-stone-300 shadow-sm focus:border-sky-500 focus:ring-sky-500">
              <option value="week">Current Week</option>
              <option value="month" selected>Current Month</option>
              <option value="3months">3 Months</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div id="customDateRange" class="space-y-2 hidden">
            <div>
              <label for="startDate" class="block text-sm font-medium text-stone-700 mb-1">Start Date</label>
              <input type="date" id="startDate" class="w-full rounded-md border-stone-300 shadow-sm focus:border-sky-500 focus:ring-sky-500">
            </div>
            <div>
              <label for="endDate" class="block text-sm font-medium text-stone-700 mb-1">End Date</label>
              <input type="date" id="endDate" class="w-full rounded-md border-stone-300 shadow-sm focus:border-sky-500 focus:ring-sky-500">
            </div>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-md shadow transition duration-150 ease-in-out">
              Export
            </button>
          </div>
        </form>
      </div>
    `;

    // Add modal to document
    document.body.appendChild(modal);

    // Add event listeners
    document
      .getElementById("closeExportCalendarModal")
      .addEventListener("click", function () {
        document.getElementById("exportCalendarModal").classList.add("hidden");
      });

    document
      .getElementById("dateRange")
      .addEventListener("change", function () {
        if (this.value === "custom") {
          document.getElementById("customDateRange").classList.remove("hidden");
        } else {
          document.getElementById("customDateRange").classList.add("hidden");
        }
      });

    document
      .getElementById("exportCalendarForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        generateCalendarExport();
      });

    // Set default dates for custom range
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(1); // First day of current month
    const endDate = new Date(today);
    endDate.setMonth(endDate.getMonth() + 1);
    endDate.setDate(0); // Last day of current month

    document.getElementById("startDate").valueAsDate = startDate;
    document.getElementById("endDate").valueAsDate = endDate;
  }

  /**
   * Render calendar
   * @param {Date} date - The date to render (defaults to current month)
   */
  function renderCalendar(date = new Date()) {
    // Get calendar elements
    const calendarDays = document.getElementById("calendarDays");
    const currentMonthYear = document.getElementById("currentMonthYear");

    if (!calendarDays || !currentMonthYear) return;

    // Clear calendar days
    calendarDays.innerHTML = "";

    // Set current month and year
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    currentMonthYear.textContent = `${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;

    // Get first day of month
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const startingDay = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Get last day of month
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const totalDays = lastDay.getDate();

    // Get user data for task completion
    const userData = getUserData();

    // Create calendar grid
    let dayCount = 1;
    let calendarHTML = "";

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDay; i++) {
      calendarHTML += `<div class="calendar-day empty p-1"></div>`;
    }

    // Add days of the month
    for (let i = 1; i <= totalDays; i++) {
      const currentDate = new Date(date.getFullYear(), date.getMonth(), i);
      const isToday = isSameDay(currentDate, new Date());

      // Check if there are tasks for this day
      const dayOfWeek = currentDate.getDay();
      const dayCode = getDayCode(dayOfWeek);

      // Get tasks for this day
      const daySchedule =
        userData.dailySchedule && userData.dailySchedule[dayCode]
          ? userData.dailySchedule[dayCode]
          : scheduleData.dailySchedule[dayCode];

      // Count completed tasks
      const totalTasks = daySchedule.length;
      const completedTasks = daySchedule.filter(
        (task) => task.completed
      ).length;
      const hasCompletedTasks = completedTasks > 0;
      const allTasksCompleted = completedTasks === totalTasks && totalTasks > 0;

      // Create day cell
      calendarHTML += `
        <div class="calendar-day p-1" data-date="${currentDate.toISOString()}" data-day-code="${dayCode}">
          <div class="h-full rounded-lg ${
            isToday ? "bg-sky-100 border border-sky-500" : "hover:bg-stone-100"
          } p-2 cursor-pointer">
            <div class="flex justify-between items-start">
              <span class="font-medium ${
                isToday ? "text-sky-700" : ""
              }">${i}</span>
              ${
                hasCompletedTasks
                  ? `
                <span class="inline-flex items-center justify-center w-5 h-5 text-xs font-medium ${
                  allTasksCompleted ? "bg-green-500" : "bg-amber-500"
                } text-white rounded-full">
                  ${completedTasks}
                </span>
              `
                  : ""
              }
            </div>
            <div class="text-xs mt-1 text-stone-500">${getDayName(
              dayOfWeek
            )}</div>
          </div>
        </div>
      `;

      dayCount++;
    }

    // Add empty cells for days after the last day of the month
    const remainingCells = 42 - (startingDay + totalDays); // 42 = 6 rows * 7 days
    for (let i = 0; i < remainingCells; i++) {
      if (i < 7) {
        // Only add cells for the last row if needed
        calendarHTML += `<div class="calendar-day empty p-1"></div>`;
      }
    }

    // Set calendar HTML
    calendarDays.innerHTML = calendarHTML;

    // Store current date in dataset
    calendarDays.dataset.currentMonth = date.getMonth();
    calendarDays.dataset.currentYear = date.getFullYear();

    // Add event listeners to calendar days
    document.querySelectorAll(".calendar-day:not(.empty)").forEach((day) => {
      day.addEventListener("click", function () {
        selectCalendarDay(this);
      });
    });
  }

  /**
   * Select a calendar day
   * @param {HTMLElement} dayElement - The day element
   */
  function selectCalendarDay(dayElement) {
    // Remove active class from all days
    document.querySelectorAll(".calendar-day").forEach((day) => {
      const innerDiv = day.querySelector("div");
      if (innerDiv) {
        innerDiv.classList.remove("bg-teal-100");
        innerDiv.classList.remove("border-teal-500");
        if (!innerDiv.classList.contains("bg-sky-100")) {
          innerDiv.classList.add("hover:bg-stone-100");
        }
      }
    });

    // Add active class to selected day
    const innerDiv = dayElement.querySelector("div");
    if (innerDiv) {
      innerDiv.classList.add("bg-teal-100");
      innerDiv.classList.add("border");
      innerDiv.classList.add("border-teal-500");
      innerDiv.classList.remove("hover:bg-stone-100");
    }

    // Get date and day code
    const dateStr = dayElement.dataset.date;
    const dayCode = dayElement.dataset.dayCode;

    if (!dateStr || !dayCode) return;

    // Show day schedule container
    const dayScheduleContainer = document.getElementById(
      "dayScheduleContainer"
    );
    if (dayScheduleContainer) {
      dayScheduleContainer.classList.remove("hidden");
    }

    // Update selected date
    const selectedDate = document.getElementById("selectedDate");
    if (selectedDate) {
      const date = new Date(dateStr);
      selectedDate.textContent = date.toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }

    // Populate day schedule
    populateCalendarDaySchedule(dayCode);
  }

  /**
   * Populate calendar day schedule
   * @param {string} dayCode - The day code (mon, tue, etc.)
   */
  function populateCalendarDaySchedule(dayCode) {
    // Get day schedule container
    const calendarDaySchedule = document.getElementById("calendarDaySchedule");
    if (!calendarDaySchedule) return;

    // Clear container
    calendarDaySchedule.innerHTML = "";

    // Get user data
    const userData = getUserData();

    // Get schedule for this day
    const daySchedule =
      userData.dailySchedule && userData.dailySchedule[dayCode]
        ? userData.dailySchedule[dayCode]
        : scheduleData.dailySchedule[dayCode];

    // Create table rows for each schedule item
    daySchedule.forEach((item, index) => {
      const row = document.createElement("tr");

      // Status cell with checkbox
      const statusCell = document.createElement("td");
      statusCell.className = "px-3 py-3";
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className =
        "calendar-task-checkbox w-4 h-4 text-sky-600 rounded border-stone-300 focus:ring-sky-500";
      checkbox.checked = item.completed;
      checkbox.dataset.day = dayCode;
      checkbox.dataset.index = index;
      checkbox.addEventListener("change", function () {
        toggleCalendarTaskCompletion(dayCode, index, this.checked);
      });
      statusCell.appendChild(checkbox);

      // Time cell
      const timeCell = document.createElement("td");
      timeCell.className = "px-4 py-3 text-sm text-stone-700";
      timeCell.textContent = item.time;

      // Activity cell
      const activityCell = document.createElement("td");
      activityCell.className = "px-4 py-3 text-sm text-stone-700";
      activityCell.textContent = item.activity;

      // Notes cell
      const notesCell = document.createElement("td");
      notesCell.className = "px-4 py-3 text-sm text-stone-700";
      notesCell.textContent = item.notes;

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
      calendarDaySchedule.appendChild(row);
    });
  }

  /**
   * Toggle calendar task completion
   * @param {string} day - The day (mon, tue, etc.)
   * @param {number} index - The index of the task in the day's schedule
   * @param {boolean} completed - The new completion status
   */
  function toggleCalendarTaskCompletion(day, index, completed) {
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
    const row = document
      .getElementById("calendarDaySchedule")
      .querySelectorAll("tr")[index];
    const activityCell = row.querySelectorAll("td")[2];
    const notesCell = row.querySelectorAll("td")[3];

    if (completed) {
      activityCell.classList.add("task-completed");
      notesCell.classList.add("task-completed");
    } else {
      activityCell.classList.remove("task-completed");
      notesCell.classList.remove("task-completed");
    }

    // Update calendar view
    renderCalendar(getCurrentCalendarDate());

    // Dispatch task completed event
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
   * Navigate to previous/next month
   * @param {number} direction - The direction to navigate (-1 for previous, 1 for next)
   */
  function navigateMonth(direction) {
    const calendarDays = document.getElementById("calendarDays");
    if (!calendarDays) return;

    // Get current month and year
    const currentMonth = parseInt(calendarDays.dataset.currentMonth);
    const currentYear = parseInt(calendarDays.dataset.currentYear);

    // Calculate new date
    const newDate = new Date(currentYear, currentMonth + direction, 1);

    // Render calendar for new date
    renderCalendar(newDate);
  }

  /**
   * Go to today
   */
  function goToToday() {
    renderCalendar(new Date());
  }

  /**
   * Get current calendar date
   * @returns {Date} The current calendar date
   */
  function getCurrentCalendarDate() {
    const calendarDays = document.getElementById("calendarDays");
    if (!calendarDays) return new Date();

    // Get current month and year
    const currentMonth = parseInt(calendarDays.dataset.currentMonth);
    const currentYear = parseInt(calendarDays.dataset.currentYear);

    // Return date
    return new Date(currentYear, currentMonth, 1);
  }

  /**
   * Export to calendar
   */
  function exportToCalendar() {
    // Show export calendar modal
    document.getElementById("exportCalendarModal").classList.remove("hidden");
  }

  /**
   * Generate calendar export
   */
  function generateCalendarExport() {
    // Get form values
    const format = document.getElementById("calendarFormat").value;
    const dateRange = document.getElementById("dateRange").value;

    // Get date range
    let startDate, endDate;

    if (dateRange === "custom") {
      startDate = document.getElementById("startDate").valueAsDate;
      endDate = document.getElementById("endDate").valueAsDate;
    } else {
      const today = new Date();

      if (dateRange === "week") {
        // Current week (Sunday to Saturday)
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay()); // Start of week (Sunday)
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 6); // End of week (Saturday)
      } else if (dateRange === "month") {
        // Current month
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      } else if (dateRange === "3months") {
        // 3 months
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = new Date(today.getFullYear(), today.getMonth() + 3, 0);
      }
    }

    // Validate date range
    if (!startDate || !endDate || startDate > endDate) {
      alert("Please select a valid date range.");
      return;
    }

    // Get user data
    const userData = getUserData();

    // Generate export based on format
    if (format === "ics") {
      generateICSExport(startDate, endDate, userData);
    } else if (format === "csv") {
      generateCSVExport(startDate, endDate, userData);
    }

    // Close modal
    document.getElementById("exportCalendarModal").classList.add("hidden");
  }

  /**
   * Generate ICS export
   * @param {Date} startDate - The start date
   * @param {Date} endDate - The end date
   * @param {Object} userData - The user data
   */
  function generateICSExport(startDate, endDate, userData) {
    // Create ICS content
    let icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Placement Prep Timetable//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
    ];

    // Loop through date range
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      // Get day of week
      const dayOfWeek = currentDate.getDay();
      const dayCode = getDayCode(dayOfWeek);

      // Get schedule for this day
      const daySchedule =
        userData.dailySchedule && userData.dailySchedule[dayCode]
          ? userData.dailySchedule[dayCode]
          : scheduleData.dailySchedule[dayCode];

      // Add events for each task
      daySchedule.forEach((task) => {
        // Parse time range
        const timeRange = task.time.split(" - ");
        if (timeRange.length !== 2) return;

        const startTime = timeRange[0].trim();
        const endTime = timeRange[1].trim();

        // Create event start and end dates
        const eventStartDate = new Date(currentDate);
        const eventEndDate = new Date(currentDate);

        // Parse start time
        const startTimeParts = startTime.split(":");
        if (startTimeParts.length !== 2) return;

        const startHour = parseInt(startTimeParts[0]);
        const startMinute = parseInt(startTimeParts[1]);

        if (isNaN(startHour) || isNaN(startMinute)) return;

        eventStartDate.setHours(startHour, startMinute, 0);

        // Parse end time
        const endTimeParts = endTime.split(":");
        if (endTimeParts.length !== 2) return;

        const endHour = parseInt(endTimeParts[0]);
        const endMinute = parseInt(endTimeParts[1]);

        if (isNaN(endHour) || isNaN(endMinute)) return;

        eventEndDate.setHours(endHour, endMinute, 0);

        // Format dates for ICS
        const formatDate = (date) => {
          return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
        };

        // Add event to ICS
        icsContent.push("BEGIN:VEVENT");
        icsContent.push(`DTSTART:${formatDate(eventStartDate)}`);
        icsContent.push(`DTEND:${formatDate(eventEndDate)}`);
        icsContent.push(`SUMMARY:${task.activity}`);
        icsContent.push(`DESCRIPTION:${task.notes}`);
        icsContent.push(`STATUS:${task.completed ? "COMPLETED" : "TENTATIVE"}`);
        icsContent.push(`LOCATION:Placement Prep Timetable`);
        icsContent.push(
          `UID:${Date.now()}-${Math.random()
            .toString(36)
            .substring(2, 11)}@placementprep`
        );
        icsContent.push("END:VEVENT");
      });

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Close ICS content
    icsContent.push("END:VCALENDAR");

    // Create blob and download
    const blob = new Blob([icsContent.join("\r\n")], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    // Create download link
    const link = document.createElement("a");
    link.href = url;
    link.download = "placement-prep-schedule.ics";
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  }

  /**
   * Generate CSV export
   * @param {Date} startDate - The start date
   * @param {Date} endDate - The end date
   * @param {Object} userData - The user data
   */
  function generateCSVExport(startDate, endDate, userData) {
    // Create CSV content
    let csvContent = "Date,Day,Time,Activity,Notes,Completed\n";

    // Loop through date range
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      // Get day of week
      const dayOfWeek = currentDate.getDay();
      const dayCode = getDayCode(dayOfWeek);
      const dayName = getDayName(dayOfWeek);

      // Get schedule for this day
      const daySchedule =
        userData.dailySchedule && userData.dailySchedule[dayCode]
          ? userData.dailySchedule[dayCode]
          : scheduleData.dailySchedule[dayCode];

      // Format date
      const formattedDate = currentDate.toISOString().split("T")[0];

      // Add rows for each task
      daySchedule.forEach((task) => {
        const time = task.time.replace(/,/g, ""); // Remove commas to avoid CSV issues
        const activity = task.activity.replace(/,/g, ""); // Remove commas
        const notes = task.notes.replace(/,/g, ""); // Remove commas
        const completed = task.completed ? "Yes" : "No";

        csvContent += `${formattedDate},${dayName},${time},${activity},${notes},${completed}\n`;
      });

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create download link
    const link = document.createElement("a");
    link.href = url;
    link.download = "placement-prep-schedule.csv";
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  }

  /**
   * Get day code from day of week
   * @param {number} dayOfWeek - The day of week (0 = Sunday, 1 = Monday, etc.)
   * @returns {string} The day code (mon, tue, etc.)
   */
  function getDayCode(dayOfWeek) {
    const dayMap = {
      0: "mon", // Use Monday for Sunday (no Sunday schedule)
      1: "mon",
      2: "tue",
      3: "wed",
      4: "thu",
      5: "fri",
      6: "sat",
    };

    return dayMap[dayOfWeek];
  }

  /**
   * Get day name from day of week
   * @param {number} dayOfWeek - The day of week (0 = Sunday, 1 = Monday, etc.)
   * @returns {string} The day name
   */
  function getDayName(dayOfWeek) {
    const dayMap = {
      0: "Sunday",
      1: "Monday",
      2: "Tuesday",
      3: "Wednesday",
      4: "Thursday",
      5: "Friday",
      6: "Saturday",
    };

    return dayMap[dayOfWeek];
  }

  /**
   * Check if two dates are the same day
   * @param {Date} date1 - The first date
   * @param {Date} date2 - The second date
   * @returns {boolean} True if the dates are the same day
   */
  function isSameDay(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
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
});
