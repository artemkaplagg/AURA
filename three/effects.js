// Лазерные линии
function createLaserLines() {
    for (let i = 0; i < 20; i++) {
        const material = new THREE.LineBasicMaterial({ 
            color: 0x00ff00,
            transparent: true,
            opacity: 0.3
        });
        
        const points = [];
        for (let j = 0; j < 10; j++) {
            points.push(new THREE.Vector3(
                Math.random() * 20 - 10,
                Math.random() * 20 - 10,
                Math.random() * 20 - 10
            ));
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const line = new THREE.Line(geometry, material);
        scene.add(line);
        
        // Анимация
        gsap.to(line.rotation, {
            duration: 10 + Math.random() * 10,
            x: Math.PI * 2,
            y: Math.PI * 2,
            repeat: -1,
            ease: "none"
        });
    }
}

createLaserLines();