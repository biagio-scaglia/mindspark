window.addEventListener('DOMContentLoaded', () => {
    const { ipcRenderer } = require('electron');
  
    document.getElementById('saveButton').addEventListener('click', () => {
      const waterIntake = document.getElementById('water').value;
      const pagesRead = document.getElementById('pages').value;
      const workoutDone = document.getElementById('workout').value;
      const musicListened = document.getElementById('music').value;
      const meditationDone = document.getElementById('meditation').value;
      const notes = document.getElementById('notes').value;
  
      ipcRenderer.send('save-progress', {
        waterIntake,
        pagesRead,
        workoutDone,
        musicListened,
        meditationDone,
        notes,
      });
    });
  });
  