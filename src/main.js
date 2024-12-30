let deferredPrompt;

window.addEventListener("beforeinstallprompt", (event) => {
   //  Prevent the mini-infobar from appearing
       event.preventDefault();
       // Save the event for later use
       deferredPrompt = event;
       console.log("Install prompt saved");
     });
     
    // // adds the ar buttopn for each model viewer
document.querySelectorAll('model-viewer').forEach((modelViewer) => {
  const button = document.createElement('button');
  button.setAttribute('slot', 'ar-button');
  button.style.cssText = `
  font-family: "Montserrat", Arial, sans-serif;
    background-color: white;
    border-radius: 50px;
    border: none;
    position: absolute;
    bottom: 16px; /* Adjust the distance from the bottom */
    left: 50%; /* Align the button's center horizontally */
    transform: translateX(-50%); /* Offset to center the button */
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 8px 12px; /* Adjust padding for better appearance */
    font-weight: 500;
  `;

  const img = document.createElement('img');
  img.src = 'src/assets/images/ar_icon.png'; // Replace with your icon's path
  img.alt = 'AR Icon';
  img.style.cssText = 'width: 20px; height: 20px;';

  const span = document.createElement('span');
  span.textContent = 'View in your Space';

  button.appendChild(img);
  button.appendChild(span);
  modelViewer.appendChild(button);
});

// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};
document.querySelector('model-viewer').addEventListener('progress', onProgress);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered with scope:", registration.scope);
      })
      .catch((error) => {
        console.log("Service Worker registration failed:", error);
      });
  });
}
