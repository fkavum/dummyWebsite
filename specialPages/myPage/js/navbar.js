// Shrink the navbar
let nav = document.querySelector('.main-nav');
let brandTitle = document.querySelector('.brand-title');
let position = 0;

window.addEventListener('scroll', function () {
    //console.log(position);
    if (position < window.pageYOffset + 1) {
        position = window.pageYOffset;

        if (window.pageYOffset < 150) {
            bigNav();
        } else if (window.pageYOffset < 400) {
            smallNav();
        } else {
            closeNav();
        }
    } else {
        position = window.pageYOffset;

        if (window.pageYOffset < 150) {
            bigNav();
        } else if (window.pageYOffset < 400) {
            smallNav();
        } else {
            smallNav();
        }
    }
});

function bigNav() {
    nav.classList = 'main-nav';
    brandTitle.classList = 'brand-title';
}

function smallNav() {
    nav.classList = 'main-nav small-nav';
    brandTitle.classList = 'brand-title small-brand-title';
}

function closeNav() {
    nav.classList = 'main-nav small-nav up';
}

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