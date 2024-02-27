

//localStorage.setItem('key', 'value');
/*let MyData = 
[
  {
    text: "hello"
  }
]*/
//localStorage.setItem('data', "aziz saf");

/* To retrieve data */
//const data = localStorage.getItem('data');
//console.log(data)


/* To remove data */
//localStorage.removeItem('key');

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

document.addEventListener('DOMContentLoaded', () => {
  // Load notes from local storage when the page loads
  loadNotes();

  addNoteBtn.addEventListener('click', () =>{
    let noteText = noteInput.value.trim();
    if (noteText !== '') {
      addNoteToList(noteText);
      saveNote(noteText);
      noteInput.value = '';
      noteInput.focus();
    } else {
      alert('Please enter a note before adding.');
    }
  });

  function addNoteToList(noteText) {
    let colors = ["red", "blue", "orange", " green"]
    let num = Math.floor(Math.random() * colors.length)
    let note = 
      document.createElement('div');
    note.className = 'note'
    note.setAttribute('onclick','openNote(this)')
    note.style.background = `${colors[num]}`
    let text =
      document.createElement('p');
    text.textContent = noteText;
    note.appendChild(text);
    
    /*
    let removeBtn =
      document.createElement('button');
    removeBtn.textContent = 'X';
    removeBtn.className = 'removeNoteBtn'
    span.appendChild(removeBtn);
    */
    noteList.appendChild(note);
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
    // Remove note from the UI
    li.remove();
    // Remove note from local storage
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

function openNote() {
  console.log(this.class)
  this.classList.add('openNote')
}
