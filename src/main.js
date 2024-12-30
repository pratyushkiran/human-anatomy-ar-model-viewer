// Adds the AR button for each <model-viewer>
document.querySelectorAll('model-viewer').forEach((modelViewer) => {
  const button = document.createElement('button');
  button.setAttribute('slot', 'ar-button');
  button.style.cssText = `
    font-family: "Montserrat", Arial, sans-serif;
    background-color: white;
    border-radius: 50px;
    border: none;
    position: absolute;
    bottom: 16px;
    left: 50%;
    transform: translateX(-50%);
    display: none; /* Hidden by default */
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 8px 12px;
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

  // Show AR button only when the model is fully loaded
  modelViewer.addEventListener('model-visibility', (event) => {
    if (event.detail.visible) {
      button.style.display = 'flex';
    }
  });
});

// Handles loading events for <model-viewer>'s progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  
  // Ensure styles are applied correctly
  if (!progressBar || !updatingBar) return;

  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;

  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};

// Add progress event listener to each <model-viewer>
document.querySelectorAll('model-viewer').forEach((modelViewer) => {
  modelViewer.addEventListener('progress', onProgress);
});
