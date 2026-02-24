// DOM elements
const digitalClock = document.getElementById('digital-clock');
const dateDisplay = document.getElementById('date-display');
const analogClock = document.getElementById('analog-clock');
const settingsToggle = document.getElementById('settings-toggle');
const settingsPanel = document.getElementById('settings-panel');
const closeSettings = document.getElementById('close-settings');

// Setting inputs
const showDigital = document.getElementById('show-digital');
const showAnalog = document.getElementById('show-analog');
const showDate = document.getElementById('show-date');
const showSeconds = document.getElementById('show-seconds');
const timezoneSelect = document.getElementById('timezone');
const fontSelect = document.getElementById('font-select');
const textColor = document.getElementById('text-color');
const bgColor = document.getElementById('bg-color');
const bgImage = document.getElementById('bg-image');
const clearBgImage = document.getElementById('clear-bg-image');

// Default settings
const defaultSettings = {
    showDigital: true,
    showAnalog: false,
    showDate: false,
    showSeconds: true,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    font: 'system-ui',
    textColor: '#ffffff',
    bgColor: '#000000',
    bgImage: ''
};

// Load settings from localStorage
function loadSettings() {
    const saved = localStorage.getItem('clockSettings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : { ...defaultSettings };
}

// Save settings to localStorage
function saveSettings(settings) {
    localStorage.setItem('clockSettings', JSON.stringify(settings));
}

// Current settings
let settings = loadSettings();

// Populate timezone dropdown
function populateTimezones() {
    const timezones = Intl.supportedValuesOf('timeZone');
    timezones.forEach(tz => {
        const option = document.createElement('option');
        option.value = tz;
        option.textContent = tz.replace(/_/g, ' ');
        timezoneSelect.appendChild(option);
    });
}

// Apply settings to UI
function applySettings() {
    // Checkboxes
    showDigital.checked = settings.showDigital;
    showAnalog.checked = settings.showAnalog;
    showDate.checked = settings.showDate;
    showSeconds.checked = settings.showSeconds;

    // Selects
    timezoneSelect.value = settings.timezone;
    fontSelect.value = settings.font;

    // Colors
    textColor.value = settings.textColor;
    bgColor.value = settings.bgColor;

    // Background image
    bgImage.value = settings.bgImage;

    // Apply visual changes
    updateVisibility();
    updateStyles();
}

// Update element visibility
function updateVisibility() {
    digitalClock.classList.toggle('hidden', !settings.showDigital);
    analogClock.classList.toggle('hidden', !settings.showAnalog);
    dateDisplay.classList.toggle('hidden', !settings.showDate);
}

// Update CSS custom properties and styles
function updateStyles() {
    document.documentElement.style.setProperty('--text-color', settings.textColor);
    document.documentElement.style.setProperty('--bg-color', settings.bgColor);
    document.documentElement.style.setProperty('--font-family', settings.font);

    if (settings.bgImage) {
        document.body.style.backgroundImage = `url('${settings.bgImage}')`;
    } else {
        document.body.style.backgroundImage = 'none';
    }
}

// Format time for display
function formatTime(date) {
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: settings.timezone
    };

    if (settings.showSeconds) {
        options.second = '2-digit';
    }

    return date.toLocaleTimeString('en-GB', options);
}

// Format date for display
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: settings.timezone
    });
}

