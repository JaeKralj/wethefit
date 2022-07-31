"use strict";

let nav = document.querySelector("nav");
let toggler = document.querySelector(".my-toggler");

toggler.addEventListener("click", () => {
  let togglerExpanded = toggler.getAttribute("aria-expanded");
  togglerExpanded === "true"
    ? nav.classList.add("all-black")
    : nav.classList.remove("all-black");
});

window.addEventListener("scroll", function () {
  let windowposition = window.scrollY > 0;
  let windowpos2 = this.window.screenY <= 0;

  nav.classList.toggle("scrolling-active", windowposition);
  nav.classList.toggle("not-scrolling", windowpos2);
});

const images = document.querySelectorAll(".classes-img");

let imageOptions = {
  root: null,
  threshold: 0.2,
};

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const image = entry.target;
    const newUrl = image.getAttribute("data-src");
    image.src = newUrl;
    image.addEventListener("load", (e) => {
      const image = e.target;
      image.classList.remove("lazy-img");
    });
    imageObserver.unobserve(image);
  });
}, imageOptions);
images.forEach((image) => {
  imageObserver.observe(image);
});

const sections = document.querySelectorAll(".section");

function sectionObserverf(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section-hidden");
  sectionObserver.unobserve(entry.target);
}

const sectionOptions = {
  root: null,
  threshold: 0.1,
};

const sectionObserver = new IntersectionObserver(
  sectionObserverf,
  sectionOptions
);

sections.forEach((section) => sectionObserver.observe(section));
