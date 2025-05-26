/**
 * Behavioral Question Data
 * Contains common behavioral interview questions categorized by themes
 */

const behavioralQuestionData = {
  // Leadership questions
  leadership: [
    {
      id: "l1",
      question:
        "Tell me about a time when you had to lead a team through a difficult project.",
      tips: [
        "Use the STAR method (Situation, Task, Action, Result)",
        "Focus on how you motivated the team",
        "Highlight your decision-making process",
        "Discuss how you handled challenges",
      ],
      category: "leadership",
      difficulty: "medium",
    },
    {
      id: "l2",
      question:
        "Describe a situation where you had to make an unpopular decision.",
      tips: [
        "Explain your reasoning process",
        "Discuss how you communicated the decision",
        "Mention how you handled pushback",
        "Share the outcome and what you learned",
      ],
      category: "leadership",
      difficulty: "hard",
    },
    {
      id: "l3",
      question: "Give an example of how you set goals and achieve them.",
      tips: [
        "Choose a specific, measurable goal",
        "Explain your planning process",
        "Discuss obstacles you overcame",
        "Quantify your results if possible",
      ],
      category: "leadership",
      difficulty: "medium",
    },
    {
      id: "l4",
      question: "Tell me about a time when you delegated tasks effectively.",
      tips: [
        "Explain how you assessed team members' strengths",
        "Describe your delegation process",
        "Discuss how you provided support",
        "Share the outcome of the delegation",
      ],
      category: "leadership",
      difficulty: "medium",
    },
  ],

  // Teamwork questions
  teamwork: [
    {
      id: "t1",
      question:
        "Describe a situation where you had to work with a difficult team member.",
      tips: [
        "Focus on the actions you took, not the person's flaws",
        "Explain your approach to resolving conflicts",
        "Highlight communication strategies you used",
        "Share what you learned from the experience",
      ],
      category: "teamwork",
      difficulty: "medium",
    },
    {
      id: "t2",
      question:
        "Tell me about a time when you had to collaborate with a team to solve a complex problem.",
      tips: [
        "Describe your role in the team",
        "Explain how you contributed to the solution",
        "Highlight how you leveraged others' strengths",
        "Share the outcome and impact",
      ],
      category: "teamwork",
      difficulty: "medium",
    },
    {
      id: "t3",
      question:
        "Give an example of when you had to adapt to accommodate others' work styles.",
      tips: [
        "Describe the differences in work styles",
        "Explain your adaptation process",
        "Highlight your flexibility and empathy",
        "Share what you learned about collaboration",
      ],
      category: "teamwork",
      difficulty: "easy",
    },
    {
      id: "t4",
      question:
        "Describe a time when you had to build consensus among team members with different opinions.",
      tips: [
        "Explain the nature of the disagreement",
        "Describe how you facilitated discussion",
        "Highlight your mediation techniques",
        "Share how you reached a resolution",
      ],
      category: "teamwork",
      difficulty: "hard",
    },
  ],

  // Problem-solving questions
  problemSolving: [
    {
      id: "p1",
      question:
        "Tell me about a time when you faced an unexpected challenge and how you resolved it.",
      tips: [
        "Clearly define the unexpected challenge",
        "Explain your thought process",
        "Describe the actions you took",
        "Share the outcome and lessons learned",
      ],
      category: "problemSolving",
      difficulty: "medium",
    },
    {
      id: "p2",
      question:
        "Describe a situation where you had to analyze data to solve a problem.",
      tips: [
        "Explain the problem and why data analysis was needed",
        "Describe your analytical approach",
        "Highlight tools or methods you used",
        "Share your findings and their impact",
      ],
      category: "problemSolving",
      difficulty: "medium",
    },
    {
      id: "p3",
      question:
        "Give an example of a time when you had to think outside the box to solve a problem.",
      tips: [
        "Describe why conventional approaches wouldn't work",
        "Explain your creative thinking process",
        "Highlight the innovative solution",
        "Share the outcome and reception",
      ],
      category: "problemSolving",
      difficulty: "hard",
    },
    {
      id: "p4",
      question:
        "Tell me about a time when you had to make a decision with incomplete information.",
      tips: [
        "Explain the situation and constraints",
        "Describe how you gathered what information you could",
        "Explain your decision-making process",
        "Share the outcome and what you learned",
      ],
      category: "problemSolving",
      difficulty: "hard",
    },
  ],

  // Failure and resilience questions
  failure: [
    {
      id: "f1",
      question:
        "Describe a time when you failed at something. How did you handle it?",
      tips: [
        "Choose a genuine failure with a learning outcome",
        "Take responsibility without making excuses",
        "Explain what you learned from the experience",
        "Describe how you applied those lessons later",
      ],
      category: "failure",
      difficulty: "medium",
    },
    {
      id: "f2",
      question:
        "Tell me about a time when you received critical feedback. How did you respond?",
      tips: [
        "Describe the feedback situation",
        "Explain your initial reaction and thought process",
        "Highlight how you implemented the feedback",
        "Share the growth that resulted",
      ],
      category: "failure",
      difficulty: "medium",
    },
    {
      id: "f3",
      question:
        "Give an example of a time when you had to overcome a significant setback.",
      tips: [
        "Describe the setback clearly",
        "Explain your resilience strategies",
        "Highlight the actions you took to recover",
        "Share the outcome and lessons learned",
      ],
      category: "failure",
      difficulty: "hard",
    },
    {
      id: "f4",
      question:
        "Describe a situation where a project didn't go as planned. How did you adapt?",
      tips: [
        "Explain what went wrong and why",
        "Describe your adaptation process",
        "Highlight your flexibility and problem-solving",
        "Share the adjusted outcome",
      ],
      category: "failure",
      difficulty: "medium",
    },
  ],

  // Achievement questions
  achievement: [
    {
      id: "a1",
      question: "What is your greatest professional achievement and why?",
      tips: [
        "Choose an achievement relevant to the role",
        "Explain why it was significant",
        "Describe the challenges you overcame",
        "Quantify the impact if possible",
      ],
      category: "achievement",
      difficulty: "medium",
    },
    {
      id: "a2",
      question:
        "Tell me about a time when you exceeded expectations on a project.",
      tips: [
        "Clearly define what the expectations were",
        "Explain how and why you went beyond them",
        "Describe the additional value you created",
        "Share the recognition or impact that resulted",
      ],
      category: "achievement",
      difficulty: "easy",
    },
    {
      id: "a3",
      question:
        "Describe a situation where you identified an opportunity for improvement and took action.",
      tips: [
        "Explain how you identified the opportunity",
        "Describe your initiative and approach",
        "Highlight any obstacles you overcame",
        "Share the results and impact",
      ],
      category: "achievement",
      difficulty: "medium",
    },
    {
      id: "a4",
      question:
        "Give an example of a goal you set for yourself and how you achieved it.",
      tips: [
        "Choose a relevant and challenging goal",
        "Explain your motivation and planning",
        "Describe the execution and challenges",
        "Share the outcome and what you learned",
      ],
      category: "achievement",
      difficulty: "easy",
    },
  ],

  // Communication questions
  communication: [
    {
      id: "c1",
      question:
        "Describe a situation where you had to explain a complex technical concept to a non-technical audience.",
      tips: [
        "Explain the context and why this communication was needed",
        "Describe your approach to simplifying the concept",
        "Highlight the techniques you used (analogies, visuals, etc.)",
        "Share how you confirmed understanding",
      ],
      category: "communication",
      difficulty: "medium",
    },
    {
      id: "c2",
      question:
        "Tell me about a time when you had to persuade someone to see things your way.",
      tips: [
        "Describe the situation and differing perspectives",
        "Explain your persuasion approach",
        "Highlight how you addressed concerns",
        "Share the outcome and relationship impact",
      ],
      category: "communication",
      difficulty: "medium",
    },
    {
      id: "c3",
      question: "Give an example of how you handled a communication breakdown.",
      tips: [
        "Describe the breakdown and its impact",
        "Explain how you identified the issue",
        "Highlight your resolution approach",
        "Share the outcome and preventive measures",
      ],
      category: "communication",
      difficulty: "hard",
    },
    {
      id: "c4",
      question:
        "Describe a time when you had to deliver difficult news to someone.",
      tips: [
        "Explain the context and why the news was difficult",
        "Describe your preparation and approach",
        "Highlight your empathy and clarity",
        "Share how you managed the aftermath",
      ],
      category: "communication",
      difficulty: "hard",
    },
  ],
};

