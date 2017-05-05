class CardApp {
    constructor(){
        this.notesContainer = document.querySelector(".notes");
        this.noteInput = document.querySelector("#txtAddNote");
        
        this.buttonAddNote = document.getElementById("btnAddNote");
        this.buttonAddNote.addEventListener("click", this.addNote.bind(this));
        
        this.onload.loadNote;
    }
    
    resetForm(){
        this.noteInput.value = "";
        this.noteInput.focus();
    }

    addNote(e){
        let newNote = document.createElement("div");
        newNote.setAttribute("class", "card");
        newNote.innerHTML = `<p> ${this.noteInput.value} </p>`;

        let noteLink = document.createElement("a");
        noteLink.setAttribute("class", "card-remove");
        noteLink.innerHTML = "Remove";
        noteLink.setAttribute("href", "#");
        noteLink.addEventListener("click", this.removeNote.bind(this));

        newNote.appendChild(noteLink);

        this.notesContainer.appendChild(newNote);
        this.resetForm;
        e.preventDefault();
        this.saveNote;
    }

    removeNote(e){
        let noteToRemove = e.target.parentElement;
        this.notesContainer.removeChild(noteToRemove);
        e.preventDefault();
    }
    
    saveNote(){
        localStorage.setItem("savedNote", noteInput);
        console.log("saved!");
    }
    
    loadNote(){
        document.getElementById("txtAddNote").innerHTML = localStorage.getItem("savedNote");
        console.log('loaded!');
    }
}

let myApp = new CardApp();