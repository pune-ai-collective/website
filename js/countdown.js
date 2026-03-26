/**
 * Pune AI Collective - Meetup Countdown Timer
 * Displays a live countdown to the upcoming meetup event
 */

(function() {
    'use strict';

    // Meetup date - April 11, 2026
    const meetupDate = new Date('2026-04-11T00:00:00').getTime();

    // Get countdown elements
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownEl = document.getElementById('meetup-countdown');

    // Check if elements exist
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl || !countdownEl) {
        console.warn('Countdown elements not found on this page');
        return;
    }

    /**
     * Format number with leading zero if needed
     * @param {number} num - The number to format
     * @returns {string} Formatted number string
     */
    function formatNumber(num) {
        return num < 10 ? '0' + num : num.toString();
    }

    /**
     * Update the countdown display
     */
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = meetupDate - now;

        // If the countdown is finished
        if (distance < 0) {
            countdownEl.innerHTML = '<p style="color: white; font-size: 1.25rem; margin: 0;">The event has started!</p>';
            clearInterval(countdownInterval);
            return;
        }

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update the countdown display with animation
        updateElement(daysEl, days);
        updateElement(hoursEl, hours);
        updateElement(minutesEl, minutes);
        updateElement(secondsEl, seconds);
    }

    /**
     * Update an element with animation
     * @param {HTMLElement} element - The element to update
     * @param {number} value - The new value
     */
    function updateElement(element, value) {
        const formattedValue = formatNumber(value);

        if (element.textContent !== formattedValue) {
            element.style.transform = 'scale(1.1)';
            element.textContent = formattedValue;

            setTimeout(() => {
                element.style.transform = 'scale(1)';
            }, 200);
        }
    }

    // Add transition style to countdown numbers
    [daysEl, hoursEl, minutesEl, secondsEl].forEach(el => {
        el.style.transition = 'transform 0.2s ease-in-out';
    });

    // Initialize countdown
    updateCountdown();

    // Update countdown every second
    const countdownInterval = setInterval(updateCountdown, 1000);

    // Clean up on page unload
    window.addEventListener('beforeunload', function() {
        clearInterval(countdownInterval);
    });
})();
