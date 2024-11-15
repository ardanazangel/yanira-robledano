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

let isMouseActive = false; // Variable para controlar las interacciones con el mouse

const images = [
  "/imgs/yanira.png",
  "/imgs/2.jpg",
  "/imgs/3.jpg",
  "/imgs/4.jpg",
  "/imgs/5.jpg",
  "/imgs/6.jpg",
  "/imgs/7.jpg",
  "/imgs/8.jpg",
  "/imgs/9.jpg",
  "/imgs/10.jpg",
];

const preloadImages = () => {
  for (let i = 0; i < images.length; i++) {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = images[i];
    document.head.appendChild(link);
  }
};

const calcIndx = (length) => {
  settings.count++;
  if (settings.count >= length) settings.count = 0;
  return settings.count;
};

const animateImages = (x, y) => {
  if (!isMouseActive) return; // Si el mouse está inactivo, no ejecuta la animación

  const image = document.createElement("img");
  const imageSize = 25;

  const countIndx = calcIndx(images.length);
  image.classList.add("hero-media");
  image.setAttribute("src", images[countIndx]);

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
    hero.removeChild(image);
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

window.onload = () => {
  window.scrollTo(0, 0);

  preloadImages();
  autoAnimateImages();

  // Desactiva interacciones con el mouse al inicio
  setTimeout(() => {
    isMouseActive = true; // Activa el mouse después de dos segundos
  }, 3000);

};

function loader() {
  const tl = gsap.timeline({});


}

function titleMove (){
  gsap.to('.logo',{
    ScrollTrigger:{
      trigger:'.hero-wrapper',
      start: 'top 25%',
      end: 'bottom',
      scrub: true,
    },
    y:'100%',
  })
}

function imgAboutMove (){
  gsap.to(".img-yanira", {
    scrollTrigger: {
      trigger: ".about-section",       // El elemento que disparará la animación
      start: "top 50%",      // Cuando el top del elemento alcance el 80% de la ventana
      end: "bottom",        // Termina cuando el top alcanza el 20% de la ventana
      scrub: 1,           // Suaviza la animación mientras haces scroll
    },
    y: '-1px',                  // Mueve el elemento 300px a la derecha
    rotation: 45,
  });
}

function splitTextToWords(selector) {
  const element = document.querySelector(selector);
  const text = element.innerText;
  element.innerHTML = ""; // Limpiar el contenido original
  
  // Dividir el texto en palabras y envolver cada una en un span
  text.split(" ").forEach(word => {
    const span = document.createElement("span");
    span.innerText = word; // Añadir la palabra sin espacio adicional
    element.appendChild(span);
    element.appendChild(document.createTextNode(" ")); // Añadir el espacio manualmente
  });
}

function splitTextToLines(selector) {
  const element = document.querySelector(selector);
  const text = element.innerText;
  element.innerHTML = ""; // Limpiar el contenido original
  
  // Dividir el texto en líneas y envolver cada una en un span
  text.split("\n").forEach(line => {
    const span = document.createElement("span");
    span.innerText = line; // Añadir la línea de texto
    span.style.display = "block"; // Hacer que cada línea se muestre en bloque
    element.appendChild(span);
  });
}

splitTextToWords('h1')
const wordTitles = document.querySelectorAll('h1 span')

function textStagger () {
  gsap.from("h1 span", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "-70%",   // Inicia cuando la sección alcanza el 40% de la pantalla
      end: "bottom ",  // Termina cuando la sección sale de la pantalla
      toggleActions: "restart pause resume reset", // Reinicia la animación al salir y vuelve a iniciarla al entra
    },
    delay:0.2,
    y: '100%',              // Comienza 100px abajo
    opacity: 0,          // Comienza invisible
    stagger: 0.1,        // Intervalo de tiempo entre cada palabra
    duration: 0.8,         // Duración de cada animación
    ease: CustomEase.create("custom", "0.22, 1, 0.36, 1"),
  });
}

function changeBackgroundHover() {
  const linkElements = document.querySelectorAll('.works-links'); // Selecciona todos los elementos con la clase 'works-links'
  const navTextColor = document.querySelector('nav'); // Selecciona el elemento 'nav'
  const titleSection = document.querySelector('.big-letters'); // Selecciona el elemento 'nav'


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


changeBackgroundHover()
textStagger()
imgAboutMove()
initLenis();

loader();


