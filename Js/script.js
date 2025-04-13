$(document).ready(function () {
  const subjects = [
    "Mathematics", "English Language", "Biology", "Physics", "Chemistry",
    "Economics", "Geography", "Agricultural Science", "Commerce", "Government",
    "Literature in English", "Civic Education", "Financial Accounting", "Christian Religious Studies"
  ];

  const grades = ["A1", "B2", "B3", "C4", "C5", "C6", "D7", "E8", "F9"];
  const subjectCount = 12;

  // Create select element
  function createSelect(options, placeholder, name) {
    const $select = $(`<select required name="${name}"></select>`);
    $select.append(`<option value="">-- ${placeholder} --</option>`);
    options.forEach(opt => {
      $select.append(`<option value="${opt}">${opt}</option>`);
    });
    return $select;
  }

  // Toast message
  function showToast(message) {
    const $toast = $("#toast");
    $toast.text(message).fadeIn(300);
    setTimeout(() => {
      $toast.fadeOut(300);
    }, 3000);
  }

  // Generate subject-grade rows
  function generateRows() {
    const $container = $("#subjectsContainer").empty();
    const subjectSelects = [];

    for (let i = 0; i < subjectCount; i++) {
      const $row = $('<div class="subject-grade-row"></div>');
      const $subject = createSelect(subjects, "Select Subject", `subject${i + 1}`);
      const $grade = createSelect(grades, "Select Grade", `grade${i + 1}`);
      subjectSelects.push($subject);

      $row.append($subject, $grade);
      $container.append($row);
    }

    // Subject uniqueness logic
    subjectSelects.forEach($select => {
      let previousValue = "";

      $select.on("change", function () {
        const newValue = $(this).val();

        // Re-enable previous
        if (previousValue) {
          subjectSelects.forEach($s => {
            if ($s[0] !== $select[0]) {
              $s.find(`option[value="${previousValue}"]`).prop("disabled", false);
            }
          });
        }

        // Disable new selection in others
        if (newValue) {
          subjectSelects.forEach($s => {
            if ($s[0] !== $select[0]) {
              $s.find(`option[value="${newValue}"]`).prop("disabled", true);
            }
          });
        }

        previousValue = newValue;
      });
    });
  }

  // Submit form
  $("#waecForm").on("submit", function (e) {
    e.preventDefault();

    const name = $("#studentName").val();
    const address = $("#studentAddress").val();
    const subjectGradeList = [];

    $(".subject-grade-row").each(function () {
      const subject = $(this).find('select[name^="subject"]').val();
      const grade = $(this).find('select[name^="grade"]').val();
      if (subject && grade) {
        subjectGradeList.push(`${subject}: ${grade}`);
      }
    });

    const entry = { name, address, results: subjectGradeList
