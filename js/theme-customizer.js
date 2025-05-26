/**
 * Theme Customizer Module
 * Handles customizable themes beyond just dark/light mode
 */

document.addEventListener("DOMContentLoaded", function () {
  // Initialize theme customizer
  initThemeCustomizer();

  /**
   * Initialize theme customizer functionality
   */
  function initThemeCustomizer() {
    // Add theme selector to the header
    addThemeSelector();

    // Apply saved theme
    applySavedTheme();

    // Add event listeners
    document.addEventListener("click", function (e) {
      if (e.target.classList.contains("theme-option")) {
        const theme = e.target.dataset.theme;
        applyTheme(theme);
      } else if (e.target.id === "customizeThemeBtn") {
        openThemeCustomizer();
      }
    });
  }

  /**
   * Add theme selector to the header
   */
  function addThemeSelector() {
    // Get the theme toggle container
    const themeToggleContainer =
      document.querySelector(".theme-switch").parentElement;
    if (!themeToggleContainer) return;

    // Create theme selector dropdown
    const themeSelector = document.createElement("div");
    themeSelector.className = "theme-selector relative ml-4";

    themeSelector.innerHTML = `
      <button id="themeMenuBtn" class="flex items-center text-sm text-stone-600 hover:text-stone-800">
        <span id="currentThemeName">Default</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div id="themeMenu" class="hidden absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-stone-200">
        <div class="py-1">
          <button data-theme="default" class="theme-option block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-100">
            Default
          </button>
          <button data-theme="ocean" class="theme-option block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-100">
            Ocean Blue
          </button>
          <button data-theme="forest" class="theme-option block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-100">
            Forest Green
          </button>
          <button data-theme="sunset" class="theme-option block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-100">
            Sunset Orange
          </button>
          <button data-theme="lavender" class="theme-option block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-100">
            Lavender Purple
          </button>
          <button data-theme="dark" class="theme-option block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-100">
            Dark Mode
          </button>
          <button id="customizeThemeBtn" class="block w-full text-left px-4 py-2 text-sm text-sky-600 hover:bg-stone-100">
            Customize Theme...
          </button>
        </div>
      </div>
    `;

    // Add theme selector to the header
    themeToggleContainer.parentElement.appendChild(themeSelector);

    // Add event listener for theme menu toggle
    document
      .getElementById("themeMenuBtn")
      .addEventListener("click", function (e) {
        e.stopPropagation();
        document.getElementById("themeMenu").classList.toggle("hidden");
      });

    // Close menu when clicking outside
    document.addEventListener("click", function () {
      document.getElementById("themeMenu").classList.add("hidden");
    });

    // Create theme customizer modal
    createThemeCustomizerModal();
  }

  /**
   * Create theme customizer modal
   */
  function createThemeCustomizerModal() {
    // Create modal element
    const modal = document.createElement("div");
    modal.id = "themeCustomizerModal";
    modal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden";

    modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-semibold text-teal-700">Customize Theme</h3>
          <button id="closeThemeCustomizerModal" class="text-stone-400 hover:text-stone-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form id="themeCustomizerForm" class="space-y-4">
          <div>
            <label for="themeName" class="block text-sm font-medium text-stone-700 mb-1">Theme Name</label>
            <input type="text" id="themeName" class="w-full rounded-md border-stone-300 shadow-sm focus:border-sky-500 focus:ring-sky-500" required>
          </div>
          <div>
            <label for="primaryColor" class="block text-sm font-medium text-stone-700 mb-1">Primary Color</label>
            <div class="flex items-center">
              <input type="color" id="primaryColor" class="h-10 w-10 rounded border-stone-300 shadow-sm" value="#14b8a6">
              <input type="text" id="primaryColorHex" class="ml-2 w-full rounded-md border-stone-300 shadow-sm focus:border-sky-500 focus:ring-sky-500" value="#14b8a6">
            </div>
          </div>
          <div>
            <label for="secondaryColor" class="block text-sm font-medium text-stone-700 mb-1">Secondary Color</label>
            <div class="flex items-center">
              <input type="color" id="secondaryColor" class="h-10 w-10 rounded border-stone-300 shadow-sm" value="#0ea5e9">
              <input type="text" id="secondaryColorHex" class="ml-2 w-full rounded-md border-stone-300 shadow-sm focus:border-sky-500 focus:ring-sky-500" value="#0ea5e9">
            </div>
          </div>
          <div>
            <label for="accentColor" class="block text-sm font-medium text-stone-700 mb-1">Accent Color</label>
            <div class="flex items-center">
              <input type="color" id="accentColor" class="h-10 w-10 rounded border-stone-300 shadow-sm" value="#f59e0b">
              <input type="text" id="accentColorHex" class="ml-2 w-full rounded-md border-stone-300 shadow-sm focus:border-sky-500 focus:ring-sky-500" value="#f59e0b">
            </div>
          </div>
          <div>
            <label for="backgroundColor" class="block text-sm font-medium text-stone-700 mb-1">Background Color</label>
            <div class="flex items-center">
              <input type="color" id="backgroundColor" class="h-10 w-10 rounded border-stone-300 shadow-sm" value="#f5f5f4">
              <input type="text" id="backgroundColorHex" class="ml-2 w-full rounded-md border-stone-300 shadow-sm focus:border-sky-500 focus:ring-sky-500" value="#f5f5f4">
            </div>
          </div>
          <div>
            <label for="textColor" class="block text-sm font-medium text-stone-700 mb-1">Text Color</label>
            <div class="flex items-center">
              <input type="color" id="textColor" class="h-10 w-10 rounded border-stone-300 shadow-sm" value="#44403c">
              <input type="text" id="textColorHex" class="ml-2 w-full rounded-md border-stone-300 shadow-sm focus:border-sky-500 focus:ring-sky-500" value="#44403c">
            </div>
          </div>
          <div class="pt-2">
            <h4 class="text-md font-medium text-stone-700 mb-2">Preview</h4>
            <div id="themePreview" class="p-4 rounded-lg border border-stone-200">
              <div class="flex items-center justify-between mb-2">
                <div class="text-lg font-semibold preview-primary">Primary Heading</div>
                <button class="preview-button-primary px-3 py-1 rounded text-white">Button</button>
              </div>
              <div class="flex items-center justify-between mb-2">
                <div class="text-md font-medium preview-secondary">Secondary Heading</div>
                <button class="preview-button-secondary px-3 py-1 rounded text-white">Button</button>
              </div>
              <div class="preview-text">This is sample text to preview the theme colors.</div>
              <div class="mt-2 text-sm preview-accent">Accent text for highlights</div>
            </div>
          </div>
          <div class="flex justify-end space-x-2">
            <button type="button" id="resetThemeBtn" class="bg-stone-200 hover:bg-stone-300 text-stone-800 font-medium py-2 px-4 rounded-md shadow transition duration-150 ease-in-out">
              Reset
            </button>
            <button type="submit" class="bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 px-4 rounded-md shadow transition duration-150 ease-in-out">
              Save Theme
            </button>
          </div>
        </form>
      </div>
    `;

    // Add modal to document
    document.body.appendChild(modal);

    // Add event listeners
    document
      .getElementById("closeThemeCustomizerModal")
      .addEventListener("click", function () {
        document.getElementById("themeCustomizerModal").classList.add("hidden");
      });

    document
      .getElementById("themeCustomizerForm")
      .addEventListener("submit", function (e) {
        e.preventDefault();
        saveCustomTheme();
      });

    document
      .getElementById("resetThemeBtn")
      .addEventListener("click", function () {
        resetThemeForm();
      });

    // Sync color inputs with hex inputs
    const colorInputs = [
      "primaryColor",
      "secondaryColor",
      "accentColor",
      "backgroundColor",
      "textColor",
    ];
    colorInputs.forEach((id) => {
      const colorInput = document.getElementById(id);
      const hexInput = document.getElementById(`${id}Hex`);

      colorInput.addEventListener("input", function () {
        hexInput.value = this.value;
        updateThemePreview();
      });

      hexInput.addEventListener("input", function () {
        if (/^#[0-9A-F]{6}$/i.test(this.value)) {
          colorInput.value = this.value;
          updateThemePreview();
        }
      });
    });

    // Initialize theme preview
    updateThemePreview();
  }

  /**
   * Open theme customizer modal
   */
  function openThemeCustomizer() {
    document.getElementById("themeCustomizerModal").classList.remove("hidden");

    // Get current theme
    const currentTheme = getCurrentTheme();

    // Populate form with current theme values
    document.getElementById("themeName").value =
      currentTheme.name || "My Custom Theme";
    document.getElementById("primaryColor").value =
      currentTheme.primaryColor || "#14b8a6";
    document.getElementById("primaryColorHex").value =
      currentTheme.primaryColor || "#14b8a6";
    document.getElementById("secondaryColor").value =
      currentTheme.secondaryColor || "#0ea5e9";
    document.getElementById("secondaryColorHex").value =
      currentTheme.secondaryColor || "#0ea5e9";
    document.getElementById("accentColor").value =
      currentTheme.accentColor || "#f59e0b";
    document.getElementById("accentColorHex").value =
      currentTheme.accentColor || "#f59e0b";
    document.getElementById("backgroundColor").value =
      currentTheme.backgroundColor || "#f5f5f4";
    document.getElementById("backgroundColorHex").value =
      currentTheme.backgroundColor || "#f5f5f4";
    document.getElementById("textColor").value =
      currentTheme.textColor || "#44403c";
    document.getElementById("textColorHex").value =
      currentTheme.textColor || "#44403c";

    // Update preview
    updateThemePreview();
  }

  /**
   * Update theme preview
   */
  function updateThemePreview() {
    const primaryColor = document.getElementById("primaryColor").value;
    const secondaryColor = document.getElementById("secondaryColor").value;
    const accentColor = document.getElementById("accentColor").value;
    const backgroundColor = document.getElementById("backgroundColor").value;
    const textColor = document.getElementById("textColor").value;

    const previewElement = document.getElementById("themePreview");
    previewElement.style.backgroundColor = backgroundColor;
    previewElement.style.color = textColor;

    const primaryElements = previewElement.querySelectorAll(".preview-primary");
    primaryElements.forEach((el) => {
      el.style.color = primaryColor;
    });

    const secondaryElements =
      previewElement.querySelectorAll(".preview-secondary");
    secondaryElements.forEach((el) => {
      el.style.color = secondaryColor;
    });

    const accentElements = previewElement.querySelectorAll(".preview-accent");
    accentElements.forEach((el) => {
      el.style.color = accentColor;
    });

    const primaryButtons = previewElement.querySelectorAll(
      ".preview-button-primary"
    );
    primaryButtons.forEach((el) => {
      el.style.backgroundColor = primaryColor;
    });

    const secondaryButtons = previewElement.querySelectorAll(
      ".preview-button-secondary"
    );
    secondaryButtons.forEach((el) => {
      el.style.backgroundColor = secondaryColor;
    });

    const textElements = previewElement.querySelectorAll(".preview-text");
    textElements.forEach((el) => {
      el.style.color = textColor;
    });
  }

  /**
   * Reset theme form to default values
   */
  function resetThemeForm() {
    document.getElementById("themeName").value = "My Custom Theme";
    document.getElementById("primaryColor").value = "#14b8a6";
    document.getElementById("primaryColorHex").value = "#14b8a6";
    document.getElementById("secondaryColor").value = "#0ea5e9";
    document.getElementById("secondaryColorHex").value = "#0ea5e9";
    document.getElementById("accentColor").value = "#f59e0b";
    document.getElementById("accentColorHex").value = "#f59e0b";
    document.getElementById("backgroundColor").value = "#f5f5f4";
    document.getElementById("backgroundColorHex").value = "#f5f5f4";
    document.getElementById("textColor").value = "#44403c";
    document.getElementById("textColorHex").value = "#44403c";

    updateThemePreview();
  }

  /**
   * Save custom theme
   */
  function saveCustomTheme() {
    // Get form values
    const name = document.getElementById("themeName").value;
    const primaryColor = document.getElementById("primaryColor").value;
    const secondaryColor = document.getElementById("secondaryColor").value;
    const accentColor = document.getElementById("accentColor").value;
    const backgroundColor = document.getElementById("backgroundColor").value;
    const textColor = document.getElementById("textColor").value;

    // Create theme object
    const theme = {
      id: `custom_${Date.now()}`,
      name: name,
      primaryColor: primaryColor,
      secondaryColor: secondaryColor,
      accentColor: accentColor,
      backgroundColor: backgroundColor,
      textColor: textColor,
      isDark: isColorDark(backgroundColor),
    };

    // Get user data
    const userData = getUserData();

    // Initialize themes array if it doesn't exist
    if (!userData.themes) {
      userData.themes = [];
    }

    // Check if theme with same name exists
    const existingThemeIndex = userData.themes.findIndex(
      (t) => t.name === name
    );
    if (existingThemeIndex !== -1) {
      // Update existing theme
      userData.themes[existingThemeIndex] = theme;
    } else {
      // Add new theme
      userData.themes.push(theme);
    }

    // Save user data
    saveUserData(userData);

    // Apply the new theme
    applyTheme(theme.id);

    // Close modal
    document.getElementById("themeCustomizerModal").classList.add("hidden");

    // Update theme menu
    updateThemeMenu();
  }

  /**
   * Update theme menu with custom themes
   */
  function updateThemeMenu() {
    // Get user data
    const userData = getUserData();

    // Get themes
    const customThemes = userData.themes || [];

    // Get theme menu
    const themeMenu = document.getElementById("themeMenu");

    // Remove existing custom themes
    const customThemeButtons = themeMenu.querySelectorAll(
      ".custom-theme-option"
    );
    customThemeButtons.forEach((btn) => btn.remove());

    // Add custom themes
    const customizeBtn = document.getElementById("customizeThemeBtn");

    customThemes.forEach((theme) => {
      const themeButton = document.createElement("button");
      themeButton.dataset.theme = theme.id;
      themeButton.className =
        "custom-theme-option theme-option block w-full text-left px-4 py-2 text-sm text-stone-700 hover:bg-stone-100";
      themeButton.textContent = theme.name;

      themeMenu.insertBefore(themeButton, customizeBtn);
    });
  }

  /**
   * Apply theme
   * @param {string} themeId - The theme ID to apply
   */
  function applyTheme(themeId) {
    // Get theme data
    let theme;

    if (themeId === "default") {
      theme = {
        id: "default",
        name: "Default",
        primaryColor: "#14b8a6", // teal-500
        secondaryColor: "#0ea5e9", // sky-500
        accentColor: "#f59e0b", // amber-500
        backgroundColor: "#f5f5f4", // stone-100
        textColor: "#44403c", // stone-700
        isDark: false,
      };
    } else if (themeId === "ocean") {
      theme = {
        id: "ocean",
        name: "Ocean Blue",
        primaryColor: "#0369a1", // sky-700
        secondaryColor: "#0891b2", // cyan-600
        accentColor: "#059669", // emerald-600
        backgroundColor: "#ecfeff", // cyan-50
        textColor: "#164e63", // cyan-900
        isDark: false,
      };
    } else if (themeId === "forest") {
      theme = {
        id: "forest",
        name: "Forest Green",
        primaryColor: "#166534", // green-800
        secondaryColor: "#4d7c0f", // lime-700
        accentColor: "#b45309", // amber-700
        backgroundColor: "#f0fdf4", // green-50
        textColor: "#14532d", // green-900
        isDark: false,
      };
    } else if (themeId === "sunset") {
      theme = {
        id: "sunset",
        name: "Sunset Orange",
        primaryColor: "#c2410c", // orange-700
        secondaryColor: "#b91c1c", // red-700
        accentColor: "#a16207", // yellow-700
        backgroundColor: "#fff7ed", // orange-50
        textColor: "#7c2d12", // orange-900
        isDark: false,
      };
    } else if (themeId === "lavender") {
      theme = {
        id: "lavender",
        name: "Lavender Purple",
        primaryColor: "#7e22ce", // purple-700
        secondaryColor: "#a21caf", // fuchsia-700
        accentColor: "#0369a1", // sky-700
        backgroundColor: "#faf5ff", // purple-50
        textColor: "#581c87", // purple-900
        isDark: false,
      };
    } else if (themeId === "dark") {
      theme = {
        id: "dark",
        name: "Dark Mode",
        primaryColor: "#14b8a6", // teal-500
        secondaryColor: "#0ea5e9", // sky-500
        accentColor: "#f59e0b", // amber-500
        backgroundColor: "#1c1917", // stone-900
        textColor: "#e7e5e4", // stone-200
        isDark: true,
      };
    } else {
      // Look for custom theme
      const userData = getUserData();
      const customTheme = userData.themes?.find((t) => t.id === themeId);

      if (customTheme) {
        theme = customTheme;
      } else {
        // Fallback to default
        theme = {
          id: "default",
          name: "Default",
          primaryColor: "#14b8a6", // teal-500
          secondaryColor: "#0ea5e9", // sky-500
          accentColor: "#f59e0b", // amber-500
          backgroundColor: "#f5f5f4", // stone-100
          textColor: "#44403c", // stone-700
          isDark: false,
        };
      }
    }

    // Apply theme colors
    applyThemeColors(theme);

    // Update current theme name
    document.getElementById("currentThemeName").textContent = theme.name;

    // Save current theme
    localStorage.setItem("currentTheme", themeId);

    // If theme is dark, enable dark mode
    if (theme.isDark) {
      if (typeof window.enableDarkMode === "function") {
        window.enableDarkMode();
      }
      // Set data-theme attribute directly in case enableDarkMode isn't available
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      if (typeof window.enableLightMode === "function") {
        window.enableLightMode();
      }
      // Remove data-theme attribute directly in case enableLightMode isn't available
      document.documentElement.removeAttribute("data-theme");
    }
  }

  /**
   * Apply theme colors
   * @param {Object} theme - The theme object
   */
  function applyThemeColors(theme) {
    // Create CSS variables
    const root = document.documentElement;

    root.style.setProperty("--primary-color", theme.primaryColor);
    root.style.setProperty("--secondary-color", theme.secondaryColor);
    root.style.setProperty("--accent-color", theme.accentColor);
    root.style.setProperty("--background-color", theme.backgroundColor);
    root.style.setProperty("--text-color", theme.textColor);

    // Apply colors to elements
    document.body.style.backgroundColor = theme.backgroundColor;
    document.body.style.color = theme.textColor;

    // Update primary headings
    const primaryHeadings = document.querySelectorAll(".text-teal-700");
    primaryHeadings.forEach((heading) => {
      heading.style.color = theme.primaryColor;
    });

    // Update secondary headings
    const secondaryHeadings = document.querySelectorAll(
      ".text-sky-700, .text-sky-800"
    );
    secondaryHeadings.forEach((heading) => {
      heading.style.color = theme.secondaryColor;
    });

    // Update accent elements
    const accentElements = document.querySelectorAll(".text-amber-600");
    accentElements.forEach((element) => {
      element.style.color = theme.accentColor;
    });

    // Update primary buttons
    const primaryButtons = document.querySelectorAll(
      ".bg-teal-500, .bg-teal-600"
    );
    primaryButtons.forEach((button) => {
      button.style.backgroundColor = theme.primaryColor;
    });

    // Update secondary buttons
    const secondaryButtons = document.querySelectorAll(
      ".bg-sky-500, .bg-sky-600"
    );
    secondaryButtons.forEach((button) => {
      button.style.backgroundColor = theme.secondaryColor;
    });

    // Update background elements for dark mode
    if (theme.isDark) {
      // Update card backgrounds
      const cardBgs = document.querySelectorAll(
        ".bg-white, .bg-stone-50, .bg-stone-100"
      );
      cardBgs.forEach((element) => {
        element.style.backgroundColor = "#292524"; // stone-800
        element.style.borderColor = "#44403c"; // stone-700
      });

      // Update table elements
      const tables = document.querySelectorAll("table");
      tables.forEach((table) => {
        table.style.borderColor = "#44403c"; // stone-700
      });

      // Update table headers
      const tableHeaders = document.querySelectorAll("thead");
      tableHeaders.forEach((header) => {
        header.style.backgroundColor = "#1c1917"; // stone-900
      });

      // Update table cells
      const tableCells = document.querySelectorAll("td");
      tableCells.forEach((cell) => {
        cell.style.borderColor = "#44403c"; // stone-700
      });

      // Update inputs
      const inputs = document.querySelectorAll("input, select, textarea");
      inputs.forEach((input) => {
        if (input.type !== "checkbox" && input.type !== "radio") {
          input.style.backgroundColor = "#292524"; // stone-800
          input.style.borderColor = "#44403c"; // stone-700
          input.style.color = "#e7e5e4"; // stone-200
        }
      });
    } else {
      // Reset background elements for light mode
      const cardBgs = document.querySelectorAll(
        ".bg-white, .bg-stone-50, .bg-stone-100"
      );
      cardBgs.forEach((element) => {
        element.style.backgroundColor = "";
        element.style.borderColor = "";
      });

      // Reset table elements
      const tables = document.querySelectorAll("table");
      tables.forEach((table) => {
        table.style.borderColor = "";
      });

      // Reset table headers
      const tableHeaders = document.querySelectorAll("thead");
      tableHeaders.forEach((header) => {
        header.style.backgroundColor = "";
      });

      // Reset table cells
      const tableCells = document.querySelectorAll("td");
      tableCells.forEach((cell) => {
        cell.style.borderColor = "";
      });

      // Reset inputs
      const inputs = document.querySelectorAll("input, select, textarea");
      inputs.forEach((input) => {
        if (input.type !== "checkbox" && input.type !== "radio") {
          input.style.backgroundColor = "";
          input.style.borderColor = "";
          input.style.color = "";
        }
      });
    }
  }

  /**
   * Apply saved theme
   */
  function applySavedTheme() {
    const savedTheme = localStorage.getItem("currentTheme") || "default";
    applyTheme(savedTheme);
    updateThemeMenu();
  }

  /**
   * Get current theme
   * @returns {Object} The current theme
   */
  function getCurrentTheme() {
    const savedThemeId = localStorage.getItem("currentTheme") || "default";

    if (savedThemeId === "default") {
      return {
        id: "default",
        name: "Default",
        primaryColor: "#14b8a6",
        secondaryColor: "#0ea5e9",
        accentColor: "#f59e0b",
        backgroundColor: "#f5f5f4",
        textColor: "#44403c",
        isDark: false,
      };
    } else if (savedThemeId === "ocean") {
      return {
        id: "ocean",
        name: "Ocean Blue",
        primaryColor: "#0369a1",
        secondaryColor: "#0891b2",
        accentColor: "#059669",
        backgroundColor: "#ecfeff",
        textColor: "#164e63",
        isDark: false,
      };
    } else if (savedThemeId === "forest") {
      return {
        id: "forest",
        name: "Forest Green",
        primaryColor: "#166534",
        secondaryColor: "#4d7c0f",
        accentColor: "#b45309",
        backgroundColor: "#f0fdf4",
        textColor: "#14532d",
        isDark: false,
      };
    } else if (savedThemeId === "sunset") {
      return {
        id: "sunset",
        name: "Sunset Orange",
        primaryColor: "#c2410c",
        secondaryColor: "#b91c1c",
        accentColor: "#a16207",
        backgroundColor: "#fff7ed",
        textColor: "#7c2d12",
        isDark: false,
      };
    } else if (savedThemeId === "lavender") {
      return {
        id: "lavender",
        name: "Lavender Purple",
        primaryColor: "#7e22ce",
        secondaryColor: "#a21caf",
        accentColor: "#0369a1",
        backgroundColor: "#faf5ff",
        textColor: "#581c87",
        isDark: false,
      };
    } else {
      // Look for custom theme
      const userData = getUserData();
      const customTheme = userData.themes?.find((t) => t.id === savedThemeId);

      if (customTheme) {
        return customTheme;
      } else {
        // Fallback to default
        return {
          id: "default",
          name: "Default",
          primaryColor: "#14b8a6",
          secondaryColor: "#0ea5e9",
          accentColor: "#f59e0b",
          backgroundColor: "#f5f5f4",
          textColor: "#44403c",
          isDark: false,
        };
      }
    }
  }

  /**
   * Check if a color is dark
   * @param {string} color - The color in hex format
   * @returns {boolean} True if the color is dark
   */
  function isColorDark(color) {
    // Convert hex to RGB
    const r = parseInt(color.substr(1, 2), 16);
    const g = parseInt(color.substr(3, 2), 16);
    const b = parseInt(color.substr(5, 2), 16);

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return true if color is dark
    return luminance < 0.5;
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
});
