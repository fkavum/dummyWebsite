// Simle Responsive Navbar Baby
// Shrink the navbar
let nav = document.querySelector('.main-nav');
let position = 0;

window.addEventListener('scroll', function () {
  //console.log(position);
  if (position < window.pageYOffset) {
    position = window.pageYOffset;

    if (window.pageYOffset < 150) {
      nav.classList = 'main-nav';
    } else if (window.pageYOffset < 400) {
      nav.classList = 'main-nav small-nav';
    } else {
      nav.classList = 'main-nav small-nav up';
    }
  } else {
    position = window.pageYOffset;

    if (window.pageYOffset < 150) {
      nav.classList = 'main-nav';
    } else if (window.pageYOffset < 400) {
      nav.classList = 'main-nav small-nav';
    } else {
      nav.classList = 'main-nav small-nav';
    }
  }
});

// Hamburger Menu
let toggleButton = document.getElementsByClassName('hamburger-button')[0];
const navbarTabs = document.getElementsByClassName('navbar-tabs')[0];
console.log(navbarTabs);

toggleButton.addEventListener('click', () => {
  navbarTabs.classList.toggle('hamburger-active');
});

window.addEventListener('click', function (e) {
  if (navbarTabs.classList.contains('hamburger-active')) {
    if (navbarTabs.contains(e.target) || toggleButton.contains(e.target)) {
      this.console.log('divdeyim');
    } else {
      navbarTabs.classList.toggle('hamburger-active');
    }
  }
});


// Scrolling



let scrollButton = document.querySelectorAll('.scroll-button');
let bodySection = document.querySelectorAll('.scroll-section');

scrollButton.forEach(function (element, index) {
  element.addEventListener('click', () => smoothScroll(bodySection[index]));
});

function smoothScroll(
  targetElem,
  speed = 0.5,
  acceleration = 1.75,
  speedLimit = 100
) {
  let currentScroll = window.pageYOffset;
  let targetPos = targetElem.getBoundingClientRect().top + currentScroll;
  let distanceToTarget = targetPos - currentScroll;

  let toTop = false;
  if (distanceToTarget < 0) {
    toTop = true;
    speed *= -1;
  }

  function scroll() {
    let currentScroll = window.pageYOffset;
    let targetPos = targetElem.getBoundingClientRect().top + currentScroll;
    let distanceToTarget = targetPos - currentScroll;
    if (distanceToTarget < speed && !toTop) {
      scrollBy(0, distanceToTarget);
    } else if (distanceToTarget > speed && toTop) {
      scrollBy(0, distanceToTarget);
    } else {
      scrollBy(0, speed);
      let speedToLimitSpeed = speedLimit - speed;
      let acceleratedSpeed = speed * acceleration;

      if (speedToLimitSpeed - speed > acceleratedSpeed)
        speed *= acceleration;
      else speed = speedLimit;

      if (toTop && distanceToTarget >= 0) return;
      requestAnimationFrame(scroll);
    }
  }
  scroll();
}


// coloring
(function () {
  //    'use strict';

  window.onscroll = function () {
    var scrollPosition =
      document.documentElement.scrollTop || document.body.scrollTop;

    bodySection.forEach(function (section, index) {
      if (section.offsetTop <= scrollPosition + 1) {
        document
          .querySelector('.scroll-active')
          .setAttribute('class', 'scroll-button');

        scrollButton[index].setAttribute('class', 'scroll-button scroll-active');
      }
    });
  };
})();