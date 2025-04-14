$(document).ready(function () {
    const subjects = [
      "Mathematics", "English Language", "Biology", "Physics", "Chemistry", 
      "Economics", "Geography", "Agricultural Science", "Commerce", "Government", 
      "Literature in English", "Civic Education", "Financial Accounting", "Christian Religious Studies"
    ];
  
    const grades = ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9"];
    const subjectCount = 12;
  
    // Generate subject-grade rows
    for (let i = 0; i < subjectCount; i++) {
      const $row = $('<div class="subject-grade-row"></div>');
  
      const $subjectSelect = $('<select required></select>')
        .attr("name", `subject${i + 1}`)
        .append(`<option value="">-- Select Subject --</option>`)
        .append(subjects.map(sub => `<option value="${sub}">${sub}</option>`));
  
      const $gradeSelect = $('<select required></select>')
        .attr("name", `grade${i + 1}`)
        .append(`<option value="">-- Select Grade --</option>`)
        .append(grades.map(grade => `<option value="${grade}">${grade}</option>`));
  
      $row.append($subjectSelect, $gradeSelect);
      $("#subjectsContainer").append($row);
    }
  
    // Submit form
    $("#waecForm").on("submit", function (e) {
      e.preventDefault();
  
      const name = $("#studentName").val();
      const address = $("#studentAddress").val();
      const subjectGradeList = [];
  
      for (let i = 0; i < subjectCount; i++) {
        const subject = $(`select[name="subject${i + 1}"]`).val();
        const grade = $(`select[name="grade${i + 1}"]`).val();
        if (subject && grade) {
          subjectGradeList.push(`${subject}: ${grade}`);
        }
      }
  
      const newEntry = { name, address, results: subjectGradeList };
      const entries = JSON.parse(localStorage.getItem("waecEntries") || "[]");
      entries.push(newEntry);
      localStorage.setItem("waecEntries", JSON.stringify(entries));
  
      alert("Result submitted successfully!");
      this.reset();
      loadEntries();
    });
  
    // Load entries
    function loadEntries() {
      const entries = JSON.parse(localStorage.getItem("waecEntries") || "[]");
      const $tbody = $("#entriesTable tbody");
      $tbody.empty();
  
      entries.forEach((entry, index) => {
        const $row = $(`
          <tr>
            <td>${entry.name}</td>
            <td>${entry.address}</td>
            <td>${entry.results.join("<br>")}</td>
            <td><button class="delete-btn" data-index="${index}">Delete</button></td>
          </tr>
        `);
        $tbody.append($row);
      });
    }
  
    // Delete entry
    $(document).on("click", ".delete-btn", function () {
      const index = $(this).data("index");
      if (confirm("Are you sure you want to delete this entry?")) {
        const entries = JSON.parse(localStorage.getItem("waecEntries") || "[]");
        entries.splice(index, 1);
        localStorage.setItem("waecEntries", JSON.stringify(entries));
        loadEntries();
      }
    });
  
    // Tab switching
    $(".tab-btn").click(function () {
      $(".tab-btn").removeClass("active");
      $(".tab-content").removeClass("active");
  
      $(this).addClass("active");
      $(`#${$(this).data("tab")}`).addClass("active");
  
      if ($(this).data("tab") === "adminTab") loadEntries();
    });
  
    // Load on page start
    loadEntries();
  });
  