/**
 * Practitioner Mode Module
 * Simulates coding interview environment with timed algorithm challenges
 */

document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const startPracticeBtn = document.getElementById("startPracticeBtn");
  const endPracticeBtn = document.getElementById("endPracticeBtn");
  const nextQuestionBtn = document.getElementById("nextQuestionBtn");
  const practiceTimerDisplay = document.getElementById("practiceTimerDisplay");
  const questionDisplay = document.getElementById("questionDisplay");
  const questionCounter = document.getElementById("questionCounter");
  const difficultySelector = document.getElementById("difficultySelector");
  const practiceResultsArea = document.getElementById("practiceResultsArea");

  // State variables
  let practiceActive = false;
  let timerInterval = null;
  let startTime = null;
  let selectedDifficulty = "easy";
  let currentQuestion = null;
  let currentQuestionIndex = 0;
  let selectedQuestions = [];
  let totalQuestions = 3; // Number of questions per interview session
  let timeLimit = 0; // in minutes
  let totalSessionTimeLimit = 0; // Total time for all questions

  // Sample algorithm questions by difficulty
  const algorithmQuestions = {
    easy: [
      {
        id: 1,
        title: "Two Sum",
        description:
          "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nExample:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].",
        timeLimit: 15, // 15 minutes
        testCases: [
          { input: "nums = [2,7,11,15], target = 9", expectedOutput: "[0,1]" },
          { input: "nums = [3,2,4], target = 6", expectedOutput: "[1,2]" },
          { input: "nums = [3,3], target = 6", expectedOutput: "[0,1]" },
        ],
      },
      {
        id: 2,
        title: "Valid Palindrome",
        description:
          "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.\n\nExample:\nInput: s = 'A man, a plan, a canal: Panama'\nOutput: true\nExplanation: 'amanaplanacanalpanama' is a palindrome.",
        timeLimit: 10, // 10 minutes
        testCases: [
          {
            input: "s = 'A man, a plan, a canal: Panama'",
            expectedOutput: "true",
          },
          { input: "s = 'race a car'", expectedOutput: "false" },
          { input: "s = ' '", expectedOutput: "true" },
        ],
      },
      {
        id: 3,
        title: "Maximum Subarray",
        description:
          "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.\n\nExample:\nInput: nums = [-2,1,-3,4,-1,2,1,-5,4]\nOutput: 6\nExplanation: [4,-1,2,1] has the largest sum = 6.",
        timeLimit: 15, // 15 minutes
        testCases: [
          { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6" },
          { input: "nums = [1]", expectedOutput: "1" },
          { input: "nums = [5,4,-1,7,8]", expectedOutput: "23" },
        ],
      },
      {
        id: 10,
        title: "Reverse String",
        description:
          "Write a function that reverses a string. The input string is given as an array of characters.\n\nExample:\nInput: s = ['h','e','l','l','o']\nOutput: ['o','l','l','e','h']\n\nDo this in-place with O(1) extra memory.",
        timeLimit: 10, // 10 minutes
        testCases: [
          {
            input: "s = ['h','e','l','l','o']",
            expectedOutput: "['o','l','l','e','h']",
          },
          {
            input: "s = ['H','a','n','n','a','h']",
            expectedOutput: "['h','a','n','n','a','H']",
          },
        ],
      },
      {
        id: 11,
        title: "First Unique Character",
        description:
          "Given a string s, find the first non-repeating character and return its index. If it doesn't exist, return -1.\n\nExample:\nInput: s = 'leetcode'\nOutput: 0\nExplanation: The first non-repeating character is 'l', which appears at index 0.",
        timeLimit: 10, // 10 minutes
        testCases: [
          { input: "s = 'leetcode'", expectedOutput: "0" },
          { input: "s = 'loveleetcode'", expectedOutput: "2" },
          { input: "s = 'aabb'", expectedOutput: "-1" },
        ],
      },
      {
        id: 16,
        title: "Merge Sorted Array",
        description:
          "You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.\n\nMerge nums1 and nums2 into a single array sorted in non-decreasing order.\n\nThe final sorted array should not be returned by the function, but instead be stored inside the array nums1. To accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.\n\nExample:\nInput: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3\nOutput: [1,2,2,3,5,6]",
        timeLimit: 15, // 15 minutes
        testCases: [
          {
            input: "nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3",
            expectedOutput: "[1,2,2,3,5,6]",
          },
          {
            input: "nums1 = [1], m = 1, nums2 = [], n = 0",
            expectedOutput: "[1]",
          },
          {
            input: "nums1 = [0], m = 0, nums2 = [1], n = 1",
            expectedOutput: "[1]",
          },
        ],
      },
      {
        id: 17,
        title: "Climbing Stairs",
        description:
          "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?\n\nExample:\nInput: n = 2\nOutput: 2\nExplanation: There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps",
        timeLimit: 10, // 10 minutes
        testCases: [
          { input: "n = 2", expectedOutput: "2" },
          { input: "n = 3", expectedOutput: "3" },
          { input: "n = 4", expectedOutput: "5" },
        ],
      },
      {
        id: 18,
        title: "Best Time to Buy and Sell Stock",
        description:
          "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.\n\nExample:\nInput: prices = [7,1,5,3,6,4]\nOutput: 5\nExplanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.",
        timeLimit: 15, // 15 minutes
        testCases: [
          { input: "prices = [7,1,5,3,6,4]", expectedOutput: "5" },
          { input: "prices = [7,6,4,3,1]", expectedOutput: "0" },
          { input: "prices = [2,4,1]", expectedOutput: "2" },
        ],
      },
    ],
    medium: [
      {
        id: 4,
        title: "Longest Substring Without Repeating Characters",
        description:
          "Given a string s, find the length of the longest substring without repeating characters.\n\nExample:\nInput: s = 'abcabcbb'\nOutput: 3\nExplanation: The answer is 'abc', with the length of 3.",
        timeLimit: 20, // 20 minutes
        testCases: [
          { input: "s = 'abcabcbb'", expectedOutput: "3" },
          { input: "s = 'bbbbb'", expectedOutput: "1" },
          { input: "s = 'pwwkew'", expectedOutput: "3" },
        ],
      },
      {
        id: 5,
        title: "3Sum",
        description:
          "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nExample:\nInput: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]\nExplanation: The triplets that sum to zero are [-1,-1,2] and [-1,0,1].",
        timeLimit: 25, // 25 minutes
        testCases: [
          {
            input: "nums = [-1,0,1,2,-1,-4]",
            expectedOutput: "[[-1,-1,2],[-1,0,1]]",
          },
          { input: "nums = []", expectedOutput: "[]" },
          { input: "nums = [0]", expectedOutput: "[]" },
        ],
      },
      {
        id: 6,
        title: "Container With Most Water",
        description:
          "Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of the line i is at (i, ai) and (i, 0). Find two lines, which, together with the x-axis forms a container, such that the container contains the most water.\n\nExample:\nInput: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49\nExplanation: The max area is obtained by selecting the 2nd and 8th lines, with heights 8 and 7, and distance 6 between them.",
        timeLimit: 20, // 20 minutes
        testCases: [
          { input: "height = [1,8,6,2,5,4,8,3,7]", expectedOutput: "49" },
          { input: "height = [1,1]", expectedOutput: "1" },
          { input: "height = [4,3,2,1,4]", expectedOutput: "16" },
        ],
      },
      {
        id: 12,
        title: "Group Anagrams",
        description:
          "Given an array of strings strs, group the anagrams together. You can return the answer in any order.\n\nExample:\nInput: strs = ['eat','tea','tan','ate','nat','bat']\nOutput: [['bat'],['nat','tan'],['ate','eat','tea']]\n\nAn Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
        timeLimit: 20, // 20 minutes
        testCases: [
          {
            input: "strs = ['eat','tea','tan','ate','nat','bat']",
            expectedOutput: "[['bat'],['nat','tan'],['ate','eat','tea']]",
          },
          { input: "strs = ['']", expectedOutput: "[['']]" },
          { input: "strs = ['a']", expectedOutput: "[['a']]" },
        ],
      },
      {
        id: 13,
        title: "Rotate Image",
        description:
          "You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).\n\nYou have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.\n\nExample:\nInput: matrix = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [[7,4,1],[8,5,2],[9,6,3]]",
        timeLimit: 25, // 25 minutes
        testCases: [
          {
            input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
            expectedOutput: "[[7,4,1],[8,5,2],[9,6,3]]",
          },
          {
            input: "matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]",
            expectedOutput: "[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]",
          },
        ],
      },
      {
        id: 19,
        title: "Coin Change",
        description:
          "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.\n\nExample:\nInput: coins = [1,2,5], amount = 11\nOutput: 3\nExplanation: 11 = 5 + 5 + 1",
        timeLimit: 25, // 25 minutes
        testCases: [
          { input: "coins = [1,2,5], amount = 11", expectedOutput: "3" },
          { input: "coins = [2], amount = 3", expectedOutput: "-1" },
          { input: "coins = [1], amount = 0", expectedOutput: "0" },
        ],
      },
      {
        id: 20,
        title: "Product of Array Except Self",
        description:
          "Given an integer array nums, return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i]. The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer. You must write an algorithm running in O(n) time and without using the division operation.\n\nExample:\nInput: nums = [1,2,3,4]\nOutput: [24,12,8,6]",
        timeLimit: 20, // 20 minutes
        testCases: [
          { input: "nums = [1,2,3,4]", expectedOutput: "[24,12,8,6]" },
          { input: "nums = [-1,1,0,-3,3]", expectedOutput: "[0,0,-9,0,0]" },
        ],
      },
      {
        id: 21,
        title: "Validate Binary Search Tree",
        description:
          "Given the root of a binary tree, determine if it is a valid binary search tree (BST). A valid BST is defined as follows: The left subtree of a node contains only nodes with keys less than the node's key. The right subtree of a node contains only nodes with keys greater than the node's key. Both the left and right subtrees must also be binary search trees.\n\nExample:\nInput: root = [2,1,3]\nOutput: true",
        timeLimit: 20, // 20 minutes
        testCases: [
          { input: "root = [2,1,3]", expectedOutput: "true" },
          { input: "root = [5,1,4,null,null,3,6]", expectedOutput: "false" },
        ],
      },
    ],
    hard: [
      {
        id: 7,
        title: "Median of Two Sorted Arrays",
        description:
          "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nExample:\nInput: nums1 = [1,3], nums2 = [2]\nOutput: 2.0\nExplanation: The median is 2.0.",
        timeLimit: 30, // 30 minutes
        testCases: [
          { input: "nums1 = [1,3], nums2 = [2]", expectedOutput: "2.0" },
          { input: "nums1 = [1,2], nums2 = [3,4]", expectedOutput: "2.5" },
          { input: "nums1 = [0,0], nums2 = [0,0]", expectedOutput: "0.0" },
        ],
      },
      {
        id: 8,
        title: "Regular Expression Matching",
        description:
          "Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:\n'.' Matches any single character.\n'*' Matches zero or more of the preceding element.\nThe matching should cover the entire input string (not partial).\n\nExample:\nInput: s = 'aa', p = 'a*'\nOutput: true\nExplanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes 'aa'.",
        timeLimit: 35, // 35 minutes
        testCases: [
          { input: "s = 'aa', p = 'a*'", expectedOutput: "true" },
          { input: "s = 'ab', p = '.*'", expectedOutput: "true" },
          { input: "s = 'aab', p = 'c*a*b'", expectedOutput: "true" },
        ],
      },
      {
        id: 9,
        title: "Trapping Rain Water",
        description:
          "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\n\nExample:\nInput: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6\nExplanation: The elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water are being trapped.",
        timeLimit: 25, // 25 minutes
        testCases: [
          { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", expectedOutput: "6" },
          { input: "height = [4,2,0,3,2,5]", expectedOutput: "9" },
          { input: "height = [4,2,3]", expectedOutput: "1" },
        ],
      },
      {
        id: 14,
        title: "Merge k Sorted Lists",
        description:
          "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.\n\nExample:\nInput: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]\nExplanation: The linked-lists are:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nmerging them into one sorted list:\n1->1->2->3->4->4->5->6",
        timeLimit: 30, // 30 minutes
        testCases: [
          {
            input: "lists = [[1,4,5],[1,3,4],[2,6]]",
            expectedOutput: "[1,1,2,3,4,4,5,6]",
          },
          { input: "lists = []", expectedOutput: "[]" },
          { input: "lists = [[]]", expectedOutput: "[]" },
        ],
      },
      {
        id: 15,
        title: "Word Search II",
        description:
          "Given an m x n board of characters and a list of strings words, return all words on the board. Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.\n\nExample:\nInput: board = [['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']], words = ['oath','pea','eat','rain']\nOutput: ['eat','oath']",
        timeLimit: 40, // 40 minutes
        testCases: [
          {
            input:
              "board = [['o','a','a','n'],['e','t','a','e'],['i','h','k','r'],['i','f','l','v']], words = ['oath','pea','eat','rain']",
            expectedOutput: "['eat','oath']",
          },
          {
            input: "board = [['a','b'],['c','d']], words = ['abcb']",
            expectedOutput: "[]",
          },
        ],
      },
      {
        id: 22,
        title: "Longest Consecutive Sequence",
        description:
          "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. You must write an algorithm that runs in O(n) time.\n\nExample:\nInput: nums = [100,4,200,1,3,2]\nOutput: 4\nExplanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.",
        timeLimit: 25, // 25 minutes
        testCases: [
          { input: "nums = [100,4,200,1,3,2]", expectedOutput: "4" },
          { input: "nums = [0,3,7,2,5,8,4,6,0,1]", expectedOutput: "9" },
        ],
      },
      {
        id: 23,
        title: "Minimum Window Substring",
        description:
          'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".\n\nExample:\nInput: s = "ADOBECODEBANC", t = "ABC"\nOutput: "BANC"\nExplanation: The minimum window substring "BANC" includes \'A\', \'B\', and \'C\' from string t.',
        timeLimit: 30, // 30 minutes
        testCases: [
          { input: 's = "ADOBECODEBANC", t = "ABC"', expectedOutput: '"BANC"' },
          { input: 's = "a", t = "a"', expectedOutput: '"a"' },
          { input: 's = "a", t = "aa"', expectedOutput: '""' },
        ],
      },
      {
        id: 24,
        title: "Serialize and Deserialize Binary Tree",
        description:
          "Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.\n\nExample:\nInput: root = [1,2,3,null,null,4,5]\nOutput: [1,2,3,null,null,4,5]",
        timeLimit: 35, // 35 minutes
        testCases: [
          {
            input: "root = [1,2,3,null,null,4,5]",
            expectedOutput: "[1,2,3,null,null,4,5]",
          },
          { input: "root = []", expectedOutput: "[]" },
        ],
      },
    ],
  };

  // Initialize event listeners
  function initPractitionerMode() {
    if (startPracticeBtn) {
      startPracticeBtn.addEventListener("click", startPractice);
    }

    if (endPracticeBtn) {
      endPracticeBtn.addEventListener("click", endPractice);
    }

    if (nextQuestionBtn) {
      nextQuestionBtn.addEventListener("click", showNextQuestion);
    }

    if (difficultySelector) {
      difficultySelector.addEventListener("change", function () {
        selectedDifficulty = this.value;
      });
    }

    // Listen for custom event when practitioner section is selected
    // Use a named function so we can remove it if needed
    function handlePractitionerSelected() {
      resetPractitionerUI();
    }

    // Remove any existing event listener to prevent duplicates
    document.removeEventListener(
      "practitionerSelected",
      handlePractitionerSelected
    );

    // Add the event listener
    document.addEventListener(
      "practitionerSelected",
      handlePractitionerSelected
    );
  }

  // Start practice session
  function startPractice() {
    if (practiceActive) return;

    // Lock the UI
    document.body.classList.add("practice-mode-active");
    practiceActive = true;

    // Select random questions based on difficulty
    const questions = algorithmQuestions[selectedDifficulty];
    selectedQuestions = selectRandomQuestions(questions, totalQuestions);
    currentQuestionIndex = 0;

    // Calculate total session time limit
    totalSessionTimeLimit = selectedQuestions.reduce(
      (total, q) => total + q.timeLimit,
      0
    );

    // Update question counter
    questionCounter.textContent = `Question 1/${totalQuestions}`;

    // Show first question
    showCurrentQuestion();

    // Show relevant UI elements
    startPracticeBtn.classList.add("hidden");
    endPracticeBtn.classList.remove("hidden");
    nextQuestionBtn.classList.remove("hidden");
    difficultySelector.disabled = true;
    practiceResultsArea.innerHTML = "";

    // Start timer
    startTime = new Date();
    updateTimerDisplay();
    timerInterval = setInterval(updateTimerDisplay, 1000);
  }

  // Show the current question
  function showCurrentQuestion() {
    currentQuestion = selectedQuestions[currentQuestionIndex];
    timeLimit = currentQuestion.timeLimit;

    // Update UI with question
    questionDisplay.innerHTML = `
      <div class="mb-4">
        <h3 class="text-xl font-bold text-sky-800 mb-2">${
          currentQuestion.title
        }</h3>
        <div class="whitespace-pre-line text-stone-700">${
          currentQuestion.description
        }</div>
      </div>
      <div class="mt-4">
        <h4 class="font-medium text-sky-700 mb-2">Test Cases:</h4>
        <ul class="list-disc pl-5 space-y-1">
          ${currentQuestion.testCases
            .map(
              (tc) =>
                `<li><span class="font-mono text-sm">${tc.input} → ${tc.expectedOutput}</span></li>`
            )
            .join("")}
        </ul>
      </div>
      <div class="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
        <p class="text-amber-800 text-sm">
          <strong>Time allocated:</strong> ${currentQuestion.timeLimit} minutes
        </p>
      </div>
    `;

    // Update button text based on question index
    if (currentQuestionIndex === selectedQuestions.length - 1) {
      nextQuestionBtn.textContent = "Finish Interview";
    } else {
      nextQuestionBtn.textContent = "Next Question";
    }
  }

  // Show the next question
  function showNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < selectedQuestions.length) {
      // Update question counter
      questionCounter.textContent = `Question ${
        currentQuestionIndex + 1
      }/${totalQuestions}`;

      // Show next question
      showCurrentQuestion();
    } else {
      // End practice if all questions are done
      endPractice();
    }
  }

  // End practice session
  function endPractice() {
    if (!practiceActive) return;

    // Stop timer
    clearInterval(timerInterval);

    // Unlock UI
    document.body.classList.remove("practice-mode-active");
    practiceActive = false;

    // Show results
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;

    practiceResultsArea.innerHTML = `
      <div class="bg-stone-50 p-4 rounded-lg border border-stone-200 mt-4">
        <h3 class="text-lg font-medium text-sky-800 mb-2">Interview Session Results</h3>
        <p class="mb-2">Difficulty: ${
          selectedDifficulty.charAt(0).toUpperCase() +
          selectedDifficulty.slice(1)
        }</p>
        <p class="mb-2">Questions Completed: ${currentQuestionIndex}/${totalQuestions}</p>
        <p class="mb-4">Total Time: ${minutes}m ${seconds}s (Allocated: ${totalSessionTimeLimit}m)</p>
        
        <div class="mt-4">
          <h4 class="font-medium text-sky-700 mb-2">Questions Covered:</h4>
          <ul class="list-disc pl-5 space-y-1">
            ${selectedQuestions
              .slice(0, currentQuestionIndex + 1)
              .map(
                (q, i) =>
                  `<li class="text-stone-700">${q.title} (${q.timeLimit} min)</li>`
              )
              .join("")}
          </ul>
        </div>
        
        <div class="border-t border-stone-200 pt-3 mt-3">
          <p class="text-stone-600 text-sm">
            In a real interview, you would have explained your approach verbally and possibly written pseudocode or actual code on a whiteboard or in a code editor.
          </p>
        </div>
      </div>
    `;

    // Reset UI elements
    startPracticeBtn.classList.remove("hidden");
    endPracticeBtn.classList.add("hidden");
    nextQuestionBtn.classList.add("hidden");
    difficultySelector.disabled = false;
    questionCounter.textContent = `Question 0/${totalQuestions}`;
  }

  // Update timer display
  function updateTimerDisplay() {
    if (!startTime) return;

    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    const timeString = `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;

    practiceTimerDisplay.textContent = timeString;

    // Check if current question time limit is reached
    const previousQuestionsTime = selectedQuestions
      .slice(0, currentQuestionIndex)
      .reduce((total, q) => total + q.timeLimit, 0);
    const currentQuestionElapsedMinutes = minutes - previousQuestionsTime;

    if (currentQuestionElapsedMinutes >= currentQuestion.timeLimit) {
      practiceTimerDisplay.classList.add("text-red-600", "font-bold");
    } else {
      practiceTimerDisplay.classList.remove("text-red-600", "font-bold");
    }
  }

  // Select random questions from the pool
  function selectRandomQuestions(questions, count) {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  // Reset the practitioner UI
  function resetPractitionerUI() {
    if (practiceActive) {
      endPractice();
    }

    questionDisplay.innerHTML = `<p class="text-stone-600">Select a difficulty level and click "Start Practice" to begin a coding interview session. You'll be presented with a series of algorithm problems to solve mentally, just like in a real interview.</p>`;
    practiceResultsArea.innerHTML = "";
    practiceTimerDisplay.textContent = "00:00";
    practiceTimerDisplay.classList.remove("text-red-600", "font-bold");
    questionCounter.textContent = `Question 0/${totalQuestions}`;
  }

  // Initialize the module only once
  // Check if the module has already been initialized
  if (!window.practitionerModeInitialized) {
    window.practitionerModeInitialized = true;
    initPractitionerMode();
  }
});
