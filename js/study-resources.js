/**
 * Study Resources Module
 * Handles integration of study resources and materials
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize study resources
  initStudyResources();

  /**
   * Initialize study resources functionality
   */
  function initStudyResources() {
    // Add resources section to the dashboard
    addResourcesSection();

    // Add event listeners
    document.addEventListener("dashboardSelected", function () {
      updateResourcesDisplay();
    });

    // Add event listener for resource modal
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("add-resource-btn")) {
        openAddResourceModal();
      } else if (e.target.classList.contains("resource-category-btn")) {
        const category = e.target.dataset.category;
        filterResourcesByCategory(category);
      }
    });
  }

  /**
   * Add resources section to the dashboard
   */
  function addResourcesSection() {
    // Get dashboard section
    const dashboardSection = document.getElementById("dashboard");
    if (!dashboardSection) return;

    // Create resources section
    const resourcesSection = document.createElement("div");
    resourcesSection.className =
      "bg-white shadow-lg rounded-lg p-4 sm:p-6 mt-6";
    resourcesSection.innerHTML = `
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold text-teal-700">Study Resources</h3>
        <button class="add-resource-btn bg-sky-500 hover:bg-sky-600 text-white text-xs sm:text-sm font-medium py-1.5 px-3 rounded-md shadow transition duration-150 ease-in-out">
          Add Resource
        </button>
      </div>
      <div class="mb-4 flex flex-wrap gap-2">
        <button data-category="all" class="resource-category-btn active bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs sm:text-sm font-medium py-1 px-2 rounded transition duration-150 ease-in-out">
          All
        </button>
        <button data-category="DSA" class="resource-category-btn bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs sm:text-sm font-medium py-1 px-2 rounded transition duration-150 ease-in-out">
          DSA
        </button>
        <button data-category="OS" class="resource-category-btn bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs sm:text-sm font-medium py-1 px-2 rounded transition duration-150 ease-in-out">
          OS
        </button>
        <button data-category="DBMS" class="resource-category-btn bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs sm:text-sm font-medium py-1 px-2 rounded transition duration-150 ease-in-out">
          DBMS
        </button>
        <button data-category="Networks" class="resource-category-btn bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs sm:text-sm font-medium py-1 px-2 rounded transition duration-150 ease-in-out">
          Networks
        </button>
        <button data-category="Interview" class="resource-category-btn bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs sm:text-sm font-medium py-1 px-2 rounded transition duration-150 ease-in-out">
          Interview
        </button>
      </div>
      <div id="resources-container" class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Resources will be populated here -->
      </div>
    `;

    // Add resources section to dashboard
    dashboardSection.appendChild(resourcesSection);

    // Create add resource modal
    createAddResourceModal();
  }

  /**
   * Create add resource modal
   */
  function createAddResourceModal() {
    // Create modal element
    const modal = document.createElement("div");
    modal.id = "addResourceModal";
    modal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden";

    modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-teal-700">Add Study Resource</h3>
          <button id="closeAddResourceModal" class="text-stone-400 hover:text-stone-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form id="addResourceForm" class="space-y-4">
          <div>
            <label for="resourceTitle" class="block text-sm font-medium text-stone-700 mb-1">Title</label>
            <input type="text" id="resourceTitle" class="w-full rounded-md border-stone-300 shadow-sm focus:border-sky-500 focus:ring-sky-500" required>
          </div>
          <div>
            <label for="resourceURL" class="block text-sm font-medium text-stone-700 mb-1">URL</label>
            <input type="url" id="resourceURL" class="w-full rounded-md border-stone-300 shadow-sm focus:border-sky-500 focus:ring-sky-500" required>
          </div>
          <div>
            <label for="resourceCategory" class="block text-sm font-medium text-stone-700 mb-1">Category</label>
            <select id="resourceCategory" class="w-full rounded-md border-stone-300 shadow-sm focus:border-sky-500 focus:ring-sky-500" required>
              <option value="DSA">DSA</option>
              <option value="OS">Operating Systems</option>
              <option value="DBMS">Database Systems</option>
              <option value="Networks">Computer Networks</option>
              <option value="Interview">Interview Prep</option>
              <option value="Aptitude">Aptitude</option>
              <option value="Projects">Projects</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label for="resourceDescription" class="block text-sm font-medium text-stone-700 mb-1">Description</label>
            <textarea id="resourceDescription" class="w-full rounded-md border-stone-300 shadow-sm focus:border-sky-500 focus:ring-sky-500" rows="3"></textarea>
          </div>
          <div class="flex justify-end">
            <button type="submit" class="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-md shadow transition duration-150 ease-in-out">
              Add Resource
            </button>
          </div>
        </form>
      </div>
    `;

    // Add modal to document
    document.body.appendChild(modal);

    // Add event listeners
    document
      .getElementById("closeAddResourceModal")
      .addEventListener("click", function () {
        document.getElementById("addResourceModal").classList.add("hidden");
      });

    document
      .getElementById("addResourceForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        addResource();
      });
  }

  /**
   * Open add resource modal
   */
  function openAddResourceModal() {
    document.getElementById("addResourceModal").classList.remove("hidden");
  }

  /**
   * Add a new resource
   */
  function addResource() {
    // Get form values
    const title = document.getElementById("resourceTitle").value;
    const url = document.getElementById("resourceURL").value;
    const category = document.getElementById("resourceCategory").value;
    const description = document.getElementById("resourceDescription").value;

    // Create resource object
    const resource = {
      id: Date.now(),
      title: title,
      url: url,
      category: category,
      description: description,
      dateAdded: new Date().toISOString(),
      favorite: false,
    };

    // Get user data
    const userData = getUserData();

    // Initialize resources array if it doesn't exist
    if (!userData.resources) {
      userData.resources = [];
    }

    // Add resource
    userData.resources.push(resource);

    // Save user data
    saveUserData(userData);

    // Close modal
    document.getElementById("addResourceModal").classList.add("hidden");

    // Reset form
    document.getElementById("addResourceForm").reset();

    // Update resources display
    updateResourcesDisplay();
  }

  /**
   * Update resources display
   */
  function updateResourcesDisplay() {
    const resourcesContainer = document.getElementById("resources-container");
    if (!resourcesContainer) return;

    // Get user data
    const userData = getUserData();

    // Get resources
    const resources = userData.resources || [];

    // Get active category filter
    const activeCategory =
      document.querySelector(".resource-category-btn.active")?.dataset
        .category || "all";

    // Filter resources by category
    const filteredResources =
      activeCategory === "all"
        ? resources
        : resources.filter((resource) => resource.category === activeCategory);

    // Clear container
    resourcesContainer.innerHTML = "";

    // Add resources
    if (filteredResources.length > 0) {
      filteredResources.forEach((resource) => {
        const resourceElement = document.createElement("div");
        resourceElement.className =
          "bg-stone-50 rounded-lg shadow p-3 hover:shadow-md transition-shadow duration-200";

        resourceElement.innerHTML = `
          <div class="flex justify-between items-start">
            <h4 class="text-md font-medium text-sky-700 mb-1">${
              resource.title
            }</h4>
            <div class="flex space-x-1">
              <button class="toggle-favorite-btn text-stone-400 hover:text-amber-500" data-id="${
                resource.id
              }">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ${
                  resource.favorite ? "text-amber-500" : ""
                }" fill="${
          resource.favorite ? "currentColor" : "none"
        }" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </button>
              <button class="delete-resource-btn text-stone-400 hover:text-red-500" data-id="${
                resource.id
              }">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
          <div class="text-xs text-stone-500 mb-2">
            <span class="inline-block bg-stone-200 rounded px-2 py-0.5 mr-1">${
              resource.category
            }</span>
            <span>${new Date(resource.dateAdded).toLocaleDateString()}</span>
          </div>
          ${
            resource.description
              ? `<p class="text-sm text-stone-600 mb-2">${resource.description}</p>`
              : ""
          }
          <a href="${
            resource.url
          }" target="_blank" class="text-sm text-sky-600 hover:text-sky-800 hover:underline block truncate">
            ${resource.url}
          </a>
        `;

        resourcesContainer.appendChild(resourceElement);
      });

      // Add event listeners for favorite and delete buttons
      document.querySelectorAll(".toggle-favorite-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          toggleFavorite(this.dataset.id);
        });
      });

      document.querySelectorAll(".delete-resource-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          deleteResource(this.dataset.id);
        });
      });
    } else {
      // No resources found
      resourcesContainer.innerHTML = `
        <div class="col-span-full text-center py-6 text-stone-500">
          <p>No resources found. Click "Add Resource" to add your first study resource.</p>
        </div>
      `;
    }
  }

  /**
   * Filter resources by category
   * @param {string} category - The category to filter by
   */
  function filterResourcesByCategory(category) {
    // Update active button
    document.querySelectorAll(".resource-category-btn").forEach((btn) => {
      if (btn.dataset.category === category) {
        btn.classList.add("active");
        btn.classList.add("bg-stone-300");
        btn.classList.remove("bg-stone-200");
      } else {
        btn.classList.remove("active");
        btn.classList.remove("bg-stone-300");
        btn.classList.add("bg-stone-200");
      }
    });

    // Update resources display
    updateResourcesDisplay();
  }

  /**
   * Toggle favorite status for a resource
   * @param {string} id - The resource ID
   */
  function toggleFavorite(id) {
    // Get user data
    const userData = getUserData();

    // Find resource
    const resource = userData.resources.find(
      (r) => r.id.toString() === id.toString()
    );

    if (resource) {
      // Toggle favorite status
      resource.favorite = !resource.favorite;

      // Save user data
      saveUserData(userData);

      // Update resources display
      updateResourcesDisplay();
    }
  }

  /**
   * Delete a resource
   * @param {string} id - The resource ID
   */
  function deleteResource(id) {
    if (confirm("Are you sure you want to delete this resource?")) {
      // Get user data
      const userData = getUserData();

      // Filter out the resource
      userData.resources = userData.resources.filter(
        (r) => r.id.toString() !== id.toString()
      );

      // Save user data
      saveUserData(userData);

      // Update resources display
      updateResourcesDisplay();
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

  // Add default resources if none exist
  function addDefaultResources() {
    const userData = getUserData();

    if (!userData.resources || userData.resources.length === 0) {
      userData.resources = [
        {
          id: 1,
          title: "LeetCode",
          url: "https://leetcode.com/",
          category: "DSA",
          description: "Platform for practicing coding interview questions",
          dateAdded: new Date().toISOString(),
          favorite: false,
        },
        {
          id: 2,
          title: "GeeksforGeeks",
          url: "https://www.geeksforgeeks.org/",
          category: "DSA",
          description:
            "Computer science portal with tutorials and practice problems",
          dateAdded: new Date().toISOString(),
          favorite: false,
        },
        {
          id: 3,
          title: "Operating System Notes",
          url: "https://www.geeksforgeeks.org/operating-systems/",
          category: "OS",
          description: "Comprehensive OS notes for interview preparation",
          dateAdded: new Date().toISOString(),
          favorite: false,
        },
        {
          id: 4,
          title: "Database Management System Notes",
          url: "https://www.geeksforgeeks.org/dbms/",
          category: "DBMS",
          description: "DBMS concepts and interview questions",
          dateAdded: new Date().toISOString(),
          favorite: false,
        },
        {
          id: 5,
          title: "Computer Networks Notes",
          url: "https://www.geeksforgeeks.org/computer-network-tutorials/",
          category: "Networks",
          description: "Computer Networks concepts and interview questions",
          dateAdded: new Date().toISOString(),
          favorite: false,
        },
      ];

      saveUserData(userData);
    }
  }

  // Initialize default resources
  addDefaultResources();
});