// Function to get all questions
function getAllBehavioralQuestions() {
  return Object.values(behavioralQuestionData).flat();
}

// Function to get questions by category
function getQuestionsByCategory(category) {
  return behavioralQuestionData[category] || [];
}

// Function to get questions by difficulty
function getQuestionsByDifficulty(difficulty) {
  return getAllBehavioralQuestions().filter((q) => q.difficulty === difficulty);
}

// Function to search questions by keyword
function searchQuestions(keyword) {
  const lowerKeyword = keyword.toLowerCase();
  return getAllBehavioralQuestions().filter(
    (q) =>
      q.question.toLowerCase().includes(lowerKeyword) ||
      q.category.toLowerCase().includes(lowerKeyword)
  );
}

// Function to get a random question
function getRandomQuestion() {
  const allQuestions = getAllBehavioralQuestions();
  const randomIndex = Math.floor(Math.random() * allQuestions.length);
  return allQuestions[randomIndex];
}

// Load custom questions from localStorage
function loadCustomQuestions() {
  const customQuestionsJSON = localStorage.getItem("customBehavioralQuestions");
  if (customQuestionsJSON) {
    const customQuestions = JSON.parse(customQuestionsJSON);

    // Add custom questions to appropriate categories
    customQuestions.forEach((question) => {
      if (behavioralQuestionData[question.category]) {
        behavioralQuestionData[question.category].push(question);
      } else {
        // If category doesn't exist, create it
        behavioralQuestionData[question.category] = [question];
      }
    });
  }
}

// Save a custom question to localStorage
function saveCustomQuestion(question) {
  let customQuestions = [];
  const customQuestionsJSON = localStorage.getItem("customBehavioralQuestions");

  if (customQuestionsJSON) {
    customQuestions = JSON.parse(customQuestionsJSON);
  }

  // Generate a unique ID for the question
  question.id = `custom_${Date.now()}`;

  customQuestions.push(question);
  localStorage.setItem(
    "customBehavioralQuestions",
    JSON.stringify(customQuestions)
  );

  // Also add to the current behavioralQuestionData object
  if (behavioralQuestionData[question.category]) {
    behavioralQuestionData[question.category].push(question);
  } else {
    behavioralQuestionData[question.category] = [question];
  }
}

// Initialize by loading custom questions
loadCustomQuestions();
