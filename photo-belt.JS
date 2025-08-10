document.addEventListener("DOMContentLoaded", () => {
  const slider = document.getElementById("photoBelt");
  const navLinks = document.querySelectorAll("#photoNav a");
  const slides = slider.querySelectorAll("img");

  // Scroll wheel - only when hovering over the belt
  slider.addEventListener("wheel", (e) => {
    if (e.target.closest("#photoBelt")) {
      e.preventDefault();
      slider.scrollLeft += e.deltaY;
    }
  }, { passive: false });

  // Arrow key navigation
  document.addEventListener("keydown", (e) => {
    const slideWidth = slider.clientWidth;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      slider.scrollLeft += slideWidth;
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      slider.scrollLeft -= slideWidth;
    }
  });

  // Highlight active nav dot
  slider.addEventListener("scroll", () => {
    const scrollPos = slider.scrollLeft;
    const slideWidth = slider.clientWidth;

    slides.forEach((slide, index) => {
      if (
        scrollPos >= index * slideWidth - slideWidth / 2 &&
        scrollPos < (index + 1) * slideWidth - slideWidth / 2
      ) {
        navLinks.forEach(link => link.classList.remove("active"));
        navLinks[index].classList.add("active");
      }
    });
  });
});
