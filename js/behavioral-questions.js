/**
 * Behavioral Questions Module
 * Handles the behavioral question bank functionality
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the behavioral questions module when the DOM is loaded
  initBehavioralQuestions();

  // Listen for navigation events
  document.addEventListener("behavioralQuestionsSelected", function () {
    refreshQuestionsList();
  });
});

/**
 * Initialize the behavioral questions module
 */
function initBehavioralQuestions() {
  // Set up event listeners for behavioral questions section
  setupBehavioralQuestionsEventListeners();

  // Initial population of questions
  refreshQuestionsList();
}

/**
 * Set up event listeners for the behavioral questions section
 */
function setupBehavioralQuestionsEventListeners() {
  // Category filter change
  const categoryFilter = document.getElementById("question-category-filter");
  if (categoryFilter) {
    categoryFilter.addEventListener("change", function () {
      filterQuestions();
    });
  }

  // Difficulty filter change
  const difficultyFilter = document.getElementById(
    "question-difficulty-filter"
  );
  if (difficultyFilter) {
    difficultyFilter.addEventListener("change", function () {
      filterQuestions();
    });
  }

  // Search input
  const searchInput = document.getElementById("question-search");
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      filterQuestions();
    });
  }

  // Random question button
  const randomQuestionBtn = document.getElementById("random-question-btn");
  if (randomQuestionBtn) {
    randomQuestionBtn.addEventListener("click", function () {
      showRandomQuestion();
    });
  }

  // Add question button
  const addQuestionBtn = document.getElementById("add-question-btn");
  if (addQuestionBtn) {
    addQuestionBtn.addEventListener("click", function () {
      // Show the add question modal
      const addQuestionModal = document.getElementById("add-question-modal");
      if (addQuestionModal) {
        addQuestionModal.classList.remove("hidden");
      }
    });
  }

  // Add question form submission
  const addQuestionForm = document.getElementById("add-question-form");
  if (addQuestionForm) {
    addQuestionForm.addEventListener("submit", function (e) {
      e.preventDefault();
      saveNewQuestion();
    });
  }

  // Practice mode button
  const practiceBtn = document.getElementById("practice-mode-btn");
  if (practiceBtn) {
    practiceBtn.addEventListener("click", function () {
      startPracticeMode();
    });
  }

  // Close modal buttons
  const closeModalButtons = document.querySelectorAll(".close-modal-btn");
  closeModalButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Find the parent modal and hide it
      const modal = this.closest(".modal-container");
      if (modal) {
        modal.classList.add("hidden");
      }
    });
  });

  // Close modal when clicking outside
  const modalContainers = document.querySelectorAll(".modal-container");
  modalContainers.forEach((container) => {
    container.addEventListener("click", function (e) {
      if (e.target === this) {
        this.classList.add("hidden");
      }
    });
  });

  // Practice mode controls
  document.addEventListener("click", function (e) {
    // Next question button in practice mode
    if (e.target.matches("#practice-next-btn")) {
      showNextPracticeQuestion();
    }

    // End practice session button
    if (e.target.matches("#practice-end-btn")) {
      endPracticeMode();
    }

    // Save answer button in practice mode
    if (e.target.matches("#practice-save-btn")) {
      saveCurrentAnswer();
    }
  });
}

/**
 * Refresh the questions list
 */
function refreshQuestionsList() {
  // Populate category filter
  populateCategoryFilter();

  // Display all questions initially
  filterQuestions();
}

/**
 * Populate the category filter dropdown
 */
function populateCategoryFilter() {
  const categoryFilter = document.getElementById("question-category-filter");
  if (!categoryFilter) return;

  // Clear existing options except the "All Categories" option
  while (categoryFilter.options.length > 1) {
    categoryFilter.remove(1);
  }

  // Get all categories
  const categories = Object.keys(behavioralQuestionData);

  // Add options for each category
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    // Convert camelCase to Title Case with spaces
    const displayName = category
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
    option.textContent = displayName;
    categoryFilter.appendChild(option);
  });
}

/**
 * Filter questions based on selected filters and search term
 */
