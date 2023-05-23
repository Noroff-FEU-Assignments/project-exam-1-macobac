document.addEventListener("DOMContentLoaded", function() {
    var faqDivs = document.querySelectorAll(".faq-div");

    faqDivs.forEach(function(div) {
      div.addEventListener("click", function() {
        this.classList.toggle("active");
      });
    });
  });
