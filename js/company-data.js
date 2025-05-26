/**
 * Company Preparation Data
 * Contains information about different companies and their interview processes
 */

const companyData = {
  // Tech Giants
  Google: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/120px-Google_%22G%22_Logo.svg.png",
    description:
      "Google's interview process is known for its focus on algorithms, data structures, and system design.",
    interviewProcess: [
      "Online Assessment (OA): Coding problems on data structures and algorithms",
      "Phone Screen: Technical interview with a Google engineer",
      "Onsite (4-5 rounds): Coding, system design, behavioral, and team fit",
    ],
    prepTips: [
      "Focus on time and space complexity analysis",
      "Practice medium to hard LeetCode problems",
      "Study distributed systems for system design rounds",
      "Be familiar with Google's leadership principles",
    ],
    dsaFocus: ["Arrays", "Strings", "Trees", "Graphs", "Dynamic Programming"],
    systemDesign: "High emphasis on scalable distributed systems",
    resources: [
      {
        name: "LeetCode Google Tagged Questions",
        url: "https://leetcode.com/company/google/",
      },
      {
        name: "System Design Primer",
        url: "https://github.com/donnemartin/system-design-primer",
      },
      {
        name: "Cracking the Coding Interview",
        url: "https://www.crackingthecodinginterview.com/",
      },
    ],
  },
  Microsoft: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/120px-Microsoft_logo.svg.png",
    description:
      "Microsoft's interviews focus on problem-solving skills, coding ability, and system design knowledge.",
    interviewProcess: [
      "Online Assessment: Coding problems and aptitude tests",
      "Phone Screen: Technical discussion with a Microsoft engineer",
      "Virtual/Onsite (4 rounds): Coding, system design, behavioral",
    ],
    prepTips: [
      "Practice object-oriented design problems",
      "Focus on trees, graphs, and dynamic programming",
      "Prepare for behavioral questions using the STAR method",
      "Study Microsoft's products and technologies",
    ],
    dsaFocus: [
      "Trees",
      "Graphs",
      "Dynamic Programming",
      "Object-Oriented Design",
    ],
    systemDesign: "Focus on scalable services and API design",
    resources: [
      {
        name: "LeetCode Microsoft Tagged Questions",
        url: "https://leetcode.com/company/microsoft/",
      },
      { name: "Microsoft Learn", url: "https://learn.microsoft.com/" },
      {
        name: "Designing Data-Intensive Applications",
        url: "https://dataintensive.net/",
      },
    ],
  },
  Amazon: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/120px-Amazon_logo.svg.png",
    description:
      "Amazon's interviews emphasize leadership principles, coding skills, and system design.",
    interviewProcess: [
      "Online Assessment: Coding problems and work simulation",
      "Phone Screens (1-2 rounds): Technical and behavioral questions",
      "Virtual/Onsite (4-5 rounds): Coding, system design, behavioral based on leadership principles",
    ],
    prepTips: [
      "Study Amazon's 16 Leadership Principles thoroughly",
      "Practice behavioral questions using the STAR method",
      "Focus on scalable system design and microservices",
      "Practice medium LeetCode problems on arrays, trees, and graphs",
    ],
    dsaFocus: [
      "Arrays",
      "Linked Lists",
      "Trees",
      "Graphs",
      "Dynamic Programming",
    ],
    systemDesign:
      "Focus on scalable e-commerce systems and distributed services",
    resources: [
      {
        name: "Amazon Leadership Principles",
        url: "https://www.amazon.jobs/en/principles",
      },
      {
        name: "LeetCode Amazon Tagged Questions",
        url: "https://leetcode.com/company/amazon/",
      },
      {
        name: "System Design Interview by Alex Xu",
        url: "https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF",
      },
    ],
  },

  // Financial Tech
  "Goldman Sachs": {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/120px-Goldman_Sachs.svg.png",
    description:
      "Goldman Sachs interviews focus on technical skills, financial knowledge, and problem-solving ability.",
    interviewProcess: [
      "HireVue Video Interview: Recorded responses to behavioral questions",
      "Phone Interviews (1-2 rounds): Technical and behavioral questions",
      "Superday (4-5 rounds): Technical, behavioral, and case study interviews",
    ],
    prepTips: [
      "Study financial markets and basic financial concepts",
      "Practice coding problems focused on arrays, strings, and algorithms",
      "Prepare for brainteasers and probability questions",
      "Research Goldman Sachs' business divisions and recent news",
    ],
    dsaFocus: [
      "Arrays",
      "Strings",
      "Dynamic Programming",
      "Probability & Statistics",
    ],
    systemDesign: "Focus on low-latency trading systems and data processing",
    resources: [
      {
        name: "Goldman Sachs Careers",
        url: "https://www.goldmansachs.com/careers/",
      },
      {
        name: "Quantitative Finance Interview Questions",
        url: "https://www.glassdoor.com/Interview/Goldman-Sachs-Quantitative-Analyst-Interview-Questions-EI_IE2800.0,13_KO14,34.htm",
      },
      {
        name: "Elements of Programming Interviews",
        url: "https://elementsofprogramminginterviews.com/",
      },
    ],
  },

  // Product Companies
  Adobe: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Adobe_Corporate_Logo.png/120px-Adobe_Corporate_Logo.png",
    description:
      "Adobe's interviews focus on coding skills, system design, and cultural fit.",
    interviewProcess: [
      "Online Assessment: Coding problems and aptitude tests",
      "Technical Phone Screen: Coding and technical questions",
      "Onsite (3-4 rounds): Coding, system design, behavioral",
    ],
    prepTips: [
      "Practice object-oriented design and patterns",
      "Study front-end technologies if applying for UI roles",
      "Prepare for questions on Adobe's products and technologies",
      "Focus on medium LeetCode problems",
    ],
    dsaFocus: [
      "Arrays",
      "Strings",
      "Trees",
      "Dynamic Programming",
      "Object-Oriented Design",
    ],
    systemDesign:
      "Focus on scalable cloud services and creative software architecture",
    resources: [
      {
        name: "LeetCode Adobe Tagged Questions",
        url: "https://leetcode.com/company/adobe/",
      },
      {
        name: "Adobe Technology Blog",
        url: "https://blog.developer.adobe.com/",
      },
      {
        name: "Head First Design Patterns",
        url: "https://www.oreilly.com/library/view/head-first-design/0596007124/",
      },
    ],
  },

  // Indian Tech Companies
  Infosys: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/120px-Infosys_logo.svg.png",
    description:
      "Infosys interviews focus on technical fundamentals, aptitude, and communication skills.",
    interviewProcess: [
      "Online Test: Aptitude, reasoning, and technical MCQs",
      "Technical Interview: CS fundamentals and coding questions",
      "HR Interview: Behavioral questions and cultural fit",
    ],
    prepTips: [
      "Focus on CS fundamentals (OS, DBMS, Networks)",
      "Practice basic coding problems and SQL queries",
      "Prepare for aptitude and logical reasoning questions",
      "Research Infosys' services and recent projects",
    ],
    dsaFocus: ["Arrays", "Strings", "Basic Algorithms", "SQL"],
    systemDesign:
      "Basic understanding of software architecture and database design",
    resources: [
      { name: "Infosys Careers", url: "https://www.infosys.com/careers/" },
      {
        name: "GeeksforGeeks Infosys Interview Preparation",
        url: "https://www.geeksforgeeks.org/infosys-interview-preparation/",
      },
      {
        name: "IndiaBIX Aptitude Questions",
        url: "https://www.indiabix.com/aptitude/questions-and-answers/",
      },
    ],
  },
  TCS: {
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Tata_Consultancy_Services_Logo.svg/120px-Tata_Consultancy_Services_Logo.svg.png",
    description:
      "TCS interviews focus on aptitude, technical fundamentals, and communication skills.",
    interviewProcess: [
      "TCS National Qualifier Test (NQT): Aptitude, reasoning, and programming",
      "Technical Interview: CS fundamentals and basic coding",
      "Managerial/HR Interview: Behavioral questions and cultural fit",
    ],
    prepTips: [
      "Practice quantitative aptitude and logical reasoning",
      "Study CS fundamentals (OS, DBMS, OOP concepts)",
      "Prepare for basic coding problems in C/C++/Java",
      "Research TCS' business model and recent initiatives",
    ],
    dsaFocus: [
      "Arrays",
      "Strings",
      "Basic Algorithms",
      "Programming Fundamentals",
    ],
    systemDesign: "Basic understanding of software development lifecycle",
    resources: [
      { name: "TCS Careers", url: "https://www.tcs.com/careers" },
      {
        name: "TCS NQT Preparation",
        url: "https://www.geeksforgeeks.org/tcs-national-qualifier-test-preparation/",
      },
      {
        name: "IndiaBIX TCS Interview Questions",
        url: "https://www.indiabix.com/technical/tcs-interview-questions/",
      },
    ],
  },
};

// Function to get all company names
function getCompanyNames() {
  return Object.keys(companyData);
}

// Function to get company data by name
function getCompanyData(companyName) {
  return companyData[companyName] || null;
}

// Load custom companies from localStorage
function loadCustomCompanies() {
  const customCompaniesJSON = localStorage.getItem("customCompanies");
  if (customCompaniesJSON) {
    const customCompanies = JSON.parse(customCompaniesJSON);
    // Merge custom companies with predefined ones
    Object.assign(companyData, customCompanies);
  }
}

// Save a custom company to localStorage
function saveCustomCompany(companyName, companyInfo) {
  let customCompanies = {};
  const customCompaniesJSON = localStorage.getItem("customCompanies");

  if (customCompaniesJSON) {
    customCompanies = JSON.parse(customCompaniesJSON);
  }

  customCompanies[companyName] = companyInfo;
  localStorage.setItem("customCompanies", JSON.stringify(customCompanies));

  // Also add to the current companyData object
  companyData[companyName] = companyInfo;
}

// Initialize by loading custom companies
loadCustomCompanies();
