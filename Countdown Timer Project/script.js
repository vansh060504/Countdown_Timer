// Get DOM elements
const startBtn = document.getElementById('start-btn');
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const daysSpan = document.getElementById('days');
const hoursSpan = document.getElementById('hours');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const countdownDisplay = document.querySelector('.countdown-display');

let countdownInterval = null;

function pad(num) {
    return num.toString().padStart(2, '0');
}

function updateCountdown(targetDate) {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        clearInterval(countdownInterval);
        daysSpan.textContent = '00';
        hoursSpan.textContent = '00';
        minutesSpan.textContent = '00';
        secondsSpan.textContent = '00';
        countdownDisplay.innerHTML += '<div style="color:#ef4444; font-size:1.2rem; margin-left:16px;">Time\'s up!</div>';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysSpan.textContent = pad(days);
    hoursSpan.textContent = pad(hours);
    minutesSpan.textContent = pad(minutes);
    secondsSpan.textContent = pad(seconds);
}

startBtn.addEventListener('click', () => {
    // Remove any previous message
    const message = countdownDisplay.querySelector('div');
    if (message) message.remove();

    const dateValue = dateInput.value;
    const timeValue = timeInput.value;
    if (!dateValue || !timeValue) {
        alert('Please select both date and time.');
        return;
    }
    const targetDateTime = new Date(`${dateValue}T${timeValue}:00`);
    if (isNaN(targetDateTime.getTime()) || targetDateTime <= new Date()) {
        alert('Please select a valid future date and time.');
        return;
    }
    // Clear any previous interval
    if (countdownInterval) clearInterval(countdownInterval);
    // Initial update
    updateCountdown(targetDateTime);
    // Start interval
    countdownInterval = setInterval(() => updateCountdown(targetDateTime), 1000);
}); 