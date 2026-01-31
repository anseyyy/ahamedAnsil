// --- 1. Mouse & Spotlight Tracker ---
document.addEventListener('mousemove', (e) => {
    // Update CSS Variables for Spotlight
    document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);

    // Custom Cursor Movement
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorRing = document.querySelector('.cursor-ring');
    
    if(cursorDot) {
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top = `${e.clientY}px`;
    }
    if(cursorRing) {
        setTimeout(() => {
            cursorRing.style.left = `${e.clientX}px`;
            cursorRing.style.top = `${e.clientY}px`;
        }, 50);
    }
});

// --- 2. 3D Tilt Cards (For Vault & Profile) ---
const tiltCards = document.querySelectorAll('[data-tilt="true"]');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5; // Subtle 5deg
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
    });
});

// --- 3. Hacker Text Scramble ---
const alphabets = "0101010101001010101X@#%&";

document.querySelectorAll('[data-scramble]').forEach(el => {
    el.addEventListener('mouseover', event => {  
        const targetText = event.target.dataset.value;
        let iteration = 0;
        
        const interval = setInterval(() => {
            event.target.innerText = targetText
                .split("")
                .map((letter, index) => {
                    if(index < iteration) {
                        return targetText[index];
                    }
                    return alphabets[Math.floor(Math.random() * alphabets.length)];
                })
                .join("");
            
            if(iteration >= targetText.length){ 
                clearInterval(interval);
            }
            
            iteration += 1 / 2;
        }, 30);
    });
});

// --- 4. Magnetic Buttons ---
const magnets = document.querySelectorAll('[data-magnet]');
magnets.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// --- 5. Back to Top Logic ---
const backToTopBtn = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});
