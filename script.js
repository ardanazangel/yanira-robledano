gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);

const rellax = new Rellax('.rellax');

const hero = document.querySelector(".hero"),
  heroTitle = hero.querySelectorAll(".hero-title > h1");

let lenis;

function initLenis() {
  lenis = new Lenis({
    autoRaf: true,
  });

  // Llamada inicial para detener el scroll al cargar
  lenis.stop();

  window.scrollTo(0, 0);

  // Listen for the scroll event and log the event data
  lenis.on("scroll", (e) => {
    // Aquí puedes manejar los eventos de scroll
  });

  // Activa el scroll después de 5 segundos
  setTimeout(() => {
    lenis.start();
  }, 2750);

  // Loop de animación para Lenis
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

const settings = {
  isEnabled: false,
  count: 0,
  time: 50,
  isMobile: /Mobi|Android/i.test(navigator.userAgent),
};

let isMouseActive = false;

// Verificamos si las imágenes existen y las precargamos
const images = [
  '/imgs/1.jpg',
  '/imgs/2.jpg',
  '/imgs/3.jpg',
  '/imgs/4.jpg',
  '/imgs/5.jpg',
  '/imgs/6.jpg',
  '/imgs/7.jpg',
  '/imgs/8.jpg',
  '/imgs/9.jpg',
  '/imgs/10.jpg'
].map(src => {
  const img = new Image();
  img.src = src;
  return src;
});

const calcIndx = (length) => {
  settings.count++;
  if (settings.count >= length) settings.count = 0;
  return settings.count;
};

const preloadImages = () => {
  images.forEach(src => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    link.onload = () => console.log(`Imagen cargada: ${src}`);
    link.onerror = () => console.error(`Error al cargar: ${src}`);
    document.head.appendChild(link);
  });
};

const animateImages = (x, y) => {
  if (!isMouseActive) return;

  const image = document.createElement("img");
  const imageSize = 25;

  const countIndx = calcIndx(images.length);
  image.classList.add("hero-media");
  image.src = images[countIndx];
  
  // Manejo de errores de carga
  image.onerror = () => {
    console.error(`Error al cargar la imagen: ${images[countIndx]}`);
    hero.removeChild(image);
  };

  image.style.width = `${(imageSize / 3) * 2}vw`;
  image.style.height = `${imageSize}vw`;
  image.style.position = "absolute";
  image.style.top = `${y - (imageSize)/10}px`;
  image.style.left = `${x - (imageSize)/10}px`;

  hero.appendChild(image);

  const randomDeg = Math.floor(Math.random() * 15);

  setTimeout(() => {
    image.style.transform = `scale(1) rotate(${randomDeg}deg)`;
  }, 100);

  setTimeout(() => {
    image.style.opacity = 0;
    image.style.filter = "blur(5px)";
    image.style.transform = "scale(0.25)";
  }, 1000);

  setTimeout(() => {
    if (image.parentNode === hero) {
      hero.removeChild(image);
    }
  }, 1250);
};

const autoAnimateImages = () => {
  if (!settings.isMobile) return;
  setInterval(() => {
    const x = Math.random() * window.innerWidth*2;
    const y = Math.random() * window.innerHeight;
    animateImages(x, y);
  }, 100);
};

// Evento del mouse
hero.addEventListener("mousemove", (event) => {
  if (!settings.isMobile && !settings.isEnabled && isMouseActive) {
    settings.isEnabled = true;

    setTimeout(() => {
      settings.isEnabled = false;
    }, settings.time);

    animateImages(event.pageX, event.pageY);
  }
});

function loader() {
  const tl = gsap.timeline({});
}

function titleMove() {
  gsap.to('.logo', {
    ScrollTrigger: {
      trigger: '.hero-wrapper',
      start: 'top 25%',
      end: 'bottom',
      scrub: true,
    },
    y: '100%',
  })
}

function imgAboutMove() {
  gsap.to(".img-yanira", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "top 50%",
      end: "bottom",
      scrub: 1,
    },
    y: '-1px',
    rotation: 45,
  });
}

function splitTextToWords(selector) {
  const element = document.querySelector(selector);
  const text = element.innerText;
  element.innerHTML = "";
  
  text.split(" ").forEach(word => {
    const span = document.createElement("span");
    span.innerText = word;
    element.appendChild(span);
    element.appendChild(document.createTextNode(" "));
  });
}

function splitTextToLines(selector) {
  const element = document.querySelector(selector);
  const text = element.innerText;
  element.innerHTML = "";
  
  text.split("\n").forEach(line => {
    const span = document.createElement("span");
    span.innerText = line;
    span.style.display = "block";
    element.appendChild(span);
  });
}

splitTextToWords('h1')
const wordTitles = document.querySelectorAll('h1 span')

function textStagger() {
  gsap.from("h1 span", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "-70%",
      end: "bottom ",
      toggleActions: "restart pause resume reset",
    },
    delay: 0.2,
    y: '100%',
    opacity: 0,
    stagger: 0.1,
    duration: 0.8,
    ease: CustomEase.create("custom", "0.22, 1, 0.36, 1"),
  });
}

function changeBackgroundHover() {
  const linkElements = document.querySelectorAll('.works-links');
  const navTextColor = document.querySelector('nav');
  const titleSection = document.querySelector('.big-letters');

  linkElements.forEach(linkElement => {
    linkElement.addEventListener('mouseenter', () => {
      document.body.style.backgroundColor = '#fafafa';
      navTextColor.style.color = '#2835f8';
      titleSection.style.color = '#2835f8';
    });

    linkElement.addEventListener('mouseleave', () => {
      document.body.style.backgroundColor = '#2835f8';
      navTextColor.style.color = '#fafafa';
      titleSection.style.color = '#fafafa';
    });
  });
}

window.onload = () => {
  window.scrollTo(0, 0);
  console.log('Iniciando carga de imágenes...');
  preloadImages();
  autoAnimateImages();

  setTimeout(() => {
    isMouseActive = true;
    console.log('Mouse activado');
  }, 3000);

  changeBackgroundHover();
  textStagger();
  imgAboutMove();
  initLenis();
  loader();
};