//boxes for downloads
const platforms = [
    {
        name: "Online player",
        link: "https://thegesse.github.io/projet-final/",
        hasInstructions: true,
        instructions: "<strong>For Mobile (iOS/Android):</strong> Open in browser, tap your menu/share button, and select 'Add to Home Screen' for the native app framework layout experience."
    },
    {
        name: "Android",
        link: "https://drive.google.com/file/d/1RheP-JYQWYKd5VxZXpbPYY6sGQKYZSuu/view?usp=drive_link",
        hasInstructions: true,
        instructions: "1. Download the APK file.<br>2. Open it on your phone.<br>3. Allow 'installs from unknown sources' is asked"
    },
    {
        name: "Windows",
        link: "placeholder link.com",
        hasInstructions: false
    },
    {
        name: "macOs",
        link: "placeholder link.com",
        hasInstructions: true,
        instructions: "1. Download the DMG file.<br>2. Drag to app to Applications.<br>3. Right-click the app icon and select 'Open' to bypass Apple's unidentified developer warning"
    },
    {
        name: "Linux",
        link: "https://drive.google.com/file/d/1fzoeQ6XdjhxYUZ4dxPPiW-OB6C1v8u7b/view?usp=drive_link",
        hasInstructions: true,
        instructions: "1. Download the AppImage.<br>2. Right-click the file and check 'Allow executing file as program'.<br>3. Double-click to launch."
    }
];

const gridContainer = document.getElementById('downloadGrid');

platforms.forEach(platform => {
    const card = document.createElement('div');
    card.className = 'grid-card';

    const instructionButton = platform.hasInstructions
        ? `<button class="info-btn">Setup Guide</button>`
        : "";

    const buttonText = platform.name === "Online player" ? "Open in browser" : "Download Now";

    card.innerHTML = `
        <h3></h3>
        <a class="download-btn" target="_blank">${buttonText}</a>
        ${instructionButton}
    `;
    card.querySelector('h3').textContent = platform.name;
    card.querySelector('.download-btn').href = platform.link;

    if (platform.hasInstructions) {
        card.querySelector('.info-btn').addEventListener('click', () => {
            openModal(platform.name, platform.instructions);
        });
    }

    gridContainer.appendChild(card);
});

const overlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');

function openModal(name, steps) {
    modalTitle.innerText = `${name} Installation Guide`;
    modalBody.innerHTML = steps;
    overlay.classList.add('active');
}

function closeModal() {
    overlay.classList.remove('active');
}

//signup form
const signUpOverlay = document.getElementById('signUpModalOverlay');
const updatesForm = document.getElementById('updatesForm');

function openSignUpModal() {
    signUpOverlay.classList.add('active');
}
function closeSignUpModal() {
    signUpOverlay.classList.remove('active');
}

//handshake to send data to db
async function handleSignUpSubmit(event) {
    event.preventDefault()

    const name = document.getElementById('userName').value
    const email = document.getElementById('userEmail').value

    console.log('Submitting:', { name, email })

    try {
        const response = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        })

        console.log('Response status:', response.status)
        
        const data = await response.json()
        console.log('Response data:', data)

        if (data.success) {
            alert('Thanks for signing up, we will send updates to your email')
            closeSignUpModal()
        } else {
            alert('Error from server: ' + (data.error || 'Unknown error'))
        }
    } catch (e) {
        console.error('Catch error:', e)
        alert('Failed to connect to server: ' + e.message)
    }
}