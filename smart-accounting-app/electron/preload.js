const { contextBridge, ipcRenderer } = require('electron');

const apiBaseUrl = process.env.API_BASE_URL || 'http://localhost:3000/api';

contextBridge.exposeInMainWorld('desktop', {
  toggleTheme: () => ipcRenderer.invoke('theme:toggle'),
  getApiBaseUrl: () => apiBaseUrl
});
