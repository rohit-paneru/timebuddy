/**
 * Data Module - Contains all the data structures and sample data for the application
 */

// Sample schedule data
const scheduleData = {
  // Daily schedule data
  dailySchedule: {
    mon: [
      {
        time: "07:00 - 08:00",
        activity: "Freshen up + Breakfast",
        notes: "Light stretching and a healthy breakfast",
        completed: false,
      },
      {
        time: "08:00 - 10:00",
        activity: "DSA Practice",
        notes: "LeetCode medium/hard problems",
        completed: false,
      },
      {
        time: "10:00 - 12:00",
        activity: "Operating Systems",
        notes: "Scheduling, Deadlocks, Paging",
        completed: false,
      },
      {
        time: "12:00 - 13:00",
        activity: "Lunch + Break",
        notes: "Rest and refuel",
        completed: false,
      },
      {
        time: "13:00 - 15:00",
        activity: "Aptitude + Reasoning",
        notes: "Time-speed-distance, syllogism",
        completed: false,
      },
      {
        time: "15:00 - 17:00",
        activity: "Project Work",
        notes: "Code new feature or fix bugs",
        completed: false,
      },
      {
        time: "17:00 - 18:00",
        activity: "Break / Walk",
        notes: "Relax your mind",
        completed: false,
      },
      {
        time: "18:00 - 20:00",
        activity: "Mock Interview (DSA)",
        notes: "Peer or online platform",
        completed: false,
      },
      {
        time: "20:00 - 21:00",
        activity: "Dinner + Rest",
        notes: "Unwind",
        completed: false,
      },
      {
        time: "21:00 - 23:00",
        activity: "DSA Revision",
        notes: "Revise solved problems, notes",
        completed: false,
      },
      {
        time: "23:00 - 02:00",
        activity: "OS Concepts via YouTube",
        notes: "Gaurav Sen/Neso Academy",
        completed: false,
      },
    ],
    tue: [
      {
        time: "07:00 - 08:00",
        activity: "Freshen up + Breakfast",
        notes: "Hydrate and stretch",
        completed: false,
      },
      {
        time: "08:00 - 10:00",
        activity: "DSA Practice",
        notes: "Trees, Graphs",
        completed: false,
      },
      {
        time: "10:00 - 12:00",
        activity: "DBMS",
        notes: "Normalization, Indexing",
        completed: false,
      },
      {
        time: "12:00 - 13:00",
        activity: "Lunch + Break",
        notes: "Short nap optional",
        completed: false,
      },
      {
        time: "13:00 - 15:00",
        activity: "Aptitude",
        notes: "Number system, profit-loss",
        completed: false,
      },
      {
        time: "15:00 - 17:00",
        activity: "Resume Improvement",
        notes: "Update or optimize project description",
        completed: false,
      },
      {
        time: "17:00 - 18:00",
        activity: "Break / Walk",
        notes: "Mind refresh",
        completed: false,
      },
      {
        time: "18:00 - 20:00",
        activity: "Mock Interview (Core)",
        notes: "OS/DBMS/OOPs round",
        completed: false,
      },
      {
        time: "20:00 - 21:00",
        activity: "Dinner",
        notes: "Relax",
        completed: false,
      },
      {
        time: "21:00 - 23:00",
        activity: "DSA (Timed Practice)",
        notes: "Simulate real interview",
        completed: false,
      },
      {
        time: "23:00 - 02:00",
        activity: "DBMS YouTube + Notes",
        notes: "Joey's DBMS playlist",
        completed: false,
      },
    ],
    wed: [
      {
        time: "07:00 - 08:00",
        activity: "Freshen up",
        notes: "Prepare for deep focus",
        completed: false,
      },
      {
        time: "08:00 - 10:00",
        activity: "DSA Practice",
        notes: "Dynamic Programming",
        completed: false,
      },
      {
        time: "10:00 - 12:00",
        activity: "Computer Networks",
        notes: "OSI Model, TCP/IP",
        completed: false,
      },
      {
        time: "12:00 - 13:00",
        activity: "Lunch",
        notes: "Keep it light",
        completed: false,
      },
      {
        time: "13:00 - 15:00",
        activity: "Logical Reasoning",
        notes: "Critical thinking problems",
        completed: false,
      },
      {
        time: "15:00 - 17:00",
        activity: "Project Deployment",
        notes: "Host on GitHub/Render/Vercel",
        completed: false,
      },
      {
        time: "17:00 - 18:00",
        activity: "Break",
        notes: "Listen to music or walk",
        completed: false,
      },
      {
        time: "18:00 - 20:00",
        activity: "Mock Interview (Behavioral)",
        notes: "Tell me about yourself, STAR questions",
        completed: false,
      },
      {
        time: "20:00 - 21:00",
        activity: "Dinner",
        notes: "Watch light content",
        completed: false,
      },
      {
        time: "21:00 - 23:00",
        activity: "DSA Contest",
        notes: "Codeforces or Leetcode Weekly",
        completed: false,
      },
      {
        time: "23:00 - 02:00",
        activity: "Networking Notes",
        notes: "Packet flow, ARP, DNS",
        completed: false,
      },
    ],
    thu: [
      {
        time: "07:00 - 08:00",
        activity: "Morning Routine",
        notes: "Meditation 5 mins",
        completed: false,
      },
      {
        time: "08:00 - 10:00",
        activity: "DSA (Backtracking/Graphs)",
        notes: "Hard-level practice",
        completed: false,
      },
      {
        time: "10:00 - 12:00",
        activity: "OOPs",
        notes: "4 pillars, design patterns",
        completed: false,
      },
      {
        time: "12:00 - 13:00",
        activity: "Lunch",
        notes: "Home food preferred",
        completed: false,
      },
      {
        time: "13:00 - 15:00",
        activity: "Puzzle Solving",
        notes: "Asked in product companies",
        completed: false,
      },
      {
        time: "15:00 - 17:00",
        activity: "System Design Basics",
        notes: "LLD: class design, APIs",
        completed: false,
      },
      {
        time: "17:00 - 18:00",
        activity: "Break",
        notes: "Coffee or walk",
        completed: false,
      },
      {
        time: "18:00 - 20:00",
        activity: "Mock Interview (OOPs)",
        notes: "Use online platforms",
        completed: false,
      },
      {
        time: "20:00 - 21:00",
        activity: "Dinner",
        notes: "Stretch afterwards",
        completed: false,
      },
      {
        time: "21:00 - 23:00",
        activity: "DSA Revision",
        notes: "Look over failed problems",
        completed: false,
      },
      {
        time: "23:00 - 02:00",
        activity: "OOPs Video + Notes",
        notes: "UML, interfaces",
        completed: false,
      },
    ],
    fri: [
      {
        time: "07:00 - 08:00",
        activity: "Routine",
        notes: "Positive affirmations",
        completed: false,
      },
      {
        time: "08:00 - 10:00",
        activity: "DSA Practice",
        notes: "Heap, Trie",
        completed: false,
      },
      {
        time: "10:00 - 12:00",
        activity: "Operating Systems",
        notes: "File systems, I/O",
        completed: false,
      },
      {
        time: "12:00 - 13:00",
        activity: "Lunch",
        notes: "Avoid heavy meals",
        completed: false,
      },
      {
        time: "13:00 - 15:00",
        activity: "Aptitude + Group Discussion",
        notes: "Practice with peers",
        completed: false,
      },
      {
        time: "15:00 - 17:00",
        activity: "Project Documentation",
        notes: "README, screenshots",
        completed: false,
      },
      {
        time: "17:00 - 18:00",
        activity: "Break",
        notes: "Quick rest",
        completed: false,
      },
      {
        time: "18:00 - 20:00",
        activity: "Mock Interview (Resume-based)",
        notes: "Technical + behavioral",
        completed: false,
      },
      {
        time: "20:00 - 21:00",
        activity: "Dinner",
        notes: "Eat early",
        completed: false,
      },
      {
        time: "21:00 - 23:00",
        activity: "DSA (Topic Review)",
        notes: "Data structures summary",
        completed: false,
      },
      {
        time: "23:00 - 02:00",
        activity: "OS + CN Combined Notes",
        notes: "Make cheat sheets",
        completed: false,
      },
    ],
    sat: [
      {
        time: "07:00 - 08:00",
        activity: "Late wake-up OK",
        notes: "Weekly break",
        completed: false,
      },
      {
        time: "08:00 - 10:00",
        activity: "DSA Full Mock",
        notes: "2-hour interview prep set",
        completed: false,
      },
      {
        time: "10:00 - 12:00",
        activity: "CN Revision",
        notes: "Routing, switching",
        completed: false,
      },
      {
        time: "12:00 - 13:00",
        activity: "Lunch",
        notes: "Break time",
        completed: false,
      },
      {
        time: "13:00 - 15:00",
        activity: "GFG Article Reading",
        notes: "OS/CN concepts",
        completed: false,
      },
      {
        time: "15:00 - 17:00",
        activity: "Update GitHub + Resume",
        notes: "Push code, refine sections",
        completed: false,
      },
      {
        time: "17:00 - 18:00",
        activity: "Break",
        notes: "TV/nap",
        completed: false,
      },
      {
        time: "18:00 - 20:00",
        activity: "Mock HR Interview",
        notes: "Peer session or record yourself",
        completed: false,
      },
      {
        time: "20:00 - 21:00",
        activity: "Dinner",
        notes: "Relax",
        completed: false,
      },
      {
        time: "21:00 - 23:00",
        activity: "DSA Contest / Game Theory",
        notes: "Optional",
        completed: false,
      },
      {
        time: "23:00 - 02:00",
        activity: "CN YouTube Playlist",
        notes: "Finish remaining modules",
        completed: false,
      },
    ],
  },

  // Weekly plan data
  weeklyPlan: [
    {
      day: "Monday",
      dsa: "Arrays & Strings + Searching/Sorting Algorithms",
      aptitude: "Mock Interview Practice + Behavioral Prep",
      core: "Operating Systems + Backend Project Work",
    },
    {
      day: "Tuesday",
      dsa: "Linked Lists & Stacks + Recursion/Backtracking",
      aptitude: "System Design Basics + Aptitude Practice",
      core: "Database Systems + Frontend Project Work",
    },
    {
      day: "Wednesday",
      dsa: "Trees & Heaps + Greedy Algorithms",
      aptitude: "Mock Coding Interviews + Communication Skills",
      core: "Computer Networks + API Development",
    },
    {
      day: "Thursday",
      dsa: "Graphs + Graph Algorithms (BFS/DFS/Shortest Paths)",
      aptitude: "Problem Solving Strategies + Advanced Data Structures",
      core: "System Design (Scalable Systems) + Database Integration",
    },
    {
      day: "Friday",
      dsa: "Hash Tables & Sets + Dynamic Programming",
      aptitude: "Behavioral Interview Practice + Resume Updates",
      core: "System Design Case Studies + Testing & Deployment",
    },
    {
      day: "Saturday",
      dsa: "Mock Coding Interview + Weekly Coding Contest",
      aptitude: "System Design Interview + Mock Behavioral Interview",
      core: "Project Integration + Job Applications & Networking",
    },
    {
      day: "Sunday",
      dsa: "Weekly Review & Weak Areas Practice",
      aptitude: "Company Research & Interview Preparation",
      core: "System Design Practice & Architecture Review",
    },
  ],

  // Monthly goals data
  monthlyGoals: {
    month1: {
      title: "Month 1: Building Foundations",
      dsaFundamentals:
        "Master core data structures (Arrays, Strings, Linked Lists, Stacks, Queues) and implement them from scratch",
      algorithmBasics:
        "Learn and implement sorting algorithms, binary search, and basic graph/tree traversals (BFS, DFS)",
      problemSolving:
        "Solve 100+ easy/medium problems on LeetCode/HackerRank focusing on pattern recognition",
      systemDesignBasics:
        "Learn client-server architecture, API design, and database schema design fundamentals",
      coreCS:
        "Study OS fundamentals (processes, threads, memory management, scheduling) and database basics (SQL, normalization)",
      interviewPrep:
        "Create optimized resume, set up GitHub portfolio, and practice 5 mock interviews",
      projectWork:
        "Build one end-to-end project demonstrating full-stack skills or specialized domain knowledge",
    },
    month2: {
      title: "Month 2: Advanced Concepts & Practice",
      dsaAdvanced:
        "Master advanced data structures (Heaps, Hash Tables, Trees, Tries) and implement complex operations",
      algorithmMastery:
        "Learn and implement advanced algorithms (Dynamic Programming, Greedy, Divide & Conquer)",
      problemSolving:
        "Solve 150+ medium/hard problems focusing on company-specific questions and optimization techniques",
      systemDesignIntermediate:
        "Study scalability concepts, load balancing, caching strategies, and database sharding",
      coreCSAdvanced:
        "Deep dive into networks (TCP/IP, HTTP/HTTPS), concurrency models, and advanced SQL concepts",
      interviewPrep:
        "Practice 10 mock technical interviews with detailed feedback and behavioral question preparation",
      projectWork:
        "Enhance existing project with advanced features or build a new project showcasing system design skills",
    },
    month3: {
      title: "Month 3: Interview Mastery & Placement",
      dsaMastery:
        "Focus on hard problems, competitive programming techniques, and optimization strategies",
      companySpecific:
        "Target top companies and solve their most frequently asked interview questions",
      systemDesignExpert:
        "Practice designing large-scale distributed systems (Netflix, Uber, Twitter architecture)",
      mockInterviews:
        "Conduct 15+ mock interviews simulating real company interview processes",
      behavioralPrep:
        "Prepare STAR method responses for common behavioral questions with concrete examples",
      negotiationSkills:
        "Learn salary negotiation techniques and research compensation packages",
      applicationStrategy:
        "Apply to 30+ targeted companies with customized applications and follow-up strategies",
    },
  },

  // Pro tips data
  proTips: [
    {
      category: "Study Efficiency",
      tips: [
        "Use the Pomodoro Technique: 25 minutes of focused study followed by a 5-minute break",
        "Create a distraction-free environment by silencing notifications and using website blockers",
        "Implement spaced repetition for better retention of concepts",
        "Teach concepts to others (or explain aloud) to solidify understanding",
        "Take handwritten notes for better retention and understanding",
      ],
    },
    {
      category: "DSA Practice",
      tips: [
        "Solve problems on paper before coding to improve logical thinking",
        "After solving a problem, always look for more optimal solutions",
        "Study multiple solutions to the same problem to understand different approaches",
        "Categorize problems by patterns to recognize similarities in new problems",
        "Implement data structures from scratch to understand their inner workings",
      ],
    },
    {
      category: "Interview Preparation",
      tips: [
        "Practice thinking aloud while solving problems to showcase your thought process",
        "Prepare a 2-minute self-introduction that highlights your strengths and projects",
        "Research companies before interviews to tailor your responses",
        "Prepare questions to ask interviewers that demonstrate your interest",
        "Practice mock interviews with friends or online platforms for realistic experience",
      ],
    },
    {
      category: "Wellness",
      tips: [
        "Prioritize 7-8 hours of sleep for optimal cognitive function",
        "Incorporate physical activity daily, even if it's just a 20-minute walk",
        "Practice mindfulness or meditation to manage stress and improve focus",
        "Maintain a balanced diet with brain-boosting foods",
        "Take regular breaks and full days off to prevent burnout",
      ],
    },
  ],

  // Resources data
  resources: [
    {
      category: "DSA Learning",
      items: [
        {
          name: "LeetCode",
          description: "Platform with 2000+ coding problems and contests",
          link: "https://leetcode.com/",
        },
        {
          name: "GeeksforGeeks",
          description: "Comprehensive DSA tutorials and practice problems",
          link: "https://www.geeksforgeeks.org/",
        },
        {
          name: "Cracking the Coding Interview",
          description: "Essential book for coding interview preparation",
          link: "https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850",
        },
        {
          name: "AlgoExpert",
          description:
            "Curated list of 160+ interview questions with video explanations",
          link: "https://www.algoexpert.io/",
        },
        {
          name: "Visualgo",
          description:
            "Visualizing data structures and algorithms through animation",
          link: "https://visualgo.net/",
        },
      ],
    },
    {
      category: "Core CS",
      items: [
        {
          name: "Operating System Concepts",
          description: "Comprehensive book on operating systems",
          link: "https://www.amazon.com/Operating-System-Concepts-Abraham-Silberschatz/dp/1118063333",
        },
        {
          name: "Database System Concepts",
          description: "Fundamental database concepts and systems",
          link: "https://www.amazon.com/Database-System-Concepts-Abraham-Silberschatz/dp/0073523321",
        },
        {
          name: "Computer Networking: A Top-Down Approach",
          description: "Popular textbook for understanding networking",
          link: "https://www.amazon.com/Computer-Networking-Top-Down-Approach-7th/dp/0133594149",
        },
        {
          name: "System Design Primer",
          description: "GitHub repository with system design resources",
          link: "https://github.com/donnemartin/system-design-primer",
        },
        {
          name: "MIT OpenCourseWare",
          description: "Free computer science courses from MIT",
          link: "https://ocw.mit.edu/search/?d=Electrical%20Engineering%20and%20Computer%20Science",
        },
      ],
    },
    {
      category: "Aptitude",
      items: [
        {
          name: "IndiaBix",
          description: "Comprehensive aptitude questions and solutions",
          link: "https://www.indiabix.com/",
        },
        {
          name: "Aptitude Questions and Answers",
          description: "Practice questions for quantitative aptitude",
          link: "https://www.tutorialspoint.com/aptitude/index.htm",
        },
        {
          name: "Logical Reasoning Questions",
          description: "Practice for logical and analytical reasoning",
          link: "https://www.hitbullseye.com/Logical-Reasoning.php",
        },
        {
          name: "Verbal Ability Tests",
          description:
            "English grammar, vocabulary, and comprehension practice",
          link: "https://www.practiceaptitudetests.com/verbal-reasoning-tests/",
        },
        {
          name: "Mock Aptitude Tests",
          description: "Full-length aptitude tests with timer",
          link: "https://www.youth4work.com/Talent/Aptitude-Tests",
        },
      ],
    },
    {
      category: "Interview Preparation",
      items: [
        {
          name: "Pramp",
          description:
            "Free platform for practicing technical interviews with peers",
          link: "https://www.pramp.com/",
        },
        {
          name: "InterviewBit",
          description:
            "Coding interview preparation with company-specific questions",
          link: "https://www.interviewbit.com/",
        },
        {
          name: "Glassdoor",
          description: "Company reviews and interview experiences",
          link: "https://www.glassdoor.com/",
        },
        {
          name: "Grokking the System Design Interview",
          description: "Course on system design interview preparation",
          link: "https://www.educative.io/courses/grokking-the-system-design-interview",
        },
        {
          name: "Tech Interview Handbook",
          description: "Curated interview preparation materials",
          link: "https://github.com/yangshun/tech-interview-handbook",
        },
      ],
    },
    {
      category: "Project Development",
      items: [
        {
          name: "GitHub Student Developer Pack",
          description:
            "Free access to developer tools and services for students",
          link: "https://education.github.com/pack",
        },
        {
          name: "Frontend Mentor",
          description: "Real-world frontend projects to improve coding skills",
          link: "https://www.frontendmentor.io/",
        },
        {
          name: "The Odin Project",
          description: "Free full-stack curriculum with project-based learning",
          link: "https://www.theodinproject.com/",
        },
        {
          name: "Kaggle",
          description: "Data science projects and competitions",
          link: "https://www.kaggle.com/",
        },
        {
          name: "DevProjects",
          description: "Free real-world projects to build your portfolio",
          link: "https://www.codementor.io/projects",
        },
      ],
    },
    {
      category: "Career Development",
      items: [
        {
          name: "LinkedIn Learning",
          description: "Professional courses on technical and soft skills",
          link: "https://www.linkedin.com/learning/",
        },
        {
          name: "Coursera",
          description: "Online courses from top universities and companies",
          link: "https://www.coursera.org/",
        },
        {
          name: "Udemy",
          description: "Affordable courses on programming and tech skills",
          link: "https://www.udemy.com/",
        },
        {
          name: "HackerRank",
          description: "Coding challenges and skill certification",
          link: "https://www.hackerrank.com/",
        },
        {
          name: "Resume.io",
          description: "Professional resume builder with templates",
          link: "https://resume.io/",
        },
      ],
    },
  ],
};

// Export the data
if (typeof module !== "undefined") {
  module.exports = { scheduleData };
}
