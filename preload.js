const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('backend', {
  showLedStatus: async (index, status) => {
    try {
      const response = await fetch(`http://localhost:5005/api/led?index=${index}&status=${status}`);
      return await response.json();
    } catch (error) {
      return { error: error.message };
    }
  },
});