function filterQuestions() {
  const categoryFilter = document.getElementById("question-category-filter");
  const difficultyFilter = document.getElementById(
    "question-difficulty-filter"
  );
  const searchInput = document.getElementById("question-search");
  const questionsContainer = document.getElementById("questions-list");

  if (!questionsContainer) return;

  // Get filter values
  const selectedCategory = categoryFilter ? categoryFilter.value : "all";
  const selectedDifficulty = difficultyFilter ? difficultyFilter.value : "all";
  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";

  // Get questions based on filters
  let filteredQuestions = [];

  if (selectedCategory === "all") {
    filteredQuestions = getAllBehavioralQuestions();
  } else {
    filteredQuestions = getQuestionsByCategory(selectedCategory);
  }

  // Apply difficulty filter
  if (selectedDifficulty !== "all") {
    filteredQuestions = filteredQuestions.filter(
      (q) => q.difficulty === selectedDifficulty
    );
  }

  // Apply search filter
  if (searchTerm) {
    filteredQuestions = filteredQuestions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchTerm) ||
        q.category.toLowerCase().includes(searchTerm)
    );
  }

  // Display filtered questions
  displayQuestions(filteredQuestions);
}

/**
 * Display questions in the container
 * @param {Array} questions - The questions to display
 */
function displayQuestions(questions) {
  const questionsContainer = document.getElementById("questions-list");
  if (!questionsContainer) return;

  // Clear existing questions
  questionsContainer.innerHTML = "";

  if (questions.length === 0) {
    questionsContainer.innerHTML = `
      <div class="bg-stone-100 rounded-lg p-6 text-center">
        <p class="text-stone-600">No questions match your filters. Try adjusting your search criteria.</p>
      </div>
    `;
    return;
  }

  // Create a card for each question
  questions.forEach((question) => {
    const questionCard = document.createElement("div");
    questionCard.className =
      "bg-white shadow-md rounded-lg overflow-hidden mb-4 hover:shadow-lg transition-shadow duration-200";

    // Determine badge color based on difficulty
    let difficultyColor = "";
    switch (question.difficulty) {
      case "easy":
        difficultyColor = "bg-green-100 text-green-800";
        break;
      case "medium":
        difficultyColor = "bg-amber-100 text-amber-800";
        break;
      case "hard":
        difficultyColor = "bg-red-100 text-red-800";
        break;
      default:
        difficultyColor = "bg-stone-100 text-stone-800";
    }

    // Convert category from camelCase to Title Case with spaces
    const displayCategory = question.category
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());

    questionCard.innerHTML = `
      <div class="border-l-4 border-sky-500 px-6 py-4">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-semibold text-stone-800">${
            question.question
          }</h3>
          <span class="ml-2 ${difficultyColor} px-2 py-1 rounded-full text-xs font-medium">
            ${
              question.difficulty.charAt(0).toUpperCase() +
              question.difficulty.slice(1)
            }
          </span>
        </div>
        <p class="text-sm text-stone-500 mb-3">Category: ${displayCategory}</p>
        
        <div class="mt-2">
          <button class="view-tips-btn text-sky-600 hover:text-sky-800 text-sm font-medium flex items-center" data-question-id="${
            question.id
          }">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            View Tips
          </button>
          
          <div class="tips-container hidden mt-3 bg-sky-50 p-3 rounded-md">
            <h4 class="text-sm font-medium text-sky-800 mb-2">Response Tips:</h4>
            <ul class="list-disc pl-5 space-y-1">
              ${question.tips
                .map((tip) => `<li class="text-sm text-stone-700">${tip}</li>`)
                .join("")}
            </ul>
          </div>
        </div>
      </div>
    `;

    // Add event listener for the "View Tips" button
    const viewTipsBtn = questionCard.querySelector(".view-tips-btn");
    const tipsContainer = questionCard.querySelector(".tips-container");

    viewTipsBtn.addEventListener("click", function () {
      tipsContainer.classList.toggle("hidden");

      // Change button text based on visibility
      if (tipsContainer.classList.contains("hidden")) {
        this.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          View Tips
        `;
      } else {
        this.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
          </svg>
          Hide Tips
        `;
      }
    });

    questionsContainer.appendChild(questionCard);
  });
}

/**
 * Show a random behavioral question
 */
