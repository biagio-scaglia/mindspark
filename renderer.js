const userNameInput = document.getElementById('userName');
const saveProfileBtn = document.getElementById('saveProfile');
let userName = localStorage.getItem('mindspark_userName') || '';

const trackerForm = document.getElementById('trackerForm');
const saveButton = document.getElementById('saveButton');
const historyList = document.getElementById('historyList');

if (userName) {
  userNameInput.value = userName;
}

saveProfileBtn.addEventListener('click', () => {
  userName = userNameInput.value.trim();
  if (userName) {
    localStorage.setItem('mindspark_userName', userName);
    alert('Profilo salvato con successo!');
  } else {
    alert('Per favore inserisci un nome');
  }
});

function loadEntries() {
  const entries = JSON.parse(localStorage.getItem('mindspark_entries')) || [];
  historyList.innerHTML = '';
  
  entries.forEach((entry, index) => {
    const entryElement = createEntryElement(entry, index);
    historyList.appendChild(entryElement);
  });
}

function createEntryElement(entry, index) {
  const entryElement = document.createElement('div');
  entryElement.className = 'history-entry';
  
  const date = new Date(entry.date);
  const dateString = date.toLocaleDateString('it-IT', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  entryElement.innerHTML = `
    <div class="entry-header">
      <span class="entry-user">${entry.userName || 'Anonimo'}</span>
      <span class="entry-date">${dateString}</span>
      <button class="delete-entry" data-index="${index}">
        <i class="fas fa-trash"></i>
      </button>
    </div>
    <div class="entry-stats">
      <span><i class="fas fa-tint"></i> ${entry.water}L</span>
      <span><i class="fas fa-book-open"></i> ${entry.pages}p</span>
      <span><i class="fas fa-running"></i> ${entry.workout}m</span>
      <span><i class="fas fa-music"></i> ${entry.music}h</span>
      <span><i class="fas fa-spa"></i> ${entry.meditation}m</span>
    </div>
  `;
  
  return entryElement;
}

saveButton.addEventListener('click', () => {
  if (!trackerForm.checkValidity()) {
    alert('Per favore compila tutti i campi obbligatori');
    return;
  }

  const newEntry = {
    userName: userName,
    date: new Date().toISOString(),
    water: document.getElementById('water').value,
    pages: document.getElementById('pages').value,
    workout: document.getElementById('workout').value,
    music: document.getElementById('music').value,
    meditation: document.getElementById('meditation').value
  };

  const entries = JSON.parse(localStorage.getItem('mindspark_entries')) || [];
  entries.unshift(newEntry);
  localStorage.setItem('mindspark_entries', JSON.stringify(entries));

  loadEntries();
  
  trackerForm.reset();
  
  saveButton.innerHTML = '<i class="fas fa-check"></i> Salvato!';
  setTimeout(() => {
    saveButton.innerHTML = '<i class="fas fa-save"></i> Salva Progressi';
  }, 1500);
});

historyList.addEventListener('click', (e) => {
  if (e.target.closest('.delete-entry')) {
    const index = e.target.closest('.delete-entry').dataset.index;
    const entries = JSON.parse(localStorage.getItem('mindspark_entries'));
    entries.splice(index, 1);
    localStorage.setItem('mindspark_entries', JSON.stringify(entries));
    loadEntries();
  }
});

loadEntries();