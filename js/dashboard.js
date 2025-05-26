/**
 * Dashboard Module
 * Handles dashboard functionality and progress tracking
 */

document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const dashboardSection = document.getElementById("dashboard");

  // Initialize dashboard
  initDashboard();

  // Listen for dashboard selection event
  document.addEventListener("dashboardSelected", function () {
    // Refresh dashboard data when dashboard is selected
    updateProgressTracking();
    updateUpcomingTasks();
  });

  /**
   * Initialize dashboard functionality
   */
  function initDashboard() {
    // Populate dashboard content
    populateDashboard();

    // Update progress tracking
    updateProgressTracking();

    // Update upcoming tasks
    updateUpcomingTasks();
  }

  /**
   * Populate dashboard content
   */
  function populateDashboard() {
    // Create dashboard HTML
    const dashboardHTML = `
      <div class="bg-white shadow-lg rounded-lg p-4 sm:p-6">
        <h2 class="text-2xl font-semibold text-teal-700 mb-4">
          Progress Dashboard
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-stone-50 p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold text-sky-700 mb-2">
              Daily Progress
            </h3>
            <div class="progress-container">
              <div
                id="dailyProgressBar"
                class="progress-bar"
                style="width: 0%"
              ></div>
            </div>
            <div class="flex justify-between text-sm text-stone-600 mt-1">
              <span id="dailyCompletedTasks">0</span>
              <span>of</span>
              <span id="dailyTotalTasks">0 tasks</span>
            </div>
          </div>
          <div class="bg-stone-50 p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold text-sky-700 mb-2">
              Weekly Progress
            </h3>
            <div class="progress-container">
              <div
                id="weeklyProgressBar"
                class="progress-bar"
                style="width: 0%"
              ></div>
            </div>
            <div class="flex justify-between text-sm text-stone-600 mt-1">
              <span id="weeklyCompletedDays">0</span>
              <span>of</span>
              <span>6 days</span>
            </div>
          </div>
          <div class="bg-stone-50 p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold text-sky-700 mb-2">
              Monthly Progress
            </h3>
            <div class="progress-container">
              <div
                id="monthlyProgressBar"
                class="progress-bar"
                style="width: 33%"
              ></div>
            </div>
            <div class="flex justify-between text-sm text-stone-600 mt-1">
              <span>Month 1</span>
              <span>of</span>
              <span>3 months</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-stone-50 p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold text-sky-700 mb-2">
              Task Categories
            </h3>
            <div class="chart-container">
              <canvas id="categoryChart"></canvas>
            </div>
          </div>
          <div class="bg-stone-50 p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold text-sky-700 mb-2">
              Weekly Activity
            </h3>
            <div class="chart-container">
              <canvas id="weeklyChart"></canvas>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div class="bg-stone-50 p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold text-sky-700 mb-3">
              Current Streak
            </h3>
            <div class="flex items-center">
              <div
                class="text-4xl font-bold text-amber-600 mr-3"
                id="currentStreak"
              >
                0
              </div>
              <div class="text-stone-600">
                <div>consecutive days</div>
                <div class="text-sm">
                  Last activity: <span id="lastActivityDate">Never</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-stone-50 p-4 rounded-lg shadow">
            <h3 class="text-lg font-semibold text-sky-700 mb-3">
              Statistics
            </h3>
            <div class="grid grid-cols-2 gap-2">
              <div class="text-center">
                <div class="text-2xl font-bold text-sky-600" id="totalTasksCompleted">0</div>
                <div class="text-sm text-stone-600">Tasks Completed</div>
              </div>
              <div class="text-center">
                <div class="text-2xl font-bold text-sky-600" id="longestStreak">0</div>
                <div class="text-sm text-stone-600">Longest Streak</div>
              </div>
            </div>
          </div>
        </div>

        <h3 class="text-xl font-semibold text-teal-700 mb-3">
          Upcoming Tasks
        </h3>
        <div id="upcomingTasks" class="space-y-2 mb-6">
          <!-- Upcoming tasks will be populated here -->
        </div>
      </div>
    `;

    // Set dashboard content
    dashboardSection.innerHTML = dashboardHTML;
  }

  /**
   * Update progress tracking
   */
  function updateProgressTracking() {
    // Get user data
    const userData = getUserData();

    // Calculate daily progress
    let totalTasks = 0;
    let completedTasks = 0;

    // Get current day of the week (0 = Sunday, 1 = Monday, etc.)
    const today = new Date().getDay();

    // Map day of week to day code
    const dayMap = {
      1: "mon",
      2: "tue",
      3: "wed",
      4: "thu",
      5: "fri",
      6: "sat",
      0: "mon", // Default to Monday if Sunday
    };

    const currentDay = dayMap[today];

    // Get tasks for current day
    if (userData.dailySchedule && userData.dailySchedule[currentDay]) {
      const daySchedule = userData.dailySchedule[currentDay];
      totalTasks = daySchedule.length;
      completedTasks = daySchedule.filter((task) => task.completed).length;
    } else if (
      scheduleData.dailySchedule &&
      scheduleData.dailySchedule[currentDay]
    ) {
      const daySchedule = scheduleData.dailySchedule[currentDay];
      totalTasks = daySchedule.length;
      completedTasks = daySchedule.filter((task) => task.completed).length;
    }

    // Update daily progress UI
    const dailyProgressBar = document.getElementById("dailyProgressBar");
    const dailyCompletedTasks = document.getElementById("dailyCompletedTasks");
    const dailyTotalTasks = document.getElementById("dailyTotalTasks");

    if (dailyProgressBar && dailyCompletedTasks && dailyTotalTasks) {
      const dailyProgressPercentage =
        totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
      dailyProgressBar.style.width = `${dailyProgressPercentage}%`;
      dailyCompletedTasks.textContent = completedTasks;
      dailyTotalTasks.textContent = `${totalTasks} tasks`;
    }

    // Calculate weekly progress
    let completedDays = 0;

    // Check if each day has at least 50% of tasks completed
    for (const day in scheduleData.dailySchedule) {
      if (userData.dailySchedule && userData.dailySchedule[day]) {
        const daySchedule = userData.dailySchedule[day];
        const dayTotalTasks = daySchedule.length;
        const dayCompletedTasks = daySchedule.filter(
          (task) => task.completed
        ).length;

        if (dayTotalTasks > 0 && dayCompletedTasks / dayTotalTasks >= 0.5) {
          completedDays++;
        }
      }
    }

    // Update weekly progress UI
    const weeklyProgressBar = document.getElementById("weeklyProgressBar");
    const weeklyCompletedDays = document.getElementById("weeklyCompletedDays");

    if (weeklyProgressBar && weeklyCompletedDays) {
      const weeklyProgressPercentage = (completedDays / 6) * 100;
      weeklyProgressBar.style.width = `${weeklyProgressPercentage}%`;
      weeklyCompletedDays.textContent = completedDays;
    }

    // Calculate streak
    let streak = 0;
    let lastActivityDate = "Never";

    if (userData.activityLog) {
      // Sort activity log by date (newest first)
      const sortedLog = [...userData.activityLog].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      if (sortedLog.length > 0) {
        // Get the most recent activity date
        const mostRecentDate = new Date(sortedLog[0].date);
        lastActivityDate = mostRecentDate.toLocaleDateString();

        // Check if most recent activity was today or yesterday
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const isTodayOrYesterday =
          mostRecentDate.toDateString() === today.toDateString() ||
          mostRecentDate.toDateString() === yesterday.toDateString();

        if (isTodayOrYesterday) {
          // Calculate streak
          streak = 1; // Start with 1 for the most recent day

          for (let i = 1; i < sortedLog.length; i++) {
            const currentDate = new Date(sortedLog[i].date);
            const previousDate = new Date(sortedLog[i - 1].date);

            // Check if dates are consecutive
            const diffTime = Math.abs(previousDate - currentDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
              streak++;
            } else {
              break;
            }
          }
        }
      }
    }

    // Update streak UI
    const currentStreakElement = document.getElementById("currentStreak");
    const lastActivityDateElement = document.getElementById("lastActivityDate");

    if (currentStreakElement && lastActivityDateElement) {
      currentStreakElement.textContent = streak;
      lastActivityDateElement.textContent = lastActivityDate;
    }
  }

  /**
   * Update upcoming tasks
   */
  function updateUpcomingTasks() {
    const upcomingTasksContainer = document.getElementById("upcomingTasks");

    if (!upcomingTasksContainer) return;

    // Get user data
    const userData = getUserData();

    // Get current day of the week (0 = Sunday, 1 = Monday, etc.)
    const today = new Date().getDay();

    // Map day of week to day code
    const dayMap = {
      1: "mon",
      2: "tue",
      3: "wed",
      4: "thu",
      5: "fri",
      6: "sat",
      0: "mon", // Default to Monday if Sunday
    };

    const currentDay = dayMap[today];

    // Get tasks for current day
    let daySchedule = [];

    if (userData.dailySchedule && userData.dailySchedule[currentDay]) {
      daySchedule = userData.dailySchedule[currentDay];
    } else if (
      scheduleData.dailySchedule &&
      scheduleData.dailySchedule[currentDay]
    ) {
      daySchedule = scheduleData.dailySchedule[currentDay];
    }

    // If no tasks are found, show all tasks from the default schedule
    if (daySchedule.length === 0 && scheduleData.dailySchedule) {
      // Try to use the current day, or fall back to Monday if not available
      daySchedule =
        scheduleData.dailySchedule[currentDay] ||
        scheduleData.dailySchedule["mon"];
    }

    // Get current time
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Filter for upcoming tasks (not completed and time is in the future)
    const upcomingTasks = daySchedule.filter((task) => {
      if (task.completed) return false;

      try {
        // Parse time range (e.g., "06:00 - 06:30" or "7:00 - 7:30")
        const timeRange = task.time.split(" - ");
        if (timeRange.length !== 2) return true; // Include if format is unexpected

        const startTime = timeRange[0].trim();
        // Handle both "06:00" and "6:00" formats
        const startTimeParts = startTime.split(":");
        if (startTimeParts.length !== 2) return true; // Include if format is unexpected

        const startHour = parseInt(startTimeParts[0], 10);
        const startMinute = parseInt(startTimeParts[1], 10);

        if (isNaN(startHour) || isNaN(startMinute)) return true; // Include if parsing fails

        // Check if task is in the future
        return (
          startHour > currentHour ||
          (startHour === currentHour && startMinute > currentMinute)
        );
      } catch (error) {
        // If there's any error in parsing, include the task
        return true;
      }
    });

    // If no upcoming tasks, show all tasks
    let tasksToShow = upcomingTasks.length > 0 ? upcomingTasks : daySchedule;

    // Sort by start time
    tasksToShow.sort((a, b) => {
      try {
        const aTimeRange = a.time.split(" - ");
        const bTimeRange = b.time.split(" - ");

        const aStartTime = aTimeRange[0].trim();
        const bStartTime = bTimeRange[0].trim();

        const aStartTimeParts = aStartTime.split(":");
        const bStartTimeParts = bStartTime.split(":");

        if (aStartTimeParts.length !== 2 || bStartTimeParts.length !== 2)
          return 0;

        const aStartHour = parseInt(aStartTimeParts[0], 10);
        const aStartMinute = parseInt(aStartTimeParts[1], 10);
        const bStartHour = parseInt(bStartTimeParts[0], 10);
        const bStartMinute = parseInt(bStartTimeParts[1], 10);

        if (
          isNaN(aStartHour) ||
          isNaN(aStartMinute) ||
          isNaN(bStartHour) ||
          isNaN(bStartMinute)
        )
          return 0;

        if (aStartHour !== bStartHour) {
          return aStartHour - bStartHour;
        }

        return aStartMinute - bStartMinute;
      } catch (error) {
        return 0;
      }
    });

    // Limit to 5 tasks
    const limitedTasks = tasksToShow.slice(0, 5);

    // Clear container
    upcomingTasksContainer.innerHTML = "";

    // Add tasks to container
    if (limitedTasks.length > 0) {
      limitedTasks.forEach((task) => {
        const taskElement = document.createElement("div");
        taskElement.className = "bg-stone-50 p-3 rounded-lg shadow";

        taskElement.innerHTML = `
          <div class="flex justify-between items-center">
            <div class="font-medium text-sky-700">${task.time}</div>
            <div class="text-xs text-stone-500">${
              currentDay.charAt(0).toUpperCase() + currentDay.slice(1)
            }</div>
          </div>
          <div class="text-stone-700 mt-1">${task.activity}</div>
        `;

        upcomingTasksContainer.appendChild(taskElement);
      });
    } else {
      // No upcoming tasks
      const noTasksElement = document.createElement("div");
      noTasksElement.className =
        "bg-stone-50 p-3 rounded-lg shadow text-center text-stone-600";
      noTasksElement.textContent = "No upcoming tasks for today";

      upcomingTasksContainer.appendChild(noTasksElement);
    }
  }

  /**
   * Get user data from localStorage or use default data
   * @returns {Object} The user data
   */
  function getUserData() {
    const storedData = localStorage.getItem("timetableUserData");
    return storedData ? JSON.parse(storedData) : {};
  }

  // Make functions globally accessible
  window.updateDashboardProgress = updateProgressTracking;
  window.updateDashboardTasks = updateUpcomingTasks;
});
