/**
 * Gamification Module
 * Implements gamification elements like achievement badges, XP system, skill trees, and daily challenges
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize gamification system
  initGamification();

  // Listen for dashboard selection event to update gamification elements
  document.addEventListener("dashboardSelected", function () {
    updateGamificationElements();
  });

  // Listen for challenges section selection
  document.addEventListener("click", function (e) {
    if (e.target.matches('[data-target="challenges"]')) {
      renderChallengesSection();
    }
  });

  // Initialize challenges section if it's the active section
  const challengesSection = document.getElementById("challenges");
  if (challengesSection && !challengesSection.classList.contains("hidden")) {
    renderChallengesSection();
  }

  // Listen for task completion events
  document.addEventListener("taskCompleted", function (e) {
    handleTaskCompletion(e.detail);
  });

  /**
   * Initialize the gamification system
   */
  function initGamification() {
    // Create gamification section in dashboard
    createGamificationSection();

    // Initialize user gamification data if not exists
    initGamificationData();

    // Set up event listeners
    setupGamificationEvents();

    // Generate daily challenge if needed
    generateDailyChallenge();
  }

  /**
   * Create the gamification section in the dashboard
   */
  function createGamificationSection() {
    const dashboardSection = document.getElementById("dashboard");
    if (!dashboardSection) return;

    // Check if gamification section already exists
    if (document.getElementById("gamification-section")) return;

    // Create gamification section
    const gamificationSection = document.createElement("div");
    gamificationSection.id = "gamification-section";
    gamificationSection.className = "bg-white shadow-lg rounded-lg p-4 sm:p-6";

    gamificationSection.innerHTML = `
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold text-teal-700">Gamification</h2>
      </div>
      
      <!-- XP and Level -->
      <div class="xp-container">
        <div class="xp-header">
          <div class="xp-level">Level <span id="user-level">1</span></div>
          <div class="xp-points"><span id="current-xp">0</span>/<span id="next-level-xp">100</span> XP</div>
        </div>
        <div class="xp-bar-container">
          <div id="xp-progress-bar" class="xp-bar" style="width: 0%"></div>
        </div>
      </div>
      
      <!-- Achievement Badges -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-teal-700 mb-3">Achievement Badges</h3>
        <div id="badge-container" class="badge-container">
          <!-- Badges will be dynamically inserted here -->
        </div>
      </div>
      
      <!-- Skill Trees -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-teal-700 mb-3">Skill Trees</h3>
        <div id="skill-tree-container" class="skill-tree-container">
          <!-- Skill trees will be dynamically inserted here -->
        </div>
      </div>
      
      <!-- Daily Challenge -->
      <div class="mb-6">
        <h3 class="text-lg font-semibold text-teal-700 mb-3">Daily Challenge</h3>
        <div id="daily-challenge-container">
          <!-- Daily challenge will be dynamically inserted here -->
        </div>
      </div>
    `;

    // Add the gamification section to the dashboard
    dashboardSection.appendChild(gamificationSection);

    // Create XP notification element
    const xpNotification = document.createElement("div");
    xpNotification.id = "xp-notification";
    xpNotification.className = "xp-notification";
    document.body.appendChild(xpNotification);
  }

  /**
   * Initialize user gamification data if it doesn't exist
   */
  function initGamificationData() {
    const userData = getUserData();

    // Initialize gamification data if it doesn't exist
    if (!userData.gamification) {
      userData.gamification = {
        xp: 0,
        level: 1,
        badges: [],
        skills: initializeSkillTrees(),
        dailyChallenge: null,
        completedChallenges: [],
      };

      // Save the initialized data
      saveUserData(userData);
    }
  }

  /**
   * Initialize skill trees data structure
   * @returns {Object} The initialized skill trees
   */
  function initializeSkillTrees() {
    return {
      dsa: {
        name: "Data Structures & Algorithms",
        skills: [
          {
            id: "arrays",
            name: "Arrays",
            level: 1,
            progress: 0,
            maxProgress: 5,
            completed: false,
            locked: false,
            icon: "📊",
          },
          {
            id: "linked_lists",
            name: "Linked Lists",
            level: 1,
            progress: 0,
            maxProgress: 5,
            completed: false,
            locked: false,
            icon: "🔗",
          },
          {
            id: "stacks_queues",
            name: "Stacks & Queues",
            level: 2,
            progress: 0,
            maxProgress: 5,
            completed: false,
            locked: true,
            icon: "📚",
            requires: ["arrays", "linked_lists"],
          },
          {
            id: "trees",
            name: "Trees",
            level: 2,
            progress: 0,
            maxProgress: 8,
            completed: false,
            locked: true,
            icon: "🌳",
            requires: ["linked_lists"],
          },
          {
            id: "graphs",
            name: "Graphs",
            level: 3,
            progress: 0,
            maxProgress: 10,
            completed: false,
            locked: true,
            icon: "🕸️",
            requires: ["trees"],
          },
          {
            id: "dp",
            name: "Dynamic Programming",
            level: 3,
            progress: 0,
            maxProgress: 10,
            completed: false,
            locked: true,
            icon: "🧩",
            requires: ["arrays", "trees"],
          },
        ],
      },
      core: {
        name: "Core CS Fundamentals",
        skills: [
          {
            id: "os_basics",
            name: "OS Basics",
            level: 1,
            progress: 0,
            maxProgress: 5,
            completed: false,
            locked: false,
            icon: "💻",
          },
          {
            id: "dbms_basics",
            name: "DBMS Basics",
            level: 1,
            progress: 0,
            maxProgress: 5,
            completed: false,
            locked: false,
            icon: "🗄️",
          },
          {
            id: "networking",
            name: "Networking",
            level: 1,
            progress: 0,
            maxProgress: 5,
            completed: false,
            locked: false,
            icon: "🌐",
          },
          {
            id: "os_advanced",
            name: "OS Advanced",
            level: 2,
            progress: 0,
            maxProgress: 8,
            completed: false,
            locked: true,
            icon: "⚙️",
            requires: ["os_basics"],
          },
          {
            id: "dbms_advanced",
            name: "DBMS Advanced",
            level: 2,
            progress: 0,
            maxProgress: 8,
            completed: false,
            locked: true,
            icon: "📂",
            requires: ["dbms_basics"],
          },
          {
            id: "system_design",
            name: "System Design",
            level: 3,
            progress: 0,
            maxProgress: 10,
            completed: false,
            locked: true,
            icon: "🏗️",
            requires: ["os_advanced", "dbms_advanced", "networking"],
          },
        ],
      },
      projects: {
        name: "Projects & Portfolio",
        skills: [
          {
            id: "git_basics",
            name: "Git Basics",
            level: 1,
            progress: 0,
            maxProgress: 3,
            completed: false,
            locked: false,
            icon: "📝",
          },
          {
            id: "frontend_basics",
            name: "Frontend Basics",
            level: 1,
            progress: 0,
            maxProgress: 5,
            completed: false,
            locked: false,
            icon: "🖥️",
          },
          {
            id: "backend_basics",
            name: "Backend Basics",
            level: 1,
            progress: 0,
            maxProgress: 5,
            completed: false,
            locked: false,
            icon: "⚙️",
          },
          {
            id: "git_advanced",
            name: "Git Advanced",
            level: 2,
            progress: 0,
            maxProgress: 5,
            completed: false,
            locked: true,
            icon: "🔄",
            requires: ["git_basics"],
          },
          {
            id: "fullstack",
            name: "Full Stack",
            level: 2,
            progress: 0,
            maxProgress: 8,
            completed: false,
            locked: true,
            icon: "🧰",
            requires: ["frontend_basics", "backend_basics"],
          },
          {
            id: "deployment",
            name: "Deployment",
            level: 3,
            progress: 0,
            maxProgress: 5,
            completed: false,
            locked: true,
            icon: "🚀",
            requires: ["git_advanced", "fullstack"],
          },
        ],
      },
    };
  }

  /**
   * Set up event listeners for gamification elements
   */
  function setupGamificationEvents() {
    // Event delegation for badge clicks
    document.addEventListener("click", function (e) {
      // Handle badge clicks
      if (e.target.closest(".achievement-badge")) {
        const badge = e.target.closest(".achievement-badge");
        showBadgeDetails(badge.dataset.badgeId);
      }

      // Handle skill node clicks
      if (e.target.closest(".skill-node")) {
        const skillNode = e.target.closest(".skill-node");
        if (!skillNode.classList.contains("locked")) {
          showSkillDetails(
            skillNode.dataset.category,
            skillNode.dataset.skillId
          );
        }
      }

      // Handle challenge buttons
      if (e.target.closest("#challenge-accept")) {
        acceptDailyChallenge();
      }
      if (e.target.closest("#challenge-skip")) {
        skipDailyChallenge();
      }
      if (e.target.closest("#challenge-complete")) {
        completeDailyChallenge();
      }
    });
  }

  /**
   * Update all gamification elements
   */
  function updateGamificationElements() {
    const userData = getUserData();
    if (!userData.gamification) return;

    // Update XP and level display
    updateXPDisplay(userData.gamification);

    // Update badges
    renderAchievementBadges(userData.gamification);

    // Update skill trees
    renderSkillTrees(userData.gamification);

    // Update daily challenge
    renderDailyChallenge(userData.gamification);
  }

  /**
   * Update XP and level display
   * @param {Object} gamificationData - The user's gamification data
   */
  function updateXPDisplay(gamificationData) {
    const userLevel = document.getElementById("user-level");
    const currentXP = document.getElementById("current-xp");
    const nextLevelXP = document.getElementById("next-level-xp");
    const xpProgressBar = document.getElementById("xp-progress-bar");

    if (!userLevel || !currentXP || !nextLevelXP || !xpProgressBar) return;

    // Calculate XP needed for next level (100 * level)
    const xpForNextLevel = gamificationData.level * 100;

    // Calculate XP progress percentage
    const xpProgress = (gamificationData.xp / xpForNextLevel) * 100;

    // Update the display
    userLevel.textContent = gamificationData.level;
    currentXP.textContent = gamificationData.xp;
    nextLevelXP.textContent = xpForNextLevel;
    xpProgressBar.style.width = `${xpProgress}%`;
  }

  /**
   * Render achievement badges
   * @param {Object} gamificationData - The user's gamification data
   */
  function renderAchievementBadges(gamificationData) {
    const badgeContainer = document.getElementById("badge-container");
    if (!badgeContainer) return;

    // Clear existing badges
    badgeContainer.innerHTML = "";

    // Define all possible badges
    const allBadges = [
      {
        id: "first_task",
        name: "First Step",
        icon: "🏆",
        description: "Complete your first task",
        condition: (data) => data.statistics?.totalTasksCompleted >= 1,
      },
      {
        id: "streak_3",
        name: "Consistent",
        icon: "🔥",
        description: "Maintain a 3-day streak",
        condition: (data) => data.statistics?.streakData?.currentStreak >= 3,
      },
      {
        id: "streak_7",
        name: "Dedicated",
        icon: "⚡",
        description: "Maintain a 7-day streak",
        condition: (data) => data.statistics?.streakData?.currentStreak >= 7,
      },
      {
        id: "dsa_master",
        name: "DSA Master",
        icon: "🧠",
        description: "Complete 20 DSA tasks",
        condition: (data) =>
          (data.statistics?.tasksCompletedByCategory?.DSA || 0) >= 20,
      },
      {
        id: "core_expert",
        name: "Core Expert",
        icon: "💻",
        description: "Complete 15 core subject tasks",
        condition: (data) => {
          const osCount = data.statistics?.tasksCompletedByCategory?.OS || 0;
          const dbmsCount =
            data.statistics?.tasksCompletedByCategory?.DBMS || 0;
          const networkCount =
            data.statistics?.tasksCompletedByCategory?.Networks || 0;
          return osCount + dbmsCount + networkCount >= 15;
        },
      },
      {
        id: "project_builder",
        name: "Project Builder",
        icon: "🏗️",
        description: "Complete 10 project tasks",
        condition: (data) =>
          (data.statistics?.tasksCompletedByCategory?.Projects || 0) >= 10,
      },
      {
        id: "challenge_5",
        name: "Challenger",
        icon: "🎯",
        description: "Complete 5 daily challenges",
        condition: (data) =>
          (data.gamification?.completedChallenges?.length || 0) >= 5,
      },
      {
        id: "early_bird",
        name: "Early Bird",
        icon: "🌅",
        description: "Complete a task before 8 AM",
        condition: (data) => {
          const earlyTasks = data.activityLog?.filter((log) => {
            const logDate = new Date(log.date);
            return logDate.getHours() < 8 && log.completed;
          });
          return earlyTasks && earlyTasks.length > 0;
        },
      },
      {
        id: "night_owl",
        name: "Night Owl",
        icon: "🌙",
        description: "Complete a task after 10 PM",
        condition: (data) => {
          const lateTasks = data.activityLog?.filter((log) => {
            const logDate = new Date(log.date);
            return logDate.getHours() >= 22 && log.completed;
          });
          return lateTasks && lateTasks.length > 0;
        },
      },
      {
        id: "level_5",
        name: "Rising Star",
        icon: "⭐",
        description: "Reach level 5",
        condition: (data) => data.gamification?.level >= 5,
      },
    ];

    // Get the full user data to check badge conditions
    const userData = getUserData();

    // Render each badge
    allBadges.forEach((badge) => {
      // Check if badge is unlocked
      const isUnlocked =
        badge.condition(userData) || gamificationData.badges.includes(badge.id);

      // If badge is unlocked and not in the user's badges, add it
      if (isUnlocked && !gamificationData.badges.includes(badge.id)) {
        gamificationData.badges.push(badge.id);
        // Save the updated data
        userData.gamification.badges = gamificationData.badges;
        saveUserData(userData);

        // Show notification for newly unlocked badge
        showNotification(`🎉 New Badge Unlocked: ${badge.name}!`);
      }

      // Create badge element
      const badgeElement = document.createElement("div");
      badgeElement.className = `achievement-badge ${
        isUnlocked ? "" : "locked"
      }`;
      badgeElement.dataset.badgeId = badge.id;

      badgeElement.innerHTML = `
        <div class="badge-icon">${badge.icon}</div>
        <div class="badge-name">${badge.name}</div>
        <div class="badge-tooltip">${badge.description}</div>
      `;

      badgeContainer.appendChild(badgeElement);
    });
  }

  /**
   * Render skill trees
   * @param {Object} gamificationData - The user's gamification data
   */
  function renderSkillTrees(gamificationData) {
    const skillTreeContainer = document.getElementById("skill-tree-container");
    if (!skillTreeContainer) return;

    // Clear existing skill trees
    skillTreeContainer.innerHTML = "";

    // Render each skill category
    Object.keys(gamificationData.skills).forEach((category) => {
      const categoryData = gamificationData.skills[category];

      // Create category container
      const categoryElement = document.createElement("div");
      categoryElement.className = "skill-category";

      // Add category title
      const categoryTitle = document.createElement("h4");
      categoryTitle.className = "skill-category-title";
      categoryTitle.textContent = categoryData.name;
      categoryElement.appendChild(categoryTitle);

      // Create skill tree
      const skillTree = document.createElement("div");
      skillTree.className = "skill-tree";

      // Group skills by level
      const skillsByLevel = {};
      categoryData.skills.forEach((skill) => {
        if (!skillsByLevel[skill.level]) {
          skillsByLevel[skill.level] = [];
        }
        skillsByLevel[skill.level].push(skill);
      });

      // Render skills by level
      Object.keys(skillsByLevel)
        .sort()
        .forEach((level) => {
          const levelSkills = skillsByLevel[level];

          // Create level container
          const levelElement = document.createElement("div");
          levelElement.className = "skill-level";
          levelElement.dataset.level = level;

          // Add skills to level
          levelSkills.forEach((skill) => {
            const skillElement = document.createElement("div");
            skillElement.className = `skill-node ${
              skill.locked ? "locked" : ""
            } ${skill.completed ? "completed" : ""} ${
              !skill.locked && !skill.completed && skill.progress > 0
                ? "active"
                : ""
            }`;
            skillElement.dataset.category = category;
            skillElement.dataset.skillId = skill.id;

            skillElement.innerHTML = `
            <div class="skill-icon">${skill.icon}</div>
            <div class="skill-name">${skill.name}</div>
          `;

            levelElement.appendChild(skillElement);
          });

          skillTree.appendChild(levelElement);
        });

      categoryElement.appendChild(skillTree);
      skillTreeContainer.appendChild(categoryElement);
    });

    // Update skill locks based on prerequisites
    updateSkillLocks(gamificationData);
  }

  /**
   * Update skill locks based on prerequisites
   * @param {Object} gamificationData - The user's gamification data
   */
  function updateSkillLocks(gamificationData) {
    Object.keys(gamificationData.skills).forEach((category) => {
      const categoryData = gamificationData.skills[category];

      categoryData.skills.forEach((skill) => {
        if (skill.requires) {
          // Check if all required skills are completed
          const allRequirementsMet = skill.requires.every((requiredSkillId) => {
            const requiredSkill = categoryData.skills.find(
              (s) => s.id === requiredSkillId
            );
            return requiredSkill && requiredSkill.completed;
          });

          // Update locked status
          skill.locked = !allRequirementsMet;
        }
      });
    });
  }

  /**
   * Render daily challenge
   * @param {Object} gamificationData - The user's gamification data
   */
  function renderDailyChallenge(gamificationData) {
    const challengeContainer = document.getElementById(
      "daily-challenge-container"
    );
    if (!challengeContainer) return;

    // Clear existing challenge
    challengeContainer.innerHTML = "";

    // Check if there's an active challenge
    if (!gamificationData.dailyChallenge) {
      // No active challenge
      challengeContainer.innerHTML = `
        <div class="text-center p-4">
          <p class="text-stone-600 mb-4">No active challenge. Generate a new one!</p>
          <button id="generate-challenge" class="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-md shadow transition duration-150 ease-in-out">
            Generate Challenge
          </button>
        </div>
      `;

      // Add event listener for generate button
      const generateButton = document.getElementById("generate-challenge");
      if (generateButton) {
        generateButton.addEventListener("click", generateDailyChallenge);
      }

      return;
    }

    // Render active challenge
    const challenge = gamificationData.dailyChallenge;

    const challengeElement = document.createElement("div");
    challengeElement.className = "challenge-container";

    challengeElement.innerHTML = `
      <div class="challenge-header">
        <h4 class="challenge-title">${challenge.title}</h4>
        <span class="challenge-difficulty difficulty-${challenge.difficulty.toLowerCase()}">${
      challenge.difficulty
    }</span>
      </div>
      <div class="challenge-description">
        ${challenge.description}
      </div>
      <div class="challenge-actions">
        ${
          challenge.accepted
            ? `
          <button id="challenge-complete" class="challenge-button primary">Complete Challenge</button>
        `
            : `
          <button id="challenge-accept" class="challenge-button primary">Accept Challenge</button>
          <button id="challenge-skip" class="challenge-button secondary">Skip</button>
        `
        }
      </div>
      <div class="challenge-reward">
        <span>Reward:</span>
        <span class="reward-xp">+${challenge.xpReward} XP</span>
      </div>
    `;

    challengeContainer.appendChild(challengeElement);
  }

  /**
   * Generate a new daily challenge
   */
  function generateDailyChallenge() {
    const userData = getUserData();

    // Check if there's already an active challenge
    if (userData.gamification.dailyChallenge) {
      // Only regenerate if it's a new day
      const lastChallengeDate = new Date(
        userData.gamification.dailyChallenge.generatedAt
      );
      const today = new Date();

      if (lastChallengeDate.toDateString() === today.toDateString()) {
        // Already have a challenge for today
        renderDailyChallenge(userData.gamification);
        return;
      }
    }

    // Define challenge templates
    const challengeTemplates = [
      {
        title: "Algorithm Challenge",
        description:
          "Solve a binary search problem on LeetCode or any coding platform.",
        difficulty: "Medium",
        xpReward: 30,
        category: "DSA",
      },
      {
        title: "Data Structure Implementation",
        description:
          "Implement a linked list with insert, delete, and search operations.",
        difficulty: "Medium",
        xpReward: 35,
        category: "DSA",
      },
      {
        title: "OS Concept Review",
        description:
          "Write a summary of process scheduling algorithms and their trade-offs.",
        difficulty: "Hard",
        xpReward: 40,
        category: "Core",
      },
      {
        title: "Database Query Challenge",
        description:
          "Write SQL queries for joins, aggregations, and subqueries on a sample database.",
        difficulty: "Medium",
        xpReward: 30,
        category: "Core",
      },
      {
        title: "Networking Fundamentals",
        description:
          "Explain the TCP/IP protocol stack and how data flows through each layer.",
        difficulty: "Hard",
        xpReward: 40,
        category: "Core",
      },
      {
        title: "Project Repository Setup",
        description:
          "Create a new GitHub repository with proper README, .gitignore, and project structure.",
        difficulty: "Easy",
        xpReward: 20,
        category: "Projects",
      },
      {
        title: "Frontend Mini-Project",
        description:
          "Build a simple to-do list app using HTML, CSS, and JavaScript.",
        difficulty: "Medium",
        xpReward: 35,
        category: "Projects",
      },
      {
        title: "Backend API Development",
        description:
          "Create a RESTful API endpoint with proper error handling and validation.",
        difficulty: "Hard",
        xpReward: 45,
        category: "Projects",
      },
      {
        title: "System Design Exercise",
        description:
          "Design a high-level architecture for a URL shortening service.",
        difficulty: "Hard",
        xpReward: 50,
        category: "Core",
      },
      {
        title: "Code Optimization",
        description:
          "Refactor an existing piece of code to improve its time or space complexity.",
        difficulty: "Medium",
        xpReward: 35,
        category: "DSA",
      },
    ];

    // Select a random challenge
    const randomIndex = Math.floor(Math.random() * challengeTemplates.length);
    const selectedChallenge = challengeTemplates[randomIndex];

    // Create the challenge object
    const newChallenge = {
      ...selectedChallenge,
      id: `challenge_${Date.now()}`,
      generatedAt: new Date().toISOString(),
      accepted: false,
      completed: false,
    };

    // Save the challenge
    userData.gamification.dailyChallenge = newChallenge;
    saveUserData(userData);

    // Render the challenge
    renderDailyChallenge(userData.gamification);

    // Show notification
    showNotification("🎯 New daily challenge available!");
  }

  /**
   * Accept the daily challenge
   */
  function acceptDailyChallenge() {
    const userData = getUserData();

    if (userData.gamification.dailyChallenge) {
      userData.gamification.dailyChallenge.accepted = true;
      saveUserData(userData);

      // Update the UI
      renderDailyChallenge(userData.gamification);

      // Show notification
      showNotification("🎯 Challenge accepted! Good luck!");
    }
  }

  /**
   * Skip the daily challenge
   */
  function skipDailyChallenge() {
    const userData = getUserData();

    // Remove the current challenge
    userData.gamification.dailyChallenge = null;
    saveUserData(userData);

    // Update the UI
    renderDailyChallenge(userData.gamification);
  }

  /**
   * Complete the daily challenge
   */
  function completeDailyChallenge() {
    const userData = getUserData();

    if (userData.gamification.dailyChallenge) {
      const challenge = userData.gamification.dailyChallenge;

      // Award XP
      awardXP(challenge.xpReward);

      // Add to completed challenges
      if (!userData.gamification.completedChallenges) {
        userData.gamification.completedChallenges = [];
      }

      userData.gamification.completedChallenges.push({
        id: challenge.id,
        title: challenge.title,
        difficulty: challenge.difficulty,
        completedAt: new Date().toISOString(),
        xpAwarded: challenge.xpReward,
      });

      // Progress related skills
      progressSkillByCategory(challenge.category, 1);

      // Remove the completed challenge
      userData.gamification.dailyChallenge = null;
      saveUserData(userData);

      // Update the UI
      renderDailyChallenge(userData.gamification);

      // Show notification
      showNotification(`🎉 Challenge completed! +${challenge.xpReward} XP`);
    }
  }

  /**
   * Handle task completion
   * @param {Object} detail - The task completion details
   */
  function handleTaskCompletion(detail) {
    if (detail.completed) {
      // Award XP for completing a task
      awardXP(10);

      // Get the task details
      const userData = getUserData();
      const scheduleToUse =
        userData.dailySchedule && userData.dailySchedule[detail.day]
          ? userData.dailySchedule[detail.day]
          : scheduleData.dailySchedule[detail.day];

      const task = scheduleToUse[detail.taskIndex];

      // Categorize the task
      const category = categorizeTaskForSkill(task.activity);

      // Progress related skills
      progressSkillByCategory(category, 1);
    }
  }

  /**
   * Categorize a task for skill progression
   * @param {string} activity - The task activity description
   * @returns {string} The category for skill progression
   */
  function categorizeTaskForSkill(activity) {
    const activityLower = activity.toLowerCase();

    if (
      activityLower.includes("dsa") ||
      activityLower.includes("algorithm") ||
      activityLower.includes("leetcode") ||
      activityLower.includes("data structure")
    ) {
      return "dsa";
    } else if (
      activityLower.includes("os") ||
      activityLower.includes("operating system") ||
      activityLower.includes("dbms") ||
      activityLower.includes("database") ||
      activityLower.includes("network") ||
      activityLower.includes("cn") ||
      activityLower.includes("system design")
    ) {
      return "core";
    } else if (
      activityLower.includes("project") ||
      activityLower.includes("github") ||
      activityLower.includes("git") ||
      activityLower.includes("frontend") ||
      activityLower.includes("backend") ||
      activityLower.includes("full stack")
    ) {
      return "projects";
    } else {
      // Default to a random category
      const categories = ["dsa", "core", "projects"];
      return categories[Math.floor(Math.random() * categories.length)];
    }
  }

  /**
   * Progress a skill by category
   * @param {string} category - The skill category
   * @param {number} amount - The amount to progress
   */
  function progressSkillByCategory(category, amount) {
    const userData = getUserData();

    // Find the first non-completed, non-locked skill in the category
    if (userData.gamification.skills[category]) {
      const skills = userData.gamification.skills[category].skills;

      // First, try to find an active skill (already has some progress)
      let skillToProgress = skills.find(
        (skill) => !skill.completed && !skill.locked && skill.progress > 0
      );

      // If no active skill, find the first available skill
      if (!skillToProgress) {
        skillToProgress = skills.find(
          (skill) => !skill.completed && !skill.locked
        );
      }

      if (skillToProgress) {
        // Progress the skill
        skillToProgress.progress += amount;

        // Check if skill is completed
        if (skillToProgress.progress >= skillToProgress.maxProgress) {
          skillToProgress.completed = true;
          skillToProgress.progress = skillToProgress.maxProgress;

          // Award XP for completing a skill
          awardXP(25);

          // Show notification
          showNotification(
            `🌟 Skill mastered: ${skillToProgress.name}! +25 XP`
          );

          // Update skill locks
          updateSkillLocks(userData.gamification);
        }

        // Save the updated data
        saveUserData(userData);
      }
    }
  }

  /**
   * Award XP to the user
   * @param {number} amount - The amount of XP to award
   */
  function awardXP(amount) {
    const userData = getUserData();

    // Add XP
    userData.gamification.xp += amount;

    // Check for level up
    const xpForNextLevel = userData.gamification.level * 100;
    if (userData.gamification.xp >= xpForNextLevel) {
      // Level up
      userData.gamification.level += 1;
      userData.gamification.xp -= xpForNextLevel;

      // Show level up notification
      showNotification(
        `🎊 Level Up! You are now level ${userData.gamification.level}!`
      );
    } else {
      // Show XP notification
      showNotification(`✨ +${amount} XP`);
    }

    // Save the updated data
    saveUserData(userData);

    // Update the display
    updateXPDisplay(userData.gamification);
  }

  /**
   * Show badge details
   * @param {string} badgeId - The ID of the badge
   */
  function showBadgeDetails(badgeId) {
    // This could be expanded to show a modal with more details
    console.log("Badge details:", badgeId);
  }

  /**
   * Show skill details
   * @param {string} category - The skill category
   * @param {string} skillId - The ID of the skill
   */
  function showSkillDetails(category, skillId) {
    // This could be expanded to show a modal with more details
    console.log("Skill details:", category, skillId);
  }

  /**
   * Show a notification
   * @param {string} message - The notification message
   */
  function showNotification(message) {
    const notification = document.getElementById("xp-notification");
    if (!notification) return;

    // Set the message
    notification.textContent = message;

    // Show the notification
    notification.classList.add("show");

    // Hide after 3 seconds
    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }

  /**
   * Render the challenges section
   */
  function renderChallengesSection() {
    const challengesContainer = document.getElementById("challenges-container");
    const completedChallengesList = document.getElementById(
      "completed-challenges-list"
    );
    const newChallengeBtn = document.getElementById("new-challenge-btn");

    if (!challengesContainer || !completedChallengesList) return;

    // Clear existing content
    challengesContainer.innerHTML = "";
    completedChallengesList.innerHTML = "";

    // Get user data
    const userData = getUserData();
    if (!userData.gamification) return;

    // Add event listener to new challenge button
    if (newChallengeBtn) {
      newChallengeBtn.addEventListener("click", function () {
        generateDailyChallenge();
        renderChallengesSection();
      });
    }

    // Display active challenge if exists
    if (userData.gamification.dailyChallenge) {
      const challenge = userData.gamification.dailyChallenge;

      const challengeElement = document.createElement("div");
      challengeElement.className = "challenge-container";

      challengeElement.innerHTML = `
        <div class="challenge-header">
          <h4 class="challenge-title">${challenge.title}</h4>
          <span class="challenge-difficulty difficulty-${challenge.difficulty.toLowerCase()}">${
        challenge.difficulty
      }</span>
        </div>
        <div class="challenge-description">
          ${challenge.description}
        </div>
        <div class="challenge-actions">
          ${
            challenge.accepted
              ? `
            <button id="challenge-complete" class="challenge-button primary">Complete Challenge</button>
          `
              : `
            <button id="challenge-accept" class="challenge-button primary">Accept Challenge</button>
            <button id="challenge-skip" class="challenge-button secondary">Skip</button>
          `
          }
        </div>
        <div class="challenge-reward">
          <span>Reward:</span>
          <span class="reward-xp">+${challenge.xpReward} XP</span>
        </div>
      `;

      challengesContainer.appendChild(challengeElement);
    } else {
      // No active challenge
      challengesContainer.innerHTML = `
        <div class="text-center p-4 bg-stone-50 rounded-lg">
          <p class="text-stone-600 mb-4">No active challenge. Generate a new one!</p>
        </div>
      `;
    }

    // Display completed challenges
    if (
      userData.gamification.completedChallenges &&
      userData.gamification.completedChallenges.length > 0
    ) {
      // Sort by completion date (newest first)
      const sortedChallenges = [
        ...userData.gamification.completedChallenges,
      ].sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));

      sortedChallenges.forEach((challenge) => {
        const completedDate = new Date(
          challenge.completedAt
        ).toLocaleDateString();

        const challengeItem = document.createElement("div");
        challengeItem.className =
          "bg-stone-50 p-3 rounded-lg flex justify-between items-center";

        challengeItem.innerHTML = `
          <div>
            <div class="font-medium">${challenge.title}</div>
            <div class="text-sm text-stone-500">Completed on ${completedDate}</div>
          </div>
          <div class="flex items-center">
            <span class="challenge-difficulty difficulty-${challenge.difficulty.toLowerCase()} text-xs mr-2">${
          challenge.difficulty
        }</span>
            <span class="text-sky-600 font-medium">+${
              challenge.xpAwarded
            } XP</span>
          </div>
        `;

        completedChallengesList.appendChild(challengeItem);
      });
    } else {
      completedChallengesList.innerHTML = `
        <div class="text-center p-4 bg-stone-50 rounded-lg">
          <p class="text-stone-500">No completed challenges yet. Start completing challenges to see your history here!</p>
        </div>
      `;
    }

    // Set up event listeners for challenge buttons
    document.querySelectorAll("#challenge-accept").forEach((btn) => {
      btn.addEventListener("click", function () {
        acceptDailyChallenge();
        renderChallengesSection();
      });
    });

    document.querySelectorAll("#challenge-skip").forEach((btn) => {
      btn.addEventListener("click", function () {
        skipDailyChallenge();
        renderChallengesSection();
      });
    });

    document.querySelectorAll("#challenge-complete").forEach((btn) => {
      btn.addEventListener("click", function () {
        completeDailyChallenge();
        renderChallengesSection();
      });
    });
  }

  // Make certain functions available globally
  window.updateGamificationElements = updateGamificationElements;
  window.awardXP = awardXP;
  window.generateDailyChallenge = generateDailyChallenge;
  window.renderChallengesSection = renderChallengesSection;
});
