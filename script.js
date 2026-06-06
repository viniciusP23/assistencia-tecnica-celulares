const header = document.getElementById("header")

window.addEventListener("scroll", () => {

   if(window.scrollY > 50) {
        header.classList.add("scrolled")
   }else {
        header.classList.remove("scrolled")
   }

})

////////

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

gsap.registerPlugin(ScrollTrigger);

// CENA
const cena = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(
    40,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.z = 10;

// RENDERIZADOR
const renderizador = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
});

renderizador.setSize(window.innerWidth, window.innerHeight);

document
    .querySelector(".celular")
    .appendChild(renderizador.domElement);

// ILUMINAÇÃO
const luzAmbiente = new THREE.AmbientLight(0xffffff, 2);
cena.add(luzAmbiente);

const luzDirecional = new THREE.DirectionalLight(0xffffff, 3);
luzDirecional.position.set(5, 5, 5);
cena.add(luzDirecional);

// MODELO IPHONE
let iphone;

const loader = new GLTFLoader();

loader.load(
    "img/iphone_17_pro_max_silver.glb",

    (gltf) => {

        iphone = gltf.scene;

        // AJUSTE DE TAMANHO
        iphone.scale.set(40, 40, 40);

        // POSIÇÃO INICIAL
        iphone.position.set(5, -3, -5);

        // ROTAÇÃO INICIAL
        iphone.rotation.y = 2.6;
        iphone.rotation.x = -0.3;

        cena.add(iphone);

        animacaoScroll();
    },

    undefined,

    (erro) => {
        console.error("Erro ao carregar o modelo:", erro);
    }
);

// ANIMAÇÃO COM SCROLL
function animacaoScroll() {

    gsap.to(iphone.position, {
        x: -4,

        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 2
        }
    });

    gsap.to(iphone.rotation, {
        y: iphone.rotation.y + Math.PI * 2,

        scrollTrigger: {
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 2
        }
    });
}

// RESPONSIVIDADE
window.addEventListener("resize", () => {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderizador.setSize(
        window.innerWidth,
        window.innerHeight
    );

});

// LOOP DE RENDERIZAÇÃO
function animar() {

    requestAnimationFrame(animar);

    renderizador.render(cena, camera);
}

animar();

// 

// Texto vindo da esquerda
gsap.from(".content", {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});