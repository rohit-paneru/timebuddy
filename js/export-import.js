/**
 * Export/Import Module
 * Handles exporting and importing schedule data
 */

document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const exportPdfBtn = document.getElementById("exportPdfBtn");
  const exportCsvBtn = document.getElementById("exportCsvBtn");
  const importFileInput = document.getElementById("importFile");

  // Initialize export/import functionality
  initExportImport();

  /**
   * Initialize export/import functionality
   */
  function initExportImport() {
    // Add event listeners
    if (exportPdfBtn) {
      exportPdfBtn.addEventListener("click", exportToPdf);
    }

    if (exportCsvBtn) {
      exportCsvBtn.addEventListener("click", exportToCsv);
    }

    if (importFileInput) {
      importFileInput.addEventListener("change", importFromFile);
    }
  }

  /**
   * Export schedule to PDF
   */
  function exportToPdf() {
    // Check if jsPDF is available
    if (typeof jspdf === "undefined") {
      // Load jsPDF dynamically
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      script.onload = function () {
        // Load html2canvas
        const html2canvasScript = document.createElement("script");
        html2canvasScript.src =
          "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
        html2canvasScript.onload = function () {
          // Now both libraries are loaded, generate PDF
          generatePdf();
        };
        document.head.appendChild(html2canvasScript);
      };
      document.head.appendChild(script);
    } else {
      // jsPDF is already loaded
      generatePdf();
    }
  }

  /**
   * Generate PDF from schedule data
   */
  function generatePdf() {
    // Show loading message
    alert("Preparing PDF... This may take a moment.");

    // Get user data
    const userData = getUserData();

    // Create a new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text("Placement Prep Timetable", 105, 15, { align: "center" });

    // Add current date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 22, {
      align: "center",
    });

    // Add daily schedule
    doc.setFontSize(14);
    doc.text("Daily Schedule", 14, 30);

    let yPos = 40;

    // Loop through each day
    for (const day in scheduleData.dailySchedule) {
      // Check if we need a new page
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      // Add day header
      doc.setFontSize(12);
      doc.setTextColor(0, 102, 204);
      doc.text(day.charAt(0).toUpperCase() + day.slice(1), 14, yPos);
      yPos += 6;

      // Get schedule for this day
      const daySchedule =
        userData.dailySchedule && userData.dailySchedule[day]
          ? userData.dailySchedule[day]
          : scheduleData.dailySchedule[day];

      // Add tasks
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);

      daySchedule.forEach((task) => {
        // Check if we need a new page
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }

        // Add task details
        doc.text(`${task.time}`, 14, yPos);
        doc.text(`${task.activity}`, 50, yPos);

        // Add completion status
        if (task.completed) {
          doc.setTextColor(0, 153, 0);
          doc.text("✓", 150, yPos);
          doc.setTextColor(0, 0, 0);
        }

        yPos += 5;
      });

      yPos += 5;
    }

    // Add weekly plan summary
    if (yPos > 200) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.text("Weekly Plan Summary", 14, yPos);
    yPos += 10;

    doc.setFontSize(10);
    scheduleData.weeklyPlan[0].weeks.forEach((week, index) => {
      // Check if we need a new page
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      doc.setTextColor(0, 102, 204);
      doc.text(`${week.week}: ${week.focus}`, 14, yPos);
      yPos += 5;

      doc.setTextColor(0, 0, 0);
      yPos += 5;
    });

    // Add monthly goals
    if (yPos > 200) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.text("Monthly Goals", 14, yPos);
    yPos += 10;

    doc.setFontSize(10);
    for (const month in scheduleData.monthlyGoals) {
      // Check if we need a new page
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }

      const monthData = scheduleData.monthlyGoals[month];

      doc.setTextColor(0, 102, 204);
      doc.text(monthData.title, 14, yPos);
      yPos += 5;

      doc.setTextColor(0, 0, 0);

      // Add goal items
      for (const key in monthData) {
        if (key !== "title") {
          // Check if we need a new page
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }

          const goalTitle =
            key.charAt(0).toUpperCase() +
            key
              .slice(1)
              .replace(/([A-Z])/g, " $1")
              .trim();
          doc.text(`${goalTitle}: ${monthData[key]}`, 20, yPos);
          yPos += 5;
        }
      }

      yPos += 5;
    }

    // Save the PDF
    doc.save("placement-prep-timetable.pdf");
  }

  /**
   * Export schedule to CSV
   */
  function exportToCsv() {
    // Get user data
    const userData = getUserData();

    // Create CSV content
    let csvContent = "Day,Time,Activity,Notes,Completed\n";

    // Loop through each day
    for (const day in scheduleData.dailySchedule) {
      // Get schedule for this day
      const daySchedule =
        userData.dailySchedule && userData.dailySchedule[day]
          ? userData.dailySchedule[day]
          : scheduleData.dailySchedule[day];

      // Add tasks
      daySchedule.forEach((task) => {
        const dayName = day.charAt(0).toUpperCase() + day.slice(1);
        const time = task.time.replace(/,/g, ""); // Remove commas to avoid CSV issues
        const activity = task.activity.replace(/,/g, ""); // Remove commas
        const notes = task.notes.replace(/,/g, ""); // Remove commas
        const completed = task.completed ? "Yes" : "No";

        csvContent += `${dayName},${time},${activity},${notes},${completed}\n`;
      });
    }

    // Create a blob and download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create download link
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "placement-prep-timetable.csv");
    link.style.visibility = "hidden";

    // Add to document, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  /**
   * Import schedule from file
   * @param {Event} e - The change event
   */
  function importFromFile(e) {
    const file = e.target.files[0];

    if (!file) return;

    // Check file extension
    const fileExt = file.name.split(".").pop().toLowerCase();

    if (fileExt !== "json") {
      alert("Please select a JSON file.");
      return;
    }

    // Read file
    const reader = new FileReader();

    reader.onload = function (event) {
      try {
        // Parse JSON
        const importedData = JSON.parse(event.target.result);

        // Validate data
        if (!importedData.dailySchedule) {
          throw new Error(
            "Invalid data format. Missing dailySchedule property."
          );
        }

        // Confirm import
        if (
          confirm(
            "Are you sure you want to import this schedule? This will replace your current schedule."
          )
        ) {
          // Get user data
          const userData = getUserData();

          // Update daily schedule
          userData.dailySchedule = importedData.dailySchedule;

          // Save user data
          saveUserData(userData);

          // Refresh the page
          alert("Schedule imported successfully. The page will now reload.");
          location.reload();
        }
      } catch (error) {
        alert(`Error importing file: ${error.message}`);
      }
    };

    reader.readAsText(file);
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
