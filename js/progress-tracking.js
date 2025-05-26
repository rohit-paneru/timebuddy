/**
 * Progress Tracking Module
 * Handles detailed progress tracking and statistics
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize progress tracking
  initProgressTracking();

  // Listen for dashboard selection event
  document.addEventListener("dashboardSelected", function () {
    updateProgressStats();
  });

  /**
   * Initialize progress tracking functionality
   */
  function initProgressTracking() {
    // Add event listeners for task completion
    document.addEventListener("taskCompleted", function (e) {
      // Log activity
      logActivity(e.detail.day, e.detail.taskIndex, e.detail.completed);

      // Update progress stats
      updateProgressStats();
    });
  }

  /**
   * Log user activity
   * @param {string} day - The day (mon, tue, etc.)
   * @param {number} taskIndex - The index of the task
   * @param {boolean} completed - Whether the task was completed
   */
  function logActivity(day, taskIndex, completed) {
    // Get user data
    const userData = getUserData();

    // Initialize activity log if it doesn't exist
    if (!userData.activityLog) {
      userData.activityLog = [];
    }

    // Initialize statistics if they don't exist
    if (!userData.statistics) {
      userData.statistics = {
        totalTasksCompleted: 0,
        tasksCompletedByDay: {
          mon: 0,
          tue: 0,
          wed: 0,
          thu: 0,
          fri: 0,
          sat: 0,
        },
        tasksCompletedByCategory: {},
        streakData: {
          currentStreak: 0,
          longestStreak: 0,
          lastActiveDate: null,
        },
        weeklyProgress: [],
        monthlyProgress: [],
      };
    }

    // Get the task details
    const scheduleToUse =
      userData.dailySchedule && userData.dailySchedule[day]
        ? userData.dailySchedule[day]
        : scheduleData.dailySchedule[day];

    const task = scheduleToUse[taskIndex];

    // Create activity log entry
    const activityEntry = {
      date: new Date().toISOString(),
      day: day,
      taskIndex: taskIndex,
      taskTime: task.time,
      taskActivity: task.activity,
      completed: completed,
      timestamp: Date.now(),
    };

    // Add to activity log
    userData.activityLog.push(activityEntry);

    // Update statistics
    if (completed) {
      userData.statistics.totalTasksCompleted++;
      userData.statistics.tasksCompletedByDay[day]++;

      // Categorize task (simple categorization based on activity text)
      const category = categorizeTask(task.activity);
      if (!userData.statistics.tasksCompletedByCategory[category]) {
        userData.statistics.tasksCompletedByCategory[category] = 0;
      }
      userData.statistics.tasksCompletedByCategory[category]++;

      // Update streak data
      updateStreakData(userData.statistics);

      // Update weekly and monthly progress
      updatePeriodicProgress(userData.statistics);
    }

    // Save user data
    saveUserData(userData);
  }

  /**
   * Categorize a task based on its activity description
   * @param {string} activity - The task activity description
   * @returns {string} The category
   */
  function categorizeTask(activity) {
    const activityLower = activity.toLowerCase();

    if (
      activityLower.includes("dsa") ||
      activityLower.includes("algorithm") ||
      activityLower.includes("leetcode")
    ) {
      return "DSA";
    } else if (
      activityLower.includes("os") ||
      activityLower.includes("operating system")
    ) {
      return "OS";
    } else if (
      activityLower.includes("dbms") ||
      activityLower.includes("database")
    ) {
      return "DBMS";
    } else if (
      activityLower.includes("network") ||
      activityLower.includes("cn")
    ) {
      return "Networks";
    } else if (
      activityLower.includes("project") ||
      activityLower.includes("github")
    ) {
      return "Projects";
    } else if (
      activityLower.includes("aptitude") ||
      activityLower.includes("reasoning")
    ) {
      return "Aptitude";
    } else if (
      activityLower.includes("interview") ||
      activityLower.includes("resume")
    ) {
      return "Interview Prep";
    } else if (
      activityLower.includes("break") ||
      activityLower.includes("lunch") ||
      activityLower.includes("dinner") ||
      activityLower.includes("breakfast")
    ) {
      return "Breaks";
    } else {
      return "Other";
    }
  }

  /**
   * Update streak data
   * @param {Object} statistics - The statistics object
   */
  function updateStreakData(statistics) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const lastActiveDate = statistics.streakData.lastActiveDate
      ? new Date(statistics.streakData.lastActiveDate)
      : null;

    if (lastActiveDate) {
      lastActiveDate.setHours(0, 0, 0, 0);

      const timeDiff = today.getTime() - lastActiveDate.getTime();
      const dayDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

      if (dayDiff === 0) {
        // Same day, no change to streak
      } else if (dayDiff === 1) {
        // Consecutive day, increment streak
        statistics.streakData.currentStreak++;

        // Update longest streak if needed
        if (
          statistics.streakData.currentStreak >
          statistics.streakData.longestStreak
        ) {
          statistics.streakData.longestStreak =
            statistics.streakData.currentStreak;
        }
      } else {
        // Streak broken
        statistics.streakData.currentStreak = 1;
      }
    } else {
      // First activity
      statistics.streakData.currentStreak = 1;
      statistics.streakData.longestStreak = 1;
    }

    // Update last active date
    statistics.streakData.lastActiveDate = today.toISOString();
  }

  /**
   * Update weekly and monthly progress
   * @param {Object} statistics - The statistics object
   */
  function updatePeriodicProgress(statistics) {
    const today = new Date();
    const weekNumber = getWeekNumber(today);
    const monthNumber = today.getMonth();
    const year = today.getFullYear();

    // Update weekly progress
    let weekEntry = statistics.weeklyProgress.find(
      (entry) => entry.week === weekNumber && entry.year === year
    );

    if (!weekEntry) {
      weekEntry = {
        week: weekNumber,
        year: year,
        tasksCompleted: 0,
        daysActive: new Set(),
      };
      statistics.weeklyProgress.push(weekEntry);
    }

    weekEntry.tasksCompleted++;
    weekEntry.daysActive.add(today.toISOString().split("T")[0]); // Add today's date

    // Convert Set to Array for storage
    weekEntry.daysActive = Array.from(weekEntry.daysActive);

    // Update monthly progress
    let monthEntry = statistics.monthlyProgress.find(
      (entry) => entry.month === monthNumber && entry.year === year
    );

    if (!monthEntry) {
      monthEntry = {
        month: monthNumber,
        year: year,
        tasksCompleted: 0,
        daysActive: new Set(),
        categories: {},
      };
      statistics.monthlyProgress.push(monthEntry);
    }

    monthEntry.tasksCompleted++;
    monthEntry.daysActive.add(today.toISOString().split("T")[0]); // Add today's date

    // Convert Set to Array for storage
    monthEntry.daysActive = Array.from(monthEntry.daysActive);
  }

  /**
   * Get the ISO week number for a date
   * @param {Date} date - The date
   * @returns {number} The week number
   */
  function getWeekNumber(date) {
    const d = new Date(
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    );
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  }

  /**
   * Update progress statistics display
   */
  function updateProgressStats() {
    // Get the dashboard section
    const dashboardSection = document.getElementById("dashboard");
    if (!dashboardSection) return;

    // Get user data
    const userData = getUserData();
    if (!userData.statistics) return;

    // Update streak display
    const currentStreakElement = document.getElementById("currentStreak");
    if (currentStreakElement) {
      currentStreakElement.textContent =
        userData.statistics.streakData?.currentStreak || 0;
    }

    // Update last activity date
    const lastActivityDateElement = document.getElementById("lastActivityDate");
    if (
      lastActivityDateElement &&
      userData.statistics.streakData?.lastActiveDate
    ) {
      const lastDate = new Date(userData.statistics.streakData.lastActiveDate);
      lastActivityDateElement.textContent = lastDate.toLocaleDateString();
    }

    // Update statistics charts
    updateCategoryChart(userData.statistics);
    updateWeeklyProgressChart(userData.statistics);
  }

  /**
   * Update the category distribution chart
   * @param {Object} statistics - The statistics object
   */
  function updateCategoryChart(statistics) {
    const categoryChartCanvas = document.getElementById("categoryChart");
    if (!categoryChartCanvas) return;

    // Prepare data
    const categories = Object.keys(statistics.tasksCompletedByCategory || {});
    const counts = categories.map(
      (cat) => statistics.tasksCompletedByCategory[cat]
    );

    // Check if chart already exists
    let categoryChart = Chart.getChart(categoryChartCanvas);

    if (categoryChart) {
      // Update existing chart
      categoryChart.data.labels = categories;
      categoryChart.data.datasets[0].data = counts;
      categoryChart.update();
    } else {
      // Create new chart
      categoryChart = new Chart(categoryChartCanvas, {
        type: "doughnut",
        data: {
          labels: categories,
          datasets: [
            {
              data: counts,
              backgroundColor: [
                "rgba(56, 189, 248, 0.7)",
                "rgba(34, 197, 94, 0.7)",
                "rgba(249, 115, 22, 0.7)",
                "rgba(168, 85, 247, 0.7)",
                "rgba(239, 68, 68, 0.7)",
                "rgba(20, 184, 166, 0.7)",
                "rgba(100, 116, 139, 0.7)",
                "rgba(234, 179, 8, 0.7)",
                "rgba(236, 72, 153, 0.7)",
              ],
              borderColor: [
                "rgba(56, 189, 248, 1)",
                "rgba(34, 197, 94, 1)",
                "rgba(249, 115, 22, 1)",
                "rgba(168, 85, 247, 1)",
                "rgba(239, 68, 68, 1)",
                "rgba(20, 184, 166, 1)",
                "rgba(100, 116, 139, 1)",
                "rgba(234, 179, 8, 1)",
                "rgba(236, 72, 153, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "right",
            },
            title: {
              display: true,
              text: "Tasks by Category",
            },
          },
        },
      });
    }
  }

  /**
   * Update the weekly progress chart
   * @param {Object} statistics - The statistics object
   */
  function updateWeeklyProgressChart(statistics) {
    const weeklyChartCanvas = document.getElementById("weeklyChart");
    if (!weeklyChartCanvas) return;

    // Get the last 4 weeks of data
    const weeklyData = statistics.weeklyProgress || [];
    const recentWeeks = weeklyData.slice(-4);

    // Prepare data
    const labels = recentWeeks.map((week) => `Week ${week.week}`);
    const tasksData = recentWeeks.map((week) => week.tasksCompleted);
    const daysData = recentWeeks.map((week) => week.daysActive.length);

    // Check if chart already exists
    let weeklyChart = Chart.getChart(weeklyChartCanvas);

    if (weeklyChart) {
      // Update existing chart
      weeklyChart.data.labels = labels;
      weeklyChart.data.datasets[0].data = tasksData;
      weeklyChart.data.datasets[1].data = daysData;
      weeklyChart.update();
    } else {
      // Create new chart
      weeklyChart = new Chart(weeklyChartCanvas, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Tasks Completed",
              data: tasksData,
              backgroundColor: "rgba(56, 189, 248, 0.7)",
              borderColor: "rgba(56, 189, 248, 1)",
              borderWidth: 1,
            },
            {
              label: "Days Active",
              data: daysData,
              backgroundColor: "rgba(34, 197, 94, 0.7)",
              borderColor: "rgba(34, 197, 94, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            title: {
              display: true,
              text: "Weekly Progress",
            },
          },
        },
      });
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

  /**
   * Save user data to localStorage
   * @param {Object} userData - The user data to save
   */
  function saveUserData(userData) {
    localStorage.setItem("timetableUserData", JSON.stringify(userData));
  }

  // Expose functions to global scope
  window.updateProgressStats = updateProgressStats;
});
