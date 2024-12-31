gsap.registerPlugin(CustomEase);
gsap.registerPlugin(ScrollTrigger);

barba.init({
  transitions: [
    {
      name: "default-transition",
      leave() {
        // create your stunning leave animation here
      },
      enter() {
        // create your amazing enter animation here
      },
    },
  ],
});

//const rellax = new Rellax(".rellax");

const hero = document.querySelector(".hero"),
  heroTitle = hero.querySelectorAll(".hero-title > h1");

let lenis;

function initLenis() {
  lenis = new Lenis({
    autoRaf: true,
  });

  lenis.start();
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

let isMouseActive = true; // Variable para controlar las interacciones con el mouse

const images = ["/imgs/landing-imgs/MadamaButterfly-Hero.webp"];

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
  image.style.top = `${y - imageSize / 10}px`;
  image.style.left = `${x - imageSize / 10}px`;

  hero.appendChild(image);

  const randomDeg = Math.floor(Math.random() * 15);

  setTimeout(() => {
    image.style.transform = `scale(1) rotate(${randomDeg * 2}deg)`;
  }, 100);

  setTimeout(() => {
    image.style.opacity = 0;
    //image.style.filter = "blur(5px)";
    //image.style.transform = "scale(0.25)";
  }, 1000);

  setTimeout(() => {
    hero.removeChild(image);
  }, 1250);
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

function titleMove() {
  gsap.to(".logo", {
    ScrollTrigger: {
      trigger: ".hero-wrapper",
      start: "top 25%",
      end: "bottom",
      scrub: true,
    },
    y: "100%",
  });
}

function imgAboutMove() {
  gsap.to(".img-yanira", {
    scrollTrigger: {
      trigger: ".about-section", // El elemento que disparará la animación
      start: "top 50%", // Cuando el top del elemento alcance el 80% de la ventana
      end: "bottom", // Termina cuando el top alcanza el 20% de la ventana
      scrub: 1, // Suaviza la animación mientras haces scroll
    },
    y: "25%", // Mueve el elemento 300px a la derecha
    rotation: 45,
  });
}

function splitTextToWords(selector) {
  const element = document.querySelector(selector);
  const text = element.innerText;
  element.innerHTML = ""; // Limpiar el contenido original

  // Dividir el texto en palabras y envolver cada una en un span
  text.split(" ").forEach((word) => {
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
  text.split("\n").forEach((line) => {
    const span = document.createElement("span");
    span.innerText = line; // Añadir la línea de texto
    span.style.display = "block"; // Hacer que cada línea se muestre en bloque
    element.appendChild(span);
  });
}

splitTextToWords("h1");
const wordTitles = document.querySelectorAll("h1 span");

function textStagger() {
  gsap.from("h1 span", {
    scrollTrigger: {
      trigger: ".about-section",
      start: "-70%", // Inicia cuando la sección alcanza el 40% de la pantalla
      end: "bottom ", // Termina cuando la sección sale de la pantalla
      toggleActions: "restart pause resume reset", // Reinicia la animación al salir y vuelve a iniciarla al entra
    },
    delay: 0.2,
    y: "100%", // Comienza 100px abajo
    opacity: 0, // Comienza invisible
    stagger: 0.1, // Intervalo de tiempo entre cada palabra
    duration: 0.8, // Duración de cada animación
    ease: CustomEase.create("custom", "0.22, 1, 0.36, 1"),
  });
}

function bigTextAnimation() {
  // Selecciona el contenedor de texto
  const textContainer = document.querySelector(".big-letters");

  // Obtén el texto original
  const originalText = textContainer.textContent;

  // Limpia el contenido del contenedor
  textContainer.textContent = "";

  // Divide el texto en letras y crea un span para cada una
  originalText.split("").forEach((letter) => {
    const span = document.createElement("span");
    span.textContent = letter; // Añade la letra al span
    span.style.display = "inline-block"; // Necesario para animaciones en GSAP
    textContainer.appendChild(span); // Añade el span al contenedor
  });

  // Selecciona todas las letras recién creadas
  const letters = textContainer.querySelectorAll("span");

  // Configura la animación con ScrollTrigger
  gsap.fromTo(
    letters,
    { y: "200%", opacity: 0 },
    {
      y: "0%",
      opacity: 1,
      duration: 0.9,
      stagger: 0.09,
      scrollTrigger: {
        trigger: textContainer, // Elemento que activa la animación
        start: "top 150%", // Cuando el elemento entra en la vista

        toggleActions: "play none none reset",

      },
    }
  );
}


// Llama a la función
bigTextAnimation();
textStagger();
imgAboutMove();
initLenis();
