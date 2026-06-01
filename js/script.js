//boxes for downloads
const platform = [
    {
        name: "Online player",
        link: "placeholder link.com",
        hasInstructions: true,
        instructions: "<strong>For Mobile (iOS/Android):</strong> Open in browser, tap your menu/share button, and select 'Add to Home Screen' for the native app framework layout experience."
    },
    {
        name: "Android",
        link: "placeholder link.com",
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
        link: "placeholder link.com",
        hasInstructions: true,
        instructions: "1. Download the AppImage.<br>2. Right-click the file and check 'Allow executing file as program'.<br>3. Double-click to launch."
    }
];

const gridContainer = document.getElementById('downloadGrid');

platform.forEach(platform => {
    const instructionButton = platform.hasInstructions
        ? `<button class="info-btn" onclick="openModal('${platform.name}', \`${platform.instructions}\`)">Setup Guide</button>`
        : "";

    const buttonText = platform.name === "Online player"
        ? "Open in browser"
        : "Download Now";

    gridContainer.innerHTML += `
    <div class="grid-card">
        <h3>${platform.name}</h3>
        <a href="${platform.link}" class="download-btn" target="_blank">${buttonText}</a>
        ${instructionButton}
    </div>
    `;
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

function handleSignUpSubmit(event) {
    const name = document.getElementById('username').value;
    const email = document.getElementById('userEmail').value;

    alert(`Thanks for signing up. We'll send updates to ${email}.`);
    closeSignUpModal;
}