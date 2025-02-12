'use strict';

window.addEventListener('load', function () {
  const preloader = document.getElementById('preloader');

  // Hide the preloader
  preloader.style.display = 'none';

  // Initialize AOS after the preloader is hidden
  AOS.init();
});

// Commenting out the toast functionality
/*
const toast = document.createElement('div');
toast.id = 'toast';
toast.textContent = 'Loading... Check your internet connection if this takes too long.';
document.body.appendChild(toast);

// Show toast after 2s if page isn't loaded
const loadingTimeout = setTimeout(() => {
    if (document.readyState !== 'complete') {
        toast.classList.add('show');
    }
}, 2000);

// Remove toast on page load
window.addEventListener('load', () => {
    clearTimeout(loadingTimeout);
    if (toast.classList.contains('show')) {
        toast.classList.remove('show');
    }
});

// Add event listener for animation end
toast.addEventListener('animationend', (e) => {
    if (e.animationName === 'fadeOut') {
        toast.classList.remove('show');
    }
});
*/

// Hide preloader if page is not fully loaded after 2 seconds
const preloaderTimeout = setTimeout(() => {
  if (document.readyState !== 'complete') {
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
    AOS.init();
  }
}, 2000);

// Immediately hide preloader if page is fully loaded before 2 seconds
window.addEventListener('load', () => {
  clearTimeout(preloaderTimeout);
  const preloader = document.getElementById('preloader');
  preloader.style.display = 'none';
  AOS.init();
});







// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Function to activate the page based on the stored value or default
function activatePage(pageName) {
  for (let i = 0; i < pages.length; i++) {
    if (pageName === pages[i].dataset.page) {
      pages[i].classList.add("active");
      navigationLinks[i].classList.add("active");
      window.scrollTo(0, 0);
    } else {
      pages[i].classList.remove("active");
      navigationLinks[i].classList.remove("active");
    }
  }
}

// Check if there's a stored active page in localStorage
const savedPage = localStorage.getItem("activePage");
if (savedPage) {
  activatePage(savedPage);
} else {
  // Default to the first page if no saved page
  activatePage(pages[0].dataset.page);
}

// Add event to all nav links
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const pageName = this.innerHTML.toLowerCase();

    // Save the active page to localStorage
    localStorage.setItem("activePage", pageName);

    // Activate the clicked page
    activatePage(pageName);

    // Check if the clicked link is the "Contact" link
    if (pageName === "contact") {
      // Add the "active" class to the sidebar
      sidebar.classList.add("active");
    } else {
      sidebar.classList.remove("active");
    }
  });
}




// Download CV
function downloadCV() {
  var link = document.createElement('a');
  link.setAttribute('href', './Japheth-Jerry-Cv.pdf');
  link.setAttribute('download', 'Japheth-Jerry-Cv.pdf');
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


document.addEventListener('DOMContentLoaded', () => {
  const timelineTitles = document.querySelectorAll('.timeline-item-title');
  const timelineDescriptions = document.querySelectorAll('.timeline-description');

  timelineTitles.forEach((title) => {
    title.addEventListener('click', () => {
      const parentItem = title.closest('.timeline-item');
      const description = parentItem.querySelector('.timeline-description');

      // Check if the clicked item is already active
      const isCurrentlyActive = title.classList.contains('active');

      // Remove active state from all items
      timelineTitles.forEach(t => t.classList.remove('active'));
      timelineDescriptions.forEach(desc => desc.classList.remove('show'));

      // If the clicked item wasn't already active, activate it
      if (!isCurrentlyActive) {
        title.classList.add('active');
        description.classList.add('show');
      }
    });
  });
});




const avatarBox = document.querySelector('.avatar-box');

function flipAvatar() {
  avatarBox.classList.toggle('flipped');
}

// Initial auto-flip setup
setInterval(flipAvatar, 2000);