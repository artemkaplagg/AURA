document.addEventListener('DOMContentLoaded', function() {
    // Инициализация частиц
    particlesJS.load('particles-js', 'particles/config.json');
    
    // Анимация печатающегося текста
    const commands = [
        'exploit --target telegram --method api-bypass',
        'scan --network 10.0.0.0/24 --aggressive',
        'bruteforce --service ssh --wordlist /usr/share/wordlists/rockyou.txt',
        'phish --template corporate --targets 1000',
        'exfiltrate --data financial --encrypt aes-256'
    ];
    
    let cmdIndex = 0;
    let charIndex = 0;
    const typingElement = document.getElementById('typing');
    
    function typeWriter() {
        if (charIndex < commands[cmdIndex].length) {
            typingElement.textContent += commands[cmdIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 50 + Math.random() * 50);
        } else {
            setTimeout(() => {
                typingElement.textContent = '';
                charIndex = 0;
                cmdIndex = (cmdIndex + 1) % commands.length;
                setTimeout(typeWriter, 1000);
            }, 3000);
        }
    }
    
    typeWriter();
    
    // PGP key toggle
    const pgpBtn = document.getElementById('pgp-btn');
    const pgpKey = document.getElementById('pgp-key');
    
    pgpBtn.addEventListener('click', function(e) {
        e.preventDefault();
        pgpKey.classList.toggle('hidden');
        if (!pgpKey.classList.contains('hidden')) {
            pgpKey.scrollIntoView({ behavior: 'smooth' });
        }
    });
    
    // Случайные эффекты взлома
    function randomHackEffect() {
        const effects = [
            () => document.body.style.filter = 'hue-rotate(90deg)',
            () => document.querySelector('.terminal').style.transform = 'rotate(0.5deg)',
            () => document.querySelectorAll('.project').forEach(p => p.style.boxShadow = '0 0 30px #f0f')
        ];
        
        const effect = effects[Math.floor(Math.random() * effects.length)];
        effect();
        setTimeout(() => {
            document.body.style.filter = '';
            document.querySelector('.terminal').style.transform = '';
            document.querySelectorAll('.project').forEach(p => p.style.boxShadow = '');
        }, 500);
    }
    
    setInterval(randomHackEffect, 10000);
    
    // Звуки
    const audio = document.getElementById('hack-sound');
    audio.volume = 0.3;
    
    document.addEventListener('click', function() {
        if (audio.paused) {
            audio.play().catch(e => console.log('Автозапуск звука заблокирован'));
        }
    });
    
    // Параллакс эффект
    document.addEventListener('mousemove', function(e) {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        document.querySelector('.terminal').style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    });
});