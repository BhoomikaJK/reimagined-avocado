// script.js

document.addEventListener('DOMContentLoaded', () => {
    const friendCards = document.querySelectorAll('.friend-card');
    const roastContainer = document.getElementById('random-roast-container');
    
    // Extract all roasts from the data-roast attributes of the friend cards
    const roasts = Array.from(friendCards).map(card => card.dataset.roast);

    // Friend Card Hover Tooltips
    friendCards.forEach(card => {
        let tooltipTimeout;

        card.addEventListener('mouseenter', () => {
            clearTimeout(tooltipTimeout); // Clear any previous timeout
            const roastText = card.dataset.roast; // Get the specific roast for this card
            if (roastText) {
                const tooltip = document.createElement('div');
                tooltip.classList.add('tooltip');
                tooltip.textContent = roastText;
                card.appendChild(tooltip);

                // Position the tooltip dynamically above the card
                tooltip.style.position = 'absolute';
                tooltip.style.bottom = `${card.offsetHeight / 2 + 30}px`; // Adjust as needed
                tooltip.style.left = '50%';
                tooltip.style.transform = 'translateX(-50%)';
            }
        });

        card.addEventListener('mouseleave', () => {
            // Add a small delay for mouseleave to prevent flickering
            tooltipTimeout = setTimeout(() => {
                const tooltip = card.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            }, 200);
        });
    });


    // Random Roast Popups (appears randomly across the screen)
    function createRandomRoast() {
        // Ensure there are roasts available to display
        if (roasts.length === 0) {
            console.warn("Roasts array is empty. No random roasts to display.");
            return;
        }

        // Select a random roast from the collected array
        const randomIndex = Math.floor(Math.random() * roasts.length);
        const roastText = roasts[randomIndex];

        const roastElement = document.createElement('div');
        roastElement.classList.add('random-roast');
        roastElement.textContent = roastText;

        // Calculate random position within the viewport
        // Adjust values to prevent roasts from going off-screen (approx. roast width/height)
        const x = Math.random() * (window.innerWidth - 250);
        const y = Math.random() * (window.innerHeight - 100);

        roastElement.style.left = `${x}px`;
        roastElement.style.top = `${y}px`;

        // Append to the container if it exists
        if (roastContainer) {
            roastContainer.appendChild(roastElement);
        } else {
            console.error("Cannot append roast: #random-roast-container is null. Check index.html.");
            return; // Exit if container isn't found
        }
        
        // Remove the roast element after its CSS animation ends
        roastElement.addEventListener('animationend', () => {
            roastElement.remove();
        });
    }

    // Initialize the random roast functionality
    // Create one immediately on load for initial visibility
    createRandomRoast();

    // Set an interval to continuously create random roasts
    // Interval between 7 to 10 seconds for varied timing
    let roastInterval = setInterval(createRandomRoast, 7000 + Math.random() * 3000); 

    // Optional: Improve performance by clearing interval when window is not in focus
    window.addEventListener('blur', () => {
        clearInterval(roastInterval);
    });
    window.addEventListener('focus', () => {
        // Re-establish interval with new random timing
        roastInterval = setInterval(createRandomRoast, 7000 + Math.random() * 3000);
    });

    // You can uncomment and expand on this if you want click-based effects
    // For a simple CSS sparkle, you might just append a div and let CSS animate it
    /*
    document.body.addEventListener('click', (event) => {
        const sparkle = document.createElement('div');
        sparkle.classList.add('confetti'); // Use the .confetti class for a simple visual
        sparkle.style.left = `${event.clientX}px`;
        sparkle.style.top = `${event.clientY}px`;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000); // Remove after animation
    });
    */
});
