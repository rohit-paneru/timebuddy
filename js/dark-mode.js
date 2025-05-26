/**
 * Dark Mode Module
 * Handles dark mode toggle functionality
 */

document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const themeToggle = document.getElementById("themeToggle");
  const themeLabel = document.getElementById("themeLabel");

  // Initialize dark mode
  initDarkMode();

  /**
   * Initialize dark mode functionality
   */
  function initDarkMode() {
    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    // Set initial theme based on saved preference or system preference
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      enableDarkMode();
    } else {
      enableLightMode();
    }

    // Add event listener for theme toggle
    themeToggle.addEventListener("change", function () {
      if (this.checked) {
        enableDarkMode();
      } else {
        enableLightMode();
      }
    });

    // Listen for system theme changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => {
        if (!localStorage.getItem("theme")) {
          if (e.matches) {
            enableDarkMode();
          } else {
            enableLightMode();
          }
        }
      });
  }

  /**
   * Enable dark mode
   */
  function enableDarkMode() {
    document.documentElement.setAttribute("data-theme", "dark");
    document.body.classList.remove("bg-stone-100");
    document.body.classList.add("bg-stone-900");
    themeToggle.checked = true;
    themeLabel.textContent = "Dark Mode";
    localStorage.setItem("theme", "dark");

    // Theme selector removed

    // Update chart colors if charts exist
    updateChartColors("dark");

    // Force update any elements that might not be using CSS variables
    updateElementsForDarkMode();
  }

  /**
   * Enable light mode
   */
  function enableLightMode() {
    document.documentElement.removeAttribute("data-theme");
    document.body.classList.add("bg-stone-100");
    document.body.classList.remove("bg-stone-900");
    themeToggle.checked = false;
    themeLabel.textContent = "Light Mode";
    localStorage.setItem("theme", "light");

    // Theme selector removed

    // Update chart colors if charts exist
    updateChartColors("light");

    // Reset any elements that were modified for dark mode
    resetElementsForLightMode();
  }

  // Make these functions globally available
  window.enableDarkMode = enableDarkMode;
  window.enableLightMode = enableLightMode;

  /**
   * Update elements for dark mode that might not be using CSS variables
   */
  function updateElementsForDarkMode() {
    // Update table elements
    const tables = document.querySelectorAll("table");
    tables.forEach((table) => {
      table.classList.add("dark-mode-table");
    });

    // Update specific background elements that might be using Tailwind classes
    const bgWhiteElements = document.querySelectorAll(
      ".bg-white, .bg-stone-50, .bg-stone-100"
    );
    bgWhiteElements.forEach((element) => {
      element.classList.add("dark-mode-bg");
    });

    // Update text elements
    const textElements = document.querySelectorAll(
      ".text-stone-500, .text-stone-600, .text-stone-700, .text-stone-800"
    );
    textElements.forEach((element) => {
      element.classList.add("dark-mode-text");
    });

    // Update headings
    const headings = document.querySelectorAll(
      ".text-teal-700, .text-sky-700, .text-sky-800"
    );
    headings.forEach((heading) => {
      heading.classList.add("dark-mode-heading");
    });

    // We're now using CSS custom properties for buttons via button-themes.css
    // No need to manually update button classes here

    // Update input fields
    const inputs = document.querySelectorAll("input, textarea, select");
    inputs.forEach((input) => {
      if (input.type !== "checkbox" && input.type !== "radio") {
        input.classList.add("dark-mode-input");
      }
    });
  }

  /**
   * Reset elements for light mode
   */
  function resetElementsForLightMode() {
    // Remove dark mode classes from tables
    const darkModeTables = document.querySelectorAll(".dark-mode-table");
    darkModeTables.forEach((table) => {
      table.classList.remove("dark-mode-table");
    });

    // Remove dark mode classes from background elements
    const darkModeBgElements = document.querySelectorAll(".dark-mode-bg");
    darkModeBgElements.forEach((element) => {
      element.classList.remove("dark-mode-bg");
    });

    // Remove dark mode classes from text elements
    const darkModeTextElements = document.querySelectorAll(".dark-mode-text");
    darkModeTextElements.forEach((element) => {
      element.classList.remove("dark-mode-text");
    });

    // Remove dark mode classes from headings
    const darkModeHeadings = document.querySelectorAll(".dark-mode-heading");
    darkModeHeadings.forEach((heading) => {
      heading.classList.remove("dark-mode-heading");
    });

    // We're now using CSS custom properties for buttons via button-themes.css
    // No need to manually update button classes here

    // Update input fields
  }

  /**
   * Update chart colors based on theme
   * @param {string} theme - The current theme ('light' or 'dark')
   */
  function updateChartColors(theme) {
    // Get all charts
    const charts = Chart.instances;

    if (charts.length === 0) return;

    // Define color schemes for light and dark modes
    const colorSchemes = {
      light: {
        backgroundColor: [
          "rgba(56, 189, 248, 0.7)",
          "rgba(34, 197, 94, 0.7)",
          "rgba(249, 115, 22, 0.7)",
          "rgba(168, 85, 247, 0.7)",
          "rgba(239, 68, 68, 0.7)",
          "rgba(20, 184, 166, 0.7)",
          "rgba(100, 116, 139, 0.7)",
        ],
        borderColor: [
          "rgba(56, 189, 248, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(168, 85, 247, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(20, 184, 166, 1)",
          "rgba(100, 116, 139, 1)",
        ],
        textColor: "#44403c",
      },
      dark: {
        backgroundColor: [
          "rgba(56, 189, 248, 0.8)",
          "rgba(34, 197, 94, 0.8)",
          "rgba(249, 115, 22, 0.8)",
          "rgba(168, 85, 247, 0.8)",
          "rgba(239, 68, 68, 0.8)",
          "rgba(20, 184, 166, 0.8)",
          "rgba(148, 163, 184, 0.8)",
        ],
        borderColor: [
          "rgba(56, 189, 248, 1)",
          "rgba(34, 197, 94, 1)",
          "rgba(249, 115, 22, 1)",
          "rgba(168, 85, 247, 1)",
          "rgba(239, 68, 68, 1)",
          "rgba(20, 184, 166, 1)",
          "rgba(148, 163, 184, 1)",
        ],
        textColor: "#e7e5e4",
      },
    };

    // Update each chart
    for (let key in charts) {
      const chart = charts[key];

      // Update dataset colors
      if (chart.config.type === "pie" || chart.config.type === "doughnut") {
        chart.data.datasets.forEach((dataset) => {
          dataset.backgroundColor = colorSchemes[theme].backgroundColor.slice(
            0,
            dataset.data.length
          );
          dataset.borderColor = colorSchemes[theme].borderColor.slice(
            0,
            dataset.data.length
          );
        });
      } else {
        chart.data.datasets.forEach((dataset) => {
          dataset.backgroundColor = colorSchemes[theme].backgroundColor[0];
          dataset.borderColor = colorSchemes[theme].borderColor[0];
        });
      }

      // Update text colors
      chart.options.plugins.legend.labels.color = colorSchemes[theme].textColor;
      chart.options.plugins.tooltip.titleColor = colorSchemes[theme].textColor;
      chart.options.plugins.tooltip.bodyColor = colorSchemes[theme].textColor;

      // Update scales if they exist
      if (chart.options.scales) {
        if (chart.options.scales.x) {
          chart.options.scales.x.ticks.color = colorSchemes[theme].textColor;
          chart.options.scales.x.grid.color =
            theme === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)";
        }
        if (chart.options.scales.y) {
          chart.options.scales.y.ticks.color = colorSchemes[theme].textColor;
          chart.options.scales.y.grid.color =
            theme === "dark"
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)";
        }
      }

      // Update the chart
      chart.update();
    }
  }
});
