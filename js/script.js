"use strict";
window.addEventListener("scroll", function () {
  let nav = document.querySelector("nav");
  let windowposition = window.scrollY > 0;

  nav.classList.toggle("scrolling-active", windowposition);
});

const images = document.querySelectorAll(".classes-img");
console.log(images);
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
  console.log(entries);
  const [entry] = entries;
  if (!entry.isIntersecting) return
  entry.target.classList.remove('section-hidden')
  sectionObserver.unobserve(entry.target)
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