function showRandomQuestion() {
  const randomQuestion = getRandomQuestion();

  if (!randomQuestion) {
    showNotification("No questions available.", "error");
    return;
  }

  // Create and show the random question modal
  const modalContainer = document.createElement("div");
  modalContainer.className =
    "modal-container fixed inset-0 bg-stone-900 bg-opacity-50 flex items-center justify-center z-50";

  // Convert category from camelCase to Title Case with spaces
  const displayCategory = randomQuestion.category
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());

  // Determine badge color based on difficulty
  let difficultyColor = "";
  switch (randomQuestion.difficulty) {
    case "easy":
      difficultyColor = "bg-green-100 text-green-800";
      break;
    case "medium":
      difficultyColor = "bg-amber-100 text-amber-800";
      break;
    case "hard":
      difficultyColor = "bg-red-100 text-red-800";
      break;
    default:
      difficultyColor = "bg-stone-100 text-stone-800";
  }

  modalContainer.innerHTML = `
    <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 overflow-hidden">
      <div class="bg-sky-100 px-6 py-4 border-b border-sky-200 flex justify-between items-center">
        <h3 class="text-xl font-bold text-sky-800">Random Question</h3>
        <button class="close-modal-btn text-stone-500 hover:text-stone-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div class="p-6">
        <div class="flex justify-between items-start mb-4">
          <h4 class="text-lg font-semibold text-stone-800">${
            randomQuestion.question
          }</h4>
          <span class="ml-2 ${difficultyColor} px-2 py-1 rounded-full text-xs font-medium">
            ${
              randomQuestion.difficulty.charAt(0).toUpperCase() +
              randomQuestion.difficulty.slice(1)
            }
          </span>
        </div>
        
        <p class="text-sm text-stone-500 mb-4">Category: ${displayCategory}</p>
        
        <div class="bg-sky-50 p-4 rounded-md mb-6">
          <h5 class="text-sm font-medium text-sky-800 mb-2">Response Tips:</h5>
          <ul class="list-disc pl-5 space-y-1">
            ${randomQuestion.tips
              .map((tip) => `<li class="text-sm text-stone-700">${tip}</li>`)
              .join("")}
          </ul>
        </div>
        
        <div class="flex justify-end space-x-3">
          <button class="close-modal-btn bg-stone-200 hover:bg-stone-300 text-stone-800 px-4 py-2 rounded-md">
            Close
          </button>
          <button class="practice-this-btn bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md">
            Practice This Question
          </button>
        </div>
      </div>
    </div>
  `;

  // Add to document
  document.body.appendChild(modalContainer);

  // Add event listeners
  modalContainer
    .querySelector(".close-modal-btn")
    .addEventListener("click", function () {
      document.body.removeChild(modalContainer);
    });

  modalContainer
    .querySelector(".practice-this-btn")
    .addEventListener("click", function () {
      document.body.removeChild(modalContainer);
      startPracticeMode([randomQuestion]);
    });

  // Close when clicking outside
  modalContainer.addEventListener("click", function (e) {
    if (e.target === this) {
      document.body.removeChild(this);
    }
  });
}

/**
 * Save a new custom question
 */
function saveNewQuestion() {
  const form = document.getElementById("add-question-form");
  if (!form) return;

  // Get form values
  const questionText = form.querySelector("#new-question-text").value.trim();
  const category = form.querySelector("#new-question-category").value.trim();
  const difficulty = form.querySelector("#new-question-difficulty").value;

  // Process tips (line-separated)
  const tipsText = form.querySelector("#new-question-tips").value.trim();
  const tips = tipsText.split("\n").filter((tip) => tip.trim() !== "");

  // Create the question object
  const question = {
    question: questionText,
    category: category,
    difficulty: difficulty,
    tips: tips,
  };

  // Save the question
  saveCustomQuestion(question);

  // Refresh the questions list
  refreshQuestionsList();

  // Hide the modal
  const modal = document.getElementById("add-question-modal");
  if (modal) {
    modal.classList.add("hidden");
  }

  // Reset the form
  form.reset();

  // Show success message
  showNotification("Question has been added successfully!", "success");
}

// Practice mode variables
let practiceQuestions = [];
let currentQuestionIndex = 0;
let practiceAnswers = {};

/**
 * Start practice mode with filtered questions
 * @param {Array} questions - Optional array of questions to practice with
 */
