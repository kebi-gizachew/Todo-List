const { getStoredNotes, saveNotes } = require("./storage.js");

const initializeApp = () => {
  const notes = document.getElementById("notes");
  const buttonadd = document.getElementById("add");
  const noteDisplay = document.getElementById("the-fin-note");
  const info = document.getElementById("info");
  const inputTitle = document.getElementById("inputTitle");
  const inputDate = document.getElementById("inputDate");
  const inputText = document.getElementById("inputText");
  const buttonAddUpdate = document.getElementById("create-update");

  let tempIndex;
  let idval = 0;
  let index = getStoredNotes();

  buttonadd.addEventListener("click", () => {
    notes.classList.add("hidden");
    info.classList.toggle("hidden");
  });

  buttonAddUpdate.addEventListener("click", () => {
    if (buttonAddUpdate.innerText === "Update A Note") {
      index.forEach((i) => {
        if (index.indexOf(i) === tempIndex) {
          i.title = inputTitle.value;
          i.date = inputDate.value;
          i.description = inputText.value;
        }
      });
      saveNotes(index);
      iterativeIndex(index);
      notes.classList.remove("hidden");
      info.classList.toggle("hidden");
      reset();
      buttonAddUpdate.innerText = "Add To My List";
    } else {
      updateTemp();
      iterativeIndex(index);
      info.classList.toggle("hidden");
      notes.classList.remove("hidden");
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
      id: idval,
    };
    idval++;
    index.push(temp);
    saveNotes(index);
  };

  const iterativeIndex = (index) => {
    noteDisplay.innerHTML = "";
    index.forEach((i) => {
      const div = document.createElement("div");
      div.id = i.id;
      div.innerHTML = `
        <p><strong>Title: </strong>${i.title}</p>
        <p><strong>Date: </strong>${i.date}</p>
        <p><strong>Description: </strong>${i.description}</p>
        <button class="edit">Edit</button>   
        <button class="delete">Delete</button> 
      `;

      // attach event listeners here (no window.*)
      div.querySelector(".edit").addEventListener("click", () => editing(div));
      div.querySelector(".delete").addEventListener("click", () => Deleting(div));

      noteDisplay.appendChild(div);
    });
  };

  const editing = (div) => {
    const arrayIndex = div.id;
    const n = index.find((i) => i.id === Number(arrayIndex));
    tempIndex = index.indexOf(n);

    inputTitle.value = index[tempIndex].title;
    inputDate.value = index[tempIndex].date;
    inputText.value = index[tempIndex].description;

    buttonAddUpdate.innerText = "Update A Note";
    notes.classList.add("hidden");
    info.classList.toggle("hidden");
  };

  const Deleting = (div) => {
    const itemId = div.id;
    index = filterFrom(itemId);
    saveNotes(index);
    iterativeIndex(index);
  };

  const filterFrom = (itemId) => {
    return index.filter((i) => i.id != itemId);
  };

  // Initial render
  iterativeIndex(index);
};

module.exports = initializeApp;
