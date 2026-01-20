const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
const container = document.getElementById('globe-container');

renderer.setSize(container.offsetWidth, container.offsetHeight);
container.appendChild(renderer.domElement);

// Создание глобуса
const geometry = new THREE.SphereGeometry(5, 64, 64);
const material = new THREE.MeshPhongMaterial({
    color: 0x00ff00,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
    emissive: 0x003300
});

const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

// Точки данных (хаки по миру)
const points = [
    { lat: 40.7128, lon: -74.0060, size: 1.5 }, // NY
    { lat: 51.5074, lon: -0.1278, size: 1.3 },  // London
    { lat: 55.7558, lon: 37.6173, size: 2.0 },  // Moscow
    { lat: 35.6762, lon: 139.6503, size: 1.8 }, // Tokyo
    { lat: 1.3521, lon: 103.8198, size: 1.2 }   // Singapore
];

points.forEach(p => {
    const phi = (90 - p.lat) * Math.PI / 180;
    const theta = (p.lon + 180) * Math.PI / 180;
    
    const x = 6 * Math.sin(phi) * Math.cos(theta);
    const y = 6 * Math.cos(phi);
    const z = 6 * Math.sin(phi) * Math.sin(theta);
    
    const pointGeometry = new THREE.SphereGeometry(p.size * 0.1, 16, 16);
    const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const point = new THREE.Mesh(pointGeometry, pointMaterial);
    
    point.position.set(x, y, z);
    scene.add(point);
    
    // Анимированное свечение
    const glowGeometry = new THREE.SphereGeometry(p.size * 0.15, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        transparent: true,
        opacity: 0.3
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    point.add(glow);
    
    gsap.to(glow.scale, {
        duration: 2,
        x: 2,
        y: 2,
        z: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
});

// Подсветка
const light = new THREE.PointLight(0x00ff00, 2, 100);
light.position.set(10, 10, 10);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

camera.position.z = 15;

// Анимация
function animate() {
    requestAnimationFrame(animate);
    
    globe.rotation.y += 0.001;
    globe.rotation.x += 0.0005;
    
    points.forEach((p, i) => {
        const point = scene.children[i + 1];
        if (point) {
            point.rotation.y += 0.02;
        }
    });
    
    renderer.render(scene, camera);
}

// Респонсив
window.addEventListener('resize', () => {
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
});

animate();