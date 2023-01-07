(function() {
  // "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar-example2 .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 185
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Header fixed top on scroll
   */
  let header = select('#header')
  let selectProductsHeader = select('#navbar-example2')
  if (selectProductsHeader) {
    let headerOffset = selectProductsHeader.offsetTop
    let nextElement = selectProductsHeader.nextElementSibling
    const headerFixed = () => {
      if ((headerOffset - window.scrollY - header.offsetHeight) <= 0) {
        selectProductsHeader.classList.add('fixed-top')
        selectProductsHeader.classList.add('scrolled-offset')
        nextElement.classList.add('scrolled-offset-max')
      } else {
        selectProductsHeader.classList.remove('fixed-top')
        selectProductsHeader.classList.remove('scrolled-offset')
        nextElement.classList.remove('scrolled-offset-max')
      }
    }
    window.addEventListener('load', headerFixed)
    onscroll(document, headerFixed)
  }

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let selectProductsHeader = select('#navbar-example2')
    let offset = header.offsetHeight + (selectProductsHeader?.offsetHeight || 0)
    console.log(header.offsetHeight, selectProductsHeader?.offsetHeight, offset)

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Apply Now fixed bottom button
   */
   let fixedBottom = select('.fixed-bottom')
   if (fixedBottom) {
     const hideFixedBottom = () => {
       if (window.scrollY < 200 || window.scrollY > 2000) {
        fixedBottom.classList.add('active')
       } else {
        fixedBottom.classList.remove('active')
       }
     }
     window.addEventListener('load', hideFixedBottom)
     onscroll(document, hideFixedBottom)
   }
 
  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    try { select('body').classList.toggle('overflow-hidden') } catch (e) {}
    try { 
      let productNavClasses = select('#navbar-example2').classList
      if (productNavClasses?.value.includes('scrolled-offset')) {
        productNavClasses.toggle('fixed-top')
      }
    } catch (e) { console.log(e) }
    try { select('.cpal-bottom-acont').classList.toggle('fixed-bottom') } catch (e) {}
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
     * Treatments slider
  */
  new Swiper('.treatment-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 2000,
      disableOnInteraction: false
    },
    slidesPerView: 2,
        spaceBetween: 10,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        },
  });

  // Load Terms from dedicated HTML file
  fetch('terms.html')
  .then(res => res.text())
  .then(text => {
      let modal = document.getElementById('terms-modal-content');
      if (modal) modal.innerHTML = text;
  }).catch(e => {console.log(e)})

  // Load Policy from dedicated HTML file
  fetch('policy.html')
  .then(res => res.text())
  .then(text => {
      let modal = document.getElementById('policy-modal-content');
      if (modal) modal.innerHTML = text;
  }).catch(e => {console.log(e)})
})()

function moreScheme(e){
   var moreBtn = document.getElementById('scheme-more-btn');
   var exampCont = document.getElementById('scheme-examples');

    if( exampCont && exampCont.style.display == 'block') {
      exampCont.style.display = 'none';
      moreBtn.innerHTML = 'Click here for more details <i class="bi bi-chevron-down"></i>'
    } else {
      exampCont.style.display = 'block';
      moreBtn.innerHTML = 'Click here for more details <i class="bi bi-chevron-up"></i>'
    }
}

const EMIInputs = [ 
  document.getElementById('calc-value1'), 
  document.getElementById('calc-value2'),
  document.getElementById('calc-value3'),
];

const EMISliders = [ 
  document.getElementById('calc-slider1'), 
  document.getElementById('calc-slider2'),
  document.getElementById('calc-slider3'),
];

function calcSlider(){
  console.log("calcSlider")
   var percent1 = (EMISliders[0].value / EMISliders[0].max)*100;
   var percent2 = ((EMISliders[1].value-EMISliders[1].min) / (EMISliders[1].max-EMISliders[1].min))*100;
   var percent3 = ((EMISliders[2].value-EMISliders[2].min) / (EMISliders[2].max-EMISliders[2].min))*100;

   EMISliders[0].style.background = `linear-gradient( to right, #1E75BB ${percent1}%, rgba(28, 117, 188, .1) ${percent1}%)`;
   EMISliders[1].style.background = `linear-gradient( to right, #1E75BB ${percent2}%, rgba(28, 117, 188, .1) ${percent2}%)`;
   EMISliders[2].style.background = `linear-gradient( to right, #1E75BB ${percent3}%, rgba(28, 117, 188, .1) ${percent3}%)`;

   EMIInputs[0].value = EMISliders[0].value;
   EMIInputs[1].value = EMISliders[1].value;
   EMIInputs[2].value = EMISliders[2].value;
   calculateEMI()
}

EMIInputs.forEach((inp, i) => {
  try {
    inp.addEventListener("input", () => updateSlider(i+1, inp.value))
  } catch {}
})

function updateSlider(sliderId, value) {
  console.log(sliderId, value)
  const slider = document.getElementById(`calc-slider${sliderId}`);
  const min = slider?.min || 0
  const max = slider?.max || value
  const percent = ((value - min) / (max - min))*100;
  console.log(min, max, value, percent)
  slider.style.background = `linear-gradient( to right, #1E75BB ${percent}%, rgba(28, 117, 188, .1) ${percent}%)`;
  slider.value = value
  calculateEMI()
}

function calculateEMI() {
  console.log("CalculatedEMI")
  const emi = document.getElementById('CalculatedEMI')
  emi.innerHTML = "₹" + Math.round(EMIInputs[0].value * (1/EMIInputs[1].value + EMIInputs[2].value/100));
}

const videoModal = document.getElementById('videoModal')
if (videoModal) {
  const videoElement = document.getElementById("WhyCarePalVideo")
  videoModal.addEventListener('shown.bs.modal', event => {
    videoElement.play()
  })
  
  videoModal.addEventListener('hidden.bs.modal', event => {
    videoElement.pause()
    videoElement.currentTime = 0;
  })
}