function startPracticeMode(questions = null) {
  // Get questions to practice with
  if (!questions) {
    const categoryFilter = document.getElementById("question-category-filter");
    const difficultyFilter = document.getElementById(
      "question-difficulty-filter"
    );
    const searchInput = document.getElementById("question-search");

    // Get filter values
    const selectedCategory = categoryFilter ? categoryFilter.value : "all";
    const selectedDifficulty = difficultyFilter
      ? difficultyFilter.value
      : "all";
    const searchTerm = searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";

    // Get questions based on filters
    if (selectedCategory === "all") {
      practiceQuestions = getAllBehavioralQuestions();
    } else {
      practiceQuestions = getQuestionsByCategory(selectedCategory);
    }

    // Apply difficulty filter
    if (selectedDifficulty !== "all") {
      practiceQuestions = practiceQuestions.filter(
        (q) => q.difficulty === selectedDifficulty
      );
    }

    // Apply search filter
    if (searchTerm) {
      practiceQuestions = practiceQuestions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchTerm) ||
          q.category.toLowerCase().includes(searchTerm)
      );
    }
  } else {
    practiceQuestions = questions;
  }

  // Check if we have questions to practice
  if (practiceQuestions.length === 0) {
    showNotification("No questions available for practice.", "error");
    return;
  }

  // Reset practice variables
  currentQuestionIndex = 0;
  practiceAnswers = {};

  // Show the practice mode UI
  const questionsContainer = document.getElementById("questions-container");
  const practiceContainer = document.getElementById("practice-container");

  if (questionsContainer && practiceContainer) {
    questionsContainer.classList.add("hidden");
    practiceContainer.classList.remove("hidden");

    // Show the first question
    showCurrentPracticeQuestion();
  }
}

/**
 * Show the current question in practice mode
 */
