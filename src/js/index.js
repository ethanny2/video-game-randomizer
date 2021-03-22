import "../sass/main-style.scss";
import "intersection-observer";
let counter = 0;
document.addEventListener("DOMContentLoaded", function (event) {
  // Your code to run since DOM is loaded and ready
  createObserver();
});

function createObserver() {
  const sliceArr = document.getElementsByClassName("slice");
  let observer;
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: [0.5]
  };
  observer = new IntersectionObserver(handleIntersect, options);
  for (let i = 0; i < sliceArr.length; i++) {
    observer.observe(sliceArr[i]);
  }
}

function handleIntersect(entries, observer) {
  // const cmd = document.getElementsByClassName("typing")[0];
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0.5) {
      /*Add animation class */
      const { target } = entry;
      counter ? target.classList.add("fadeLeft") : target.classList.add("fadeRight");
      // Only happens once
      observer.unobserve(target);
      counter++;
    }
  });
}