// Draw analog clock
function drawAnalogClock(date) {
    const ctx = analogClock.getContext('2d');
    const size = Math.min(window.innerWidth * 0.4, window.innerHeight * 0.4, 400);

    // Set canvas size
    analogClock.width = size * 2; // 2x for retina
    analogClock.height = size * 2;
    analogClock.style.width = size + 'px';
    analogClock.style.height = size + 'px';
    ctx.scale(2, 2);

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 10;

    // Get time in selected timezone
    const timeStr = date.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: settings.timezone
    });
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);

    // Clear canvas
    ctx.clearRect(0, 0, size, size);

    // Draw clock face
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = settings.textColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw hour markers
    for (let i = 0; i < 12; i++) {
        const angle = (i * Math.PI / 6) - Math.PI / 2;
        const innerRadius = radius - 15;
        const outerRadius = radius - 5;

        ctx.beginPath();
        ctx.moveTo(
            centerX + Math.cos(angle) * innerRadius,
            centerY + Math.sin(angle) * innerRadius
        );
        ctx.lineTo(
            centerX + Math.cos(angle) * outerRadius,
            centerY + Math.sin(angle) * outerRadius
        );
        ctx.strokeStyle = settings.textColor;
        ctx.lineWidth = 2;
        ctx.stroke();
    }

    // Hour hand
    const hourAngle = ((hours % 12) + minutes / 60) * Math.PI / 6 - Math.PI / 2;
    drawHand(ctx, centerX, centerY, hourAngle, radius * 0.5, 4);

    // Minute hand
    const minuteAngle = (minutes + seconds / 60) * Math.PI / 30 - Math.PI / 2;
    drawHand(ctx, centerX, centerY, minuteAngle, radius * 0.7, 3);

    // Second hand
    if (settings.showSeconds) {
        const secondAngle = seconds * Math.PI / 30 - Math.PI / 2;
        ctx.strokeStyle = '#ff4444';
        drawHand(ctx, centerX, centerY, secondAngle, radius * 0.8, 1);
    }

    // Center dot
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, 2 * Math.PI);
    ctx.fillStyle = settings.textColor;
    ctx.fill();
}

function drawHand(ctx, x, y, angle, length, width) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
        x + Math.cos(angle) * length,
        y + Math.sin(angle) * length
    );
    ctx.strokeStyle = settings.textColor;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.stroke();
}

// Update clock display
function updateClock() {
    const now = new Date();

    // Update digital clock
    digitalClock.textContent = formatTime(now);

    // Update date if visible
    if (settings.showDate) {
        dateDisplay.textContent = formatDate(now);
    }

    // Update analog clock if visible
    if (settings.showAnalog) {
        drawAnalogClock(now);
    }
}

// Settings event listeners
settingsToggle.addEventListener('click', () => {
    settingsPanel.classList.remove('hidden');
});

closeSettings.addEventListener('click', () => {
    settingsPanel.classList.add('hidden');
});

showDigital.addEventListener('change', (e) => {
    settings.showDigital = e.target.checked;
    saveSettings(settings);
    updateVisibility();
    updateClock();
});

showAnalog.addEventListener('change', (e) => {
    settings.showAnalog = e.target.checked;
    saveSettings(settings);
    updateVisibility();
    updateClock();
});

showDate.addEventListener('change', (e) => {
    settings.showDate = e.target.checked;
    saveSettings(settings);
    updateVisibility();
    updateClock();
});

showSeconds.addEventListener('change', (e) => {
    settings.showSeconds = e.target.checked;
    saveSettings(settings);
    updateClock();
});

timezoneSelect.addEventListener('change', (e) => {
    settings.timezone = e.target.value;
    saveSettings(settings);
    updateClock();
});

fontSelect.addEventListener('change', (e) => {
    settings.font = e.target.value;
    saveSettings(settings);
    updateStyles();
});

textColor.addEventListener('input', (e) => {
    settings.textColor = e.target.value;
    saveSettings(settings);
    updateStyles();
    if (settings.showAnalog) updateClock();
});

bgColor.addEventListener('input', (e) => {
    settings.bgColor = e.target.value;
    saveSettings(settings);
    updateStyles();
});

bgImage.addEventListener('change', (e) => {
    settings.bgImage = e.target.value;
    saveSettings(settings);
    updateStyles();
});

clearBgImage.addEventListener('click', () => {
    settings.bgImage = '';
    bgImage.value = '';
    saveSettings(settings);
    updateStyles();
});

document.getElementById('reset-settings').addEventListener('click', () => {
    localStorage.removeItem('clockSettings');
    settings = { ...defaultSettings };
    applySettings();
    updateClock();
});

// Handle window resize for analog clock
window.addEventListener('resize', () => {
    if (settings.showAnalog) {
        updateClock();
    }
});

// Initialize
populateTimezones();
applySettings();
updateClock();

// Start clock - update every second if showing seconds, otherwise every minute
setInterval(updateClock, settings.showSeconds ? 1000 : 1000);
