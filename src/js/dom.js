const { getStoredNotes, saveNotes } = require('./storage.js');

const initializeApp = () => {
    const notes = document.getElementById('notes');
    const buttonadd = document.getElementById('add');
    const noteDisplay = document.getElementById('the-fin-note');
    const info = document.getElementById('info');
    const inputTitle = document.getElementById('inputTitle');
    const inputDate = document.getElementById('inputDate');
    const inputText = document.getElementById('inputText');
    const buttonAddUpdate = document.getElementById('create-update');
    
    let tempIndex;
    let idval = 0;
    let index = getStoredNotes();

    buttonadd.addEventListener('click', () => {
        notes.classList.add('hidden');
        info.classList.toggle('hidden');
    });
    
    buttonAddUpdate.addEventListener("click", () => {
        if(buttonAddUpdate.innerText === "Update A Note") {
            index.forEach((i) => {
                if(index.indexOf(i) === tempIndex) {
                    i.title = inputTitle.value;
                    i.date = inputDate.value;
                    i.description = inputText.value;
                }
            });
            saveNotes(index);
            iterativeIndex(index);
            notes.classList.remove('hidden');
            info.classList.toggle('hidden');
            reset();
            buttonAddUpdate.innerText = "Add To My List";
        } else {
            updateTemp();
            iterativeIndex(index);
            info.classList.toggle('hidden');
            notes.classList.remove('hidden');
            reset();
        }
    });

    const reset = () => {
        inputTitle.value = "";
        inputDate.value = "";
        inputText.value = "";
    };

    const updateTemp = () => {
        const temp = {
            title: inputTitle.value,
            description: inputText.value,
            date: inputDate.value,
            id: idval
        };
        idval++;
        index.push(temp);
        saveNotes(index);
    };

    const iterativeIndex = (index) => {
        noteDisplay.innerHTML = "";
        index.forEach((i) => {
            noteDisplay.insertAdjacentHTML("beforeend", `
            <div id="${i.id}">
                <p><strong>Title: </strong>${i.title}</p>
                <p><strong>Date: </strong>${i.date}</p>
                <p><strong>Description: </strong>${i.description}</p>
                <button class="edit" onclick="editing(this)">Edit</button>   
                <button class="delete" onclick="Deleting(this)">Delete</button> 
            </div>`);
        });
    };

    window.editing = (button) => {
        const arrayIndex = button.parentElement.id;
        const n = index.find(i => i.id === Number(arrayIndex));
        tempIndex = index.indexOf(n);
        const title = index[tempIndex].title;
        const date = index[tempIndex].date;
        const description = index[tempIndex].description;
        inputTitle.value = title;
        inputDate.value = date;
        inputText.value = description;
        buttonAddUpdate.innerText = "Update A Note";
        notes.classList.add('hidden');
        info.classList.toggle('hidden');
    };

    window.Deleting = (button) => {
        const itemId = button.parentElement.id;
        index = filterFrom(itemId);
        saveNotes(index);
        iterativeIndex(index);
    };

    const filterFrom = (itemId) => {
        return index.filter(i => i.id != itemId);
    };

    // Initial render
    iterativeIndex(index);
};

module.exports =initializeApp
