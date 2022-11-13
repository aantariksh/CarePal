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
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
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
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

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
   * Back to top button
   */
   let fixedBottom = select('.fixed-bottom')
   if (fixedBottom) {
     const hideFixedBottom = () => {
       if (window.scrollY > 2000) {
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


  // new PureCounter();

})()


function toggleVideo(){
  

  var videoPlayer = document.getElementById("video-player");

  if(videoPlayer.paused){
    videoPlayer.play();
    document.getElementById('vid-play-btn').style.display = "none";
  }else{
    videoPlayer.pause();
    document.getElementById('vid-play-btn').style.display = "block";
    videoPlayer.poster = "../img/homepage/work/video-thumbnail.png";
  }
} 


function moreScheme(e){
   var moreBtn = document.getElementById('scheme-more-btn');
   var exampCont = document.getElementById('scheme-examples');
  
    if( exampCont && exampCont.style.display == 'block')    
      exampCont.style.display = 'none';
    else 
      exampCont.style.display = 'block';
}

function calcSlider(){
   var mySlider1 = document.getElementById('calc-slider1');
   var mySlider2 = document.getElementById('calc-slider2');
   var mySlider3 = document.getElementById('calc-slider3');

   var percent1 = (mySlider1.value / mySlider1.max)*100;
   var percent2 = ((mySlider2.value-mySlider2.min) / (mySlider2.max-mySlider2.min))*100;
   var percent3 = ((mySlider3.value-mySlider3.min) / (mySlider3.max-mySlider3.min))*100;

   mySlider1.style.background = `linear-gradient( to right, #1E75BB ${percent1}%, rgba(28, 117, 188, .1) ${percent1}%)`;
   mySlider2.style.background = `linear-gradient( to right, #1E75BB ${percent2}%, rgba(28, 117, 188, .1) ${percent2}%)`;
   mySlider3.style.background = `linear-gradient( to right, #1E75BB ${percent3}%, rgba(28, 117, 188, .1) ${percent3}%)`;

   document.getElementById('calc-value1').innerText = mySlider1.value;
   document.getElementById('calc-value2').innerText = mySlider2.value;
   document.getElementById('calc-value3').innerText = mySlider3.value;
}