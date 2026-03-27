const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('backend', {
  showLedStatus: (index, status) => ipcRenderer.invoke('backend-show-status', { index, status }),
});
