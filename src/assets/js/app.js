  'use strict'

  // smooth scroll with pure JS
  const links = document.querySelectorAll("a");
  for (let i = 0; i < links.length; i++) {
    if (links[i].hash) {
      links[i].addEventListener("click", smoothScroll);
    }
  }

  function smoothScroll(e) {
    e.preventDefault();
    if (e.target.hasAttribute("href")) {
      var id = e.target.hash;
    } else if (e.target.parentElement.hasAttribute("href")) {
      var id = e.target.parentElement.hash;
    } else {
      var id = e.target.parentElement.parentElement.hash;
    }
    const target = document.querySelector(id);
    const targetPosition = target.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;

    let duration;
    if (Math.abs(distance) < 1500) {
      duration = 700;
    } else if (1500 < Math.abs(distance) && Math.abs(distance) < 3500) {
      duration = 1000;
    } else if (Math.abs(distance) > 3500) {
      duration = 1400;
    }
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) {
        startTime = currentTime;
      }
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) {
        return c / 2 * t * t + b;
      }
      t--;
      return -c / 2 * (t * (t - 2) - 1) + b;
    }
    requestAnimationFrame(animation);
  }

  // Appearence of button that returns page to the top
  window.addEventListener("scroll", backBtn);

  function backBtn() {
    let position = window.pageYOffset;
    if (position > 1375) {
      document.querySelector(".gotop-btn").style.transform = "translateX(0)";
    }
    if (position < 1375) {
      document.querySelector(".gotop-btn").style.transform = "translateX(150px)";
    }
  }