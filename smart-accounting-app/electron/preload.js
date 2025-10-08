const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('desktop', {
  toggleTheme: () => ipcRenderer.invoke('theme:toggle')
});
