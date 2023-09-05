const installButton = document.getElementById('buttonInstall');

let deferredInstallPrompt;

// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installButton.style.display = 'block';
});

// Implement a click event handler on the `installButton` element
installButton.addEventListener('click', async () => {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();

    const userChoice = await deferredInstallPrompt.userChoice;

    if (userChoice.outcome === 'accepted') {
      console.log('App installation accepted.');
    } else {
      console.log('App installation declined.');
    }

    deferredInstallPrompt = null;

    installButton.style.display = 'none';
  }
});

// Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App has been successfully installed.');
});