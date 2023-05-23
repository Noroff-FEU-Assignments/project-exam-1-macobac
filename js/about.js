document.addEventListener("DOMContentLoaded", () => {
    const faqDivs = document.querySelectorAll(".faq-div");

    faqDivs.forEach(div => {
        div.addEventListener("click", () => {
            div.classList.toggle("active");
        });
    });
});