function showCurrentPracticeQuestion() {
  const practiceQuestionContainer =
    document.getElementById("practice-question");
  const practiceProgressContainer =
    document.getElementById("practice-progress");
  const practiceAnswerContainer = document.getElementById("practice-answer");

  if (
    !practiceQuestionContainer ||
    !practiceProgressContainer ||
    !practiceAnswerContainer
  )
    return;

  const currentQuestion = practiceQuestions[currentQuestionIndex];

  // Update progress
  practiceProgressContainer.innerHTML = `Question ${
    currentQuestionIndex + 1
  } of ${practiceQuestions.length}`;

  // Convert category from camelCase to Title Case with spaces
  const displayCategory = currentQuestion.category
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase());

  // Determine badge color based on difficulty
  let difficultyColor = "";
  switch (currentQuestion.difficulty) {
    case "easy":
      difficultyColor = "bg-green-100 text-green-800";
      break;
    case "medium":
      difficultyColor = "bg-amber-100 text-amber-800";
      break;
    case "hard":
      difficultyColor = "bg-red-100 text-red-800";
      break;
    default:
      difficultyColor = "bg-stone-100 text-stone-800";
  }

  // Update question display
  practiceQuestionContainer.innerHTML = `
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="border-l-4 border-sky-500 px-6 py-4">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-semibold text-stone-800">${
            currentQuestion.question
          }</h3>
          <span class="ml-2 ${difficultyColor} px-2 py-1 rounded-full text-xs font-medium">
            ${
              currentQuestion.difficulty.charAt(0).toUpperCase() +
              currentQuestion.difficulty.slice(1)
            }
          </span>
        </div>
        <p class="text-sm text-stone-500 mb-3">Category: ${displayCategory}</p>
        
        <div class="mt-2">
          <button class="view-tips-btn text-sky-600 hover:text-sky-800 text-sm font-medium flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            View Tips
          </button>
          
          <div class="tips-container hidden mt-3 bg-sky-50 p-3 rounded-md">
            <h4 class="text-sm font-medium text-sky-800 mb-2">Response Tips:</h4>
            <ul class="list-disc pl-5 space-y-1">
              ${currentQuestion.tips
                .map((tip) => `<li class="text-sm text-stone-700">${tip}</li>`)
                .join("")}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  // Add event listener for the "View Tips" button
  const viewTipsBtn = practiceQuestionContainer.querySelector(".view-tips-btn");
  const tipsContainer =
    practiceQuestionContainer.querySelector(".tips-container");

  viewTipsBtn.addEventListener("click", function () {
    tipsContainer.classList.toggle("hidden");

    // Change button text based on visibility
    if (tipsContainer.classList.contains("hidden")) {
      this.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        View Tips
      `;
    } else {
      this.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
        Hide Tips
      `;
    }
  });

  // Update answer textarea
  const answerTextarea = practiceAnswerContainer.querySelector("textarea");
  if (answerTextarea) {
    // Load saved answer if available
    answerTextarea.value = practiceAnswers[currentQuestion.id] || "";
  }
}

/**
 * Show the next question in practice mode
 */
function showNextPracticeQuestion() {
  // Save current answer first
  saveCurrentAnswer();

  // Move to next question
  currentQuestionIndex++;

  // Check if we've reached the end
  if (currentQuestionIndex >= practiceQuestions.length) {
    // Show practice summary
    showPracticeSummary();
    return;
  }

  // Show the next question
  showCurrentPracticeQuestion();
}

/**
 * Save the current answer in practice mode
 */
function saveCurrentAnswer() {
  const answerTextarea = document.querySelector("#practice-answer textarea");
  if (!answerTextarea) return;

  const currentQuestion = practiceQuestions[currentQuestionIndex];
  practiceAnswers[currentQuestion.id] = answerTextarea.value.trim();

  // Show save confirmation
  showNotification("Answer saved!", "success");
}

/**
 * Show practice summary at the end of practice session
 */
function showPracticeSummary() {
  const practiceQuestionContainer =
    document.getElementById("practice-question");
  const practiceProgressContainer =
    document.getElementById("practice-progress");
  const practiceAnswerContainer = document.getElementById("practice-answer");
  const practiceControlsContainer =
    document.getElementById("practice-controls");

  if (
    !practiceQuestionContainer ||
    !practiceProgressContainer ||
    !practiceAnswerContainer ||
    !practiceControlsContainer
  )
    return;

  // Update progress
  practiceProgressContainer.innerHTML = `Practice Complete: ${practiceQuestions.length} questions answered`;

  // Update question container with summary
  practiceQuestionContainer.innerHTML = `
    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div class="px-6 py-4">
        <h3 class="text-xl font-bold text-sky-800 mb-4">Practice Session Complete!</h3>
        <p class="text-stone-700 mb-3">You've completed your practice session with ${practiceQuestions.length} behavioral questions.</p>
        <p class="text-stone-700 mb-3">Your answers have been saved. You can review them below or end the session to return to the question bank.</p>
      </div>
    </div>
  `;

  // Update answer container with summary of answers
  let answersHtml = `
    <div class="bg-white shadow-md rounded-lg overflow-hidden p-4">
      <h4 class="text-lg font-semibold text-sky-800 mb-3">Your Answers:</h4>
      <div class="space-y-4">
  `;

  practiceQuestions.forEach((question, index) => {
    const answer = practiceAnswers[question.id] || "No answer provided";
    answersHtml += `
      <div class="border-l-4 border-sky-200 pl-3 py-1">
        <p class="font-medium text-stone-800 mb-1">Q${index + 1}: ${
      question.question
    }</p>
        <p class="text-stone-700 whitespace-pre-line">${answer}</p>
      </div>
    `;
  });

  answersHtml += `
      </div>
    </div>
  `;

  practiceAnswerContainer.innerHTML = answersHtml;

  // Update controls
  practiceControlsContainer.innerHTML = `
    <button id="practice-end-btn" class="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md">
      End Session
    </button>
  `;
}

/**
 * End practice mode and return to question bank
 */
function endPracticeMode() {
  const questionsContainer = document.getElementById("questions-container");
  const practiceContainer = document.getElementById("practice-container");

  if (questionsContainer && practiceContainer) {
    practiceContainer.classList.add("hidden");
    questionsContainer.classList.remove("hidden");
  }
}

/**
 * Show a notification message
 * @param {string} message - The message to display
 * @param {string} type - The type of notification (success, error, info)
 */
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
    type === "success"
      ? "bg-green-500 text-white"
      : type === "error"
      ? "bg-red-500 text-white"
      : "bg-sky-500 text-white"
  }`;
  notification.textContent = message;

  // Add to document
  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.add(
      "opacity-0",
      "transition-opacity",
      "duration-500"
    );
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 500);
  }, 3000);
}
