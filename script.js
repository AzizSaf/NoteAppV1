
let noteInput =
  document.querySelector('.note_content');
let addNoteBtn =
  document.querySelector('.add_note_btn');
let noteList =
  document.querySelector('.notes_box');
let addBtn =
  document.querySelector('.add_btn');
let addNoteBox =
  document.querySelector('.add_note_box');
let closeMessage =
  document.querySelector('.closeMessage');
let message_box =
  document.querySelector('.message_box');


document.addEventListener('DOMContentLoaded', () => {
  loadNotes();
  addNoteBtn.addEventListener('click', () =>{
    let noteText = noteInput.value.trim();
    if (noteText !== '') {
      addNoteToList(noteText);
      saveNote(noteText);
      noteInput.value = '';
      noteInput.focus();
    } else {
      message_box.style.display = 'flex'
    }
  });
  function addNoteToList(noteText) {
    let colors = ["F63E02", "7F95D1", "F3B700", "FF82A9", "FFC0BE", "FFEBE7", "C200FB", "FFBC0A", "083D77", "EBEBD3", "05B2DC", "033860", "BFACAA", "E1E2EF", "109648", "484349", "ECCFC3", "ECB8A5", "603A40", "AF9BB6", "E4FDE1"]
    let num = Math.floor(Math.random() * colors.length)
    let note = 
      document.createElement('div');
    note.style.background = `#${colors[num]}`
    note.classList.add("note")
    let text =
      document.createElement('p');
    text.textContent = noteText;
    note.appendChild(text);
    noteList.prepend(note);
    note.addEventListener('dblclick', () => {
      removeNote(note, noteText);
    });
  }
  function saveNote(noteText) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notes));
  }
  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(noteText => addNoteToList(noteText));
  }
  function removeNote(li, noteText) {
    li.remove();
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    const index = notes.indexOf(noteText);
    if (index !== -1) {
      notes.splice(index, 1);
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }
});
addBtn.addEventListener('click', () => {
  addNoteBox.classList.add('showANB')
  addBtn.style.display = 'none'
})
setInterval(() => {
  if (document.activeElement !== noteInput
    && noteInput.value === '') {
    addNoteBox.classList.remove('showANB')
    addBtn.style.display = 'flex'
  }
}, 3000)
closeMessage.addEventListener('click', () => {
  message_box.style.display = 'none'
})

