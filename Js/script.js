$(function () {
  const subjects = "Mathematics,English Language,Biology,Physics,Chemistry,Economics,Geography,Agricultural Science,Commerce,Government,Literature in English,Civic Education,Financial Accounting,Christian Religious Studies".split(",");
  const grades = "A1,B2,B3,C4,C5,C6,D7,E8,F9".split(",");

  // Generate subject-grade dropdowns using the template
  for (let i = 1; i <= 12; i++) {
    const $clone = $(".template").clone().removeClass("template").show();
    $clone.find(".subject-select").attr("name", "subject" + i);
    $clone.find(".grade-select").attr("name", "grade" + i);

    // Fill subject options
    $clone.find(".subject-select").append('<option value="">-- Select Subject --</option>');
    for (let j = 0; j < subjects.length; j++) {
      $clone.find(".subject-select").append('<option value="' + subjects[j] + '">' + subjects[j] + '</option>');
    }

    $("#messageBox")
  .text("Your WAEC result has been submitted successfully!")
  .slideDown()
  .delay(3000)
  .slideUp();

    // Fill grade options
    $clone.find(".grade-select").append('<option value="">-- Select Grade --</option>');
    for (let j = 0; j < grades.length; j++) {
      $clone.find(".grade-select").append('<option value="' + grades[j] + '">' + grades[j] + '</option>');
    }

    $("#subjectsContainer").append($clone);
  }

  // (keep the rest of your script unchanged: form submission, loadEntries, delete, tab switching)
});
