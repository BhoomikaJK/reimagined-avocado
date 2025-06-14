// script.js

document.addEventListener('DOMContentLoaded', () => {
    const friendCards = document.querySelectorAll('.friend-card');
    const roastContainer = document.getElementById('random-roast-container');
    const roasts = Array.from(friendCards).map(card => card.dataset.roast);

    // Friend Card Hover Tooltips
    friendCards.forEach(card => {
        let tooltipTimeout;

        card.addEventListener('mouseenter', () => {
            clearTimeout(tooltipTimeout); // Clear any previous timeout
            const roastText = card.dataset.roast;
            if (roastText) {
                const tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                tooltip.textContent = roastText;
                card.appendChild(tooltip);

                // Position the tooltip dynamically
                const cardRect = card.getBoundingClientRect();
                tooltip.style.position = 'absolute';
                tooltip.style.bottom = `${card.offsetHeight / 2 + 30}px`; // Adjust as needed
                tooltip.style.left = '50%';
                tooltip.style.transform = 'translateX(-50%)';
            }
        });

        card.addEventListener('mouseleave', () => {
            tooltipTimeout = setTimeout(() => {
                const tooltip = card.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            }, 200); // Small delay to prevent flickering
        });
    });


    // Random Roast Popups
    function createRandomRoast() {
        if (roasts.length === 0) return; // Don't create if no roasts defined

        const randomIndex = Math.floor(Math.random() * roasts.length);
        const roastText = roasts[randomIndex];

        const roastElement = document.createElement('div');
        roastElement.classList.add('random-roast');
        roastElement.textContent = roastText;

        // Position the roast randomly across the screen, avoiding edges
        const x = Math.random() * (window.innerWidth - 250); // Adjust 250 for roast width
        const y = Math.random() * (window.innerHeight - 100); // Adjust 100 for roast height

        roastElement.style.left = `${x}px`;
        roastElement.style.top = `${y}px`;

        roastContainer.appendChild(roastElement);

        // Make the roast disappear after its animation
        roastElement.addEventListener('animationend', () => {
            roastElement.remove();
        });
    }

    // Create a random roast every 5 to 10 seconds
    let roastInterval = setInterval(createRandomRoast, 7000 + Math.random() * 3000); // 7-10 seconds

    // Optional: Add a subtle click effect with confetti/sparkles
    document.body.addEventListener('click', (event) => {
        // You can uncomment and expand on this if you want click-based effects
        // For a simple CSS sparkle, you might just append a div and let CSS animate it
        /*
        const sparkle = document.createElement('div');
        sparkle.classList.add('confetti'); // Use the .confetti class for a simple visual
        sparkle.style.left = `${event.clientX}px`;
        sparkle.style.top = `${event.clientY}px`;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000); // Remove after animation
        */
    });

    // Reset roast interval on window focus/blur (optional, for better performance)
    window.addEventListener('blur', () => {
        clearInterval(roastInterval);
    });
    window.addEventListener('focus', () => {
        roastInterval = setInterval(createRandomRoast, 7000 + Math.random() * 3000);
    });
});
