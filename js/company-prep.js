/**
 * Company Preparation Module
 * Handles the company-specific preparation functionality
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the company preparation module when the DOM is loaded
  initCompanyPrep();

  // Listen for navigation events
  document.addEventListener("companyPrepSelected", function () {
    refreshCompanyList();
  });
});

/**
 * Initialize the company preparation module
 */
function initCompanyPrep() {
  // Set up event listeners for company preparation section
  setupCompanyPrepEventListeners();

  // Initial population of company list
  refreshCompanyList();
}

/**
 * Set up event listeners for the company preparation section
 */
function setupCompanyPrepEventListeners() {
  // Company selector change event
  const companySelector = document.getElementById("company-selector");
  if (companySelector) {
    companySelector.addEventListener("change", function () {
      const selectedCompany = this.value;
      if (selectedCompany) {
        displayCompanyInfo(selectedCompany);
      }
    });
  }

  // Add custom company button
  const addCompanyBtn = document.getElementById("add-company-btn");
  if (addCompanyBtn) {
    addCompanyBtn.addEventListener("click", function () {
      // Show the add company modal
      const addCompanyModal = document.getElementById("add-company-modal");
      if (addCompanyModal) {
        addCompanyModal.classList.remove("hidden");
      }
    });
  }

  // Add company form submission
  const addCompanyForm = document.getElementById("add-company-form");
  if (addCompanyForm) {
    addCompanyForm.addEventListener("submit", function (e) {
      e.preventDefault();
      saveNewCompany();
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
}

/**
 * Refresh the company list in the selector
 */
function refreshCompanyList() {
  const companySelector = document.getElementById("company-selector");
  if (!companySelector) return;

  // Clear existing options
  companySelector.innerHTML = '<option value="">Select a company</option>';

  // Get all company names
  const companyNames = getCompanyNames();

  // Add options for each company
  companyNames.forEach((companyName) => {
    const option = document.createElement("option");
    option.value = companyName;
    option.textContent = companyName;
    companySelector.appendChild(option);
  });

  // If there was a previously selected company, try to select it again
  const lastSelectedCompany = localStorage.getItem("lastSelectedCompany");
  if (lastSelectedCompany && companyNames.includes(lastSelectedCompany)) {
    companySelector.value = lastSelectedCompany;
    displayCompanyInfo(lastSelectedCompany);
  }
}

/**
 * Display information for the selected company
 * @param {string} companyName - The name of the company to display
 */
function displayCompanyInfo(companyName) {
  const companyInfoContainer = document.getElementById("company-info");
  if (!companyInfoContainer) return;

  // Save the selected company for future visits
  localStorage.setItem("lastSelectedCompany", companyName);

  // Get company data
  const company = getCompanyData(companyName);
  if (!company) {
    companyInfoContainer.innerHTML =
      '<p class="text-red-500">Company information not found.</p>';
    return;
  }

  // Create the company info HTML
  let html = `
    <div class="bg-white shadow-lg rounded-lg overflow-hidden">
      <div class="bg-sky-100 px-6 py-4 flex items-center border-b border-sky-200">
        <div class="mr-4">
          <img src="${
            company.logo || "https://via.placeholder.com/80"
          }" alt="${companyName} Logo" class="h-16 w-16 object-contain">
        </div>
        <div>
          <h3 class="text-2xl font-bold text-sky-800">${companyName}</h3>
          <p class="text-stone-600">${
            company.description || "No description available."
          }</p>
        </div>
      </div>
      
      <div class="p-6">
        <div class="mb-6">
          <h4 class="text-lg font-semibold text-sky-700 mb-2">Interview Process</h4>
          <ul class="list-disc pl-5 space-y-1">
            ${
              company.interviewProcess
                ? company.interviewProcess
                    .map((step) => `<li class="text-stone-700">${step}</li>`)
                    .join("")
                : '<li class="text-stone-500">No interview process information available.</li>'
            }
          </ul>
        </div>
        
        <div class="mb-6">
          <h4 class="text-lg font-semibold text-sky-700 mb-2">Preparation Tips</h4>
          <ul class="list-disc pl-5 space-y-1">
            ${
              company.prepTips
                ? company.prepTips
                    .map((tip) => `<li class="text-stone-700">${tip}</li>`)
                    .join("")
                : '<li class="text-stone-500">No preparation tips available.</li>'
            }
          </ul>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 class="text-lg font-semibold text-sky-700 mb-2">DSA Focus Areas</h4>
            <div class="flex flex-wrap gap-2">
              ${
                company.dsaFocus
                  ? company.dsaFocus
                      .map(
                        (topic) =>
                          `<span class="bg-sky-100 text-sky-800 px-3 py-1 rounded-full text-sm">${topic}</span>`
                      )
                      .join("")
                  : '<span class="text-stone-500">No DSA focus areas specified.</span>'
              }
            </div>
          </div>
          
          <div>
            <h4 class="text-lg font-semibold text-sky-700 mb-2">System Design</h4>
            <p class="text-stone-700">${
              company.systemDesign || "No system design information available."
            }</p>
          </div>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold text-sky-700 mb-2">Recommended Resources</h4>
          <ul class="list-disc pl-5 space-y-1">
            ${
              company.resources
                ? company.resources
                    .map(
                      (resource) =>
                        `<li class="text-stone-700"><a href="${resource.url}" target="_blank" class="text-sky-600 hover:underline">${resource.name}</a></li>`
                    )
                    .join("")
                : '<li class="text-stone-500">No resources available.</li>'
            }
          </ul>
        </div>
      </div>
    </div>
  `;

  // Update the container
  companyInfoContainer.innerHTML = html;
}

/**
 * Save a new custom company
 */
function saveNewCompany() {
  const form = document.getElementById("add-company-form");
  if (!form) return;

  // Get form values
  const companyName = form.querySelector("#new-company-name").value.trim();
  const companyDescription = form
    .querySelector("#new-company-description")
    .value.trim();
  const companyLogo = form.querySelector("#new-company-logo").value.trim();

  // Process interview steps (comma-separated)
  const interviewStepsText = form
    .querySelector("#new-company-interview-steps")
    .value.trim();
  const interviewSteps = interviewStepsText
    .split("\n")
    .filter((step) => step.trim() !== "");

  // Process preparation tips (comma-separated)
  const prepTipsText = form
    .querySelector("#new-company-prep-tips")
    .value.trim();
  const prepTips = prepTipsText.split("\n").filter((tip) => tip.trim() !== "");

  // Process DSA focus areas (comma-separated)
  const dsaFocusText = form
    .querySelector("#new-company-dsa-focus")
    .value.trim();
  const dsaFocus = dsaFocusText
    .split(",")
    .map((area) => area.trim())
    .filter((area) => area !== "");

  // Get system design info
  const systemDesign = form
    .querySelector("#new-company-system-design")
    .value.trim();

  // Create the company object
  const companyInfo = {
    logo: companyLogo || "https://via.placeholder.com/80",
    description: companyDescription,
    interviewProcess: interviewSteps,
    prepTips: prepTips,
    dsaFocus: dsaFocus,
    systemDesign: systemDesign,
    resources: [], // Empty resources for now, could be enhanced later
  };

  // Save the company
  saveCustomCompany(companyName, companyInfo);

  // Refresh the company list
  refreshCompanyList();

  // Select the new company
  const companySelector = document.getElementById("company-selector");
  if (companySelector) {
    companySelector.value = companyName;
    displayCompanyInfo(companyName);
  }

  // Hide the modal
  const modal = document.getElementById("add-company-modal");
  if (modal) {
    modal.classList.add("hidden");
  }

  // Reset the form
  form.reset();

  // Show success message
  showNotification(
    `Company "${companyName}" has been added successfully!`,
    "success"
  );
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
