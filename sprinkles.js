const canvas = document.getElementById("c");
const ctx = canvas.getContext("2d");
const cursorcanvas = document.getElementById("cursor");
const cursorctx = cursorcanvas.getContext("2d");


function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cursorcanvas.width = window.innerWidth;
    cursorcanvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();


const images = [];
const sources = [
    "assets/images/Pink.png", "assets/images/Green.png", 
    "assets/images/Orange.png", "assets/images/Purple.png", 
    "assets/images/Yellow.png", "assets/images/Blue.png"
];

sources.forEach(src => {
    const img = new Image();
    img.src = src;
    images.push(img);
});


let particleCount = 200;
let trailStrength = 3;  


const mobileQuery = window.matchMedia("(max-width: 800px)");

function handleMobileOptimization(e) {
    if (e.matches) {
        console.log("MOBILE MODE ENGAGED 🚀");

        particleCount = 80; 
        trailStrength = 1; 
        

    } else {
        console.log("DESKTOP MODE ENGAGED 💻");
        particleCount = 200;
        trailStrength = 3;
    }
}


mobileQuery.addEventListener("change", handleMobileOptimization);
handleMobileOptimization(mobileQuery);


const particles = Array.from({length: 200}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    speed: 2 + Math.random() * 3,
    img: images[Math.floor(Math.random() * images.length)]
}));

const trail = [];


const handleMove = e => {

    const x = e.touches ? e.touches[0].clientX : e.clientX;
    const y = e.touches ? e.touches[0].clientY : e.clientY;

    for (let i = 0; i < trailStrength; i++) {
        trail.push({
            x: x,
            y: y,
            vx: (Math.random() - 0.5) * 2,
            vy: Math.random() * 2 + 1,
            life: 1,
            size: 8 + Math.random() * 6,
            img: images[Math.floor(Math.random() * images.length)]
        });
    }
};

window.addEventListener("mousemove", handleMove);

window.addEventListener("touchmove", handleMove, { passive: true });


function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cursorctx.clearRect(0, 0, cursorcanvas.width, cursorcanvas.height);


    for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.y += p.speed;

        if (p.y > canvas.height) {
            p.y = -20;
            p.x = Math.random() * canvas.width;
        }

        if (p.img.complete) { 
            ctx.drawImage(p.img, p.x, p.y, 12, 12);
        }
    }

    for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life -= 0.03;

        cursorctx.globalAlpha = p.life;
        if (p.img.complete) {
            cursorctx.drawImage(p.img, p.x, p.y, p.size, p.size);
        }

        if (p.life <= 0) trail.splice(i, 1);
    }

    ctx.globalAlpha = 1;
    cursorctx.globalAlpha = 1;
    requestAnimationFrame(loop);
}

loop();