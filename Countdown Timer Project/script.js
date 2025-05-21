// DOM Elements
const dateInput = document.getElementById('date-input');
const timeInput = document.getElementById('time-input');
const startBtn = document.getElementById('start-btn');
const daysDisplay = document.getElementById('days');
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const errorMessage = document.querySelector('.error-message');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
dateInput.min = today;

let countdownInterval;

// Format number to always show two digits
const formatNumber = (num) => String(num).padStart(2, '0');

// Show error message
const showError = (message) => {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 3000);
};

// Update countdown display
const updateDisplay = (days, hours, minutes, seconds) => {
    daysDisplay.textContent = formatNumber(days);
    hoursDisplay.textContent = formatNumber(hours);
    minutesDisplay.textContent = formatNumber(minutes);
    secondsDisplay.textContent = formatNumber(seconds);
};

// Calculate time remaining
const calculateTimeRemaining = (targetDate) => {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const difference = target - now;

    if (difference <= 0) {
        clearInterval(countdownInterval);
        updateDisplay(0, 0, 0, 0);
        showError('Countdown has ended!');
        startBtn.disabled = false;
        startBtn.classList.remove('loading');
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    updateDisplay(days, hours, minutes, seconds);
};

// Start countdown
const startCountdown = () => {
    const date = dateInput.value;
    const time = timeInput.value;

    if (!date || !time) {
        showError('Please select both date and time');
        return;
    }

    const targetDate = `${date}T${time}`;
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();

    if (target <= now) {
        showError('Please select a future date and time');
        return;
    }

    // Disable inputs and button while countdown is running
    dateInput.disabled = true;
    timeInput.disabled = true;
    startBtn.disabled = true;
    startBtn.classList.add('loading');

    // Start the countdown
    calculateTimeRemaining(targetDate);
    countdownInterval = setInterval(() => calculateTimeRemaining(targetDate), 1000);
};

// Reset countdown
const resetCountdown = () => {
    clearInterval(countdownInterval);
    dateInput.disabled = false;
    timeInput.disabled = false;
    startBtn.disabled = false;
    startBtn.classList.remove('loading');
    updateDisplay(0, 0, 0, 0);
};

// Event Listeners
startBtn.addEventListener('click', startCountdown);

// Handle input changes
dateInput.addEventListener('change', () => {
    if (countdownInterval) {
        resetCountdown();
    }
});

timeInput.addEventListener('change', () => {
    if (countdownInterval) {
        resetCountdown();
    }
});

// Initialize display
updateDisplay(0, 0, 0, 0); 