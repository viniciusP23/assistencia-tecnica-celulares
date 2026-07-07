
// HEADER SCROLL

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

//////////////////////////////////////////////////////////////

// GSAP + SCROLLTRIGGER

gsap.registerPlugin(ScrollTrigger);


// HERO 3D (THREE.JS) ISOLADO

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

let iphone;

function initIphone3D() {

    // CENA
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
        40,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    camera.position.z = 10;

    // RENDER
    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    document.querySelector(".celular").appendChild(renderer.domElement);

    // LUZES
    scene.add(new THREE.AmbientLight(0xffffff, 2));

    const light = new THREE.DirectionalLight(0xffffff, 3);
    light.position.set(5, 5, 10);
    scene.add(light);

    // MODEL
    const loader = new GLTFLoader();

    loader.load("img/iphone_17_pro_max_silver.glb", (gltf) => {

        iphone = gltf.scene;

        iphone.scale.set(40, 40, 40);
        iphone.position.set(5, -3, -5);
        iphone.rotation.set(-0.3, 2.6, 0);

        scene.add(iphone);

        animacaoScroll();
    });

    // ANIMAÇÃO GSAP ISOLADA
    function animacaoScroll() {

        const hero = document.querySelector(".hero");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom center",
                scrub: 2
            }
        });

        tl.to(iphone.position, {
            x: -1,
            y: -3,
            z: -5
        }, 0);

        tl.to(iphone.rotation, {
            y: iphone.rotation.y + Math.PI * 1.1
        }, 0);
    }

    // LOOP THREE
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();

    // RESIZE
    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

initIphone3D();

////////////////////////////////////////////////////////////////////////

// HERO TEXTO ANIMATION

gsap.from(".content", {
    x: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});


// SLIDER HORIZONTAL (ISOLADO)

function initSlider() {

    const slider = document.querySelector(".slider");
    const sections = gsap.utils.toArray(".secao");

    gsap.to(slider, {
        x: () => -(slider.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
            trigger: ".container-slider",
            start: "top top",
            pin: true,
            scrub: 1,
            snap: 1 / (sections.length - 1),
            end: () => "+=" + slider.scrollWidth
        }
    });

    window.addEventListener("resize", () => {
        ScrollTrigger.refresh();
    });
}

window.addEventListener("DOMContentLoaded", initSlider);


// 

function enviarWhats(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const mensagem = document.getElementById("mensagem").value;

    const texto = `Olá! Meu nome é ${nome}.

Mensagem:
${mensagem}`;

    const numero = "5514998871712";

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

    window.open(url, "_blank");
}

document
    .getElementById("formulario")
    .addEventListener("submit", enviarWhats);