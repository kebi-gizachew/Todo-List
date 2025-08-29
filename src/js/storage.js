const getStoredNotes = () => {
  return JSON.parse(localStorage.getItem("note")) || [];
};

const saveNotes = (notes) => {
  localStorage.setItem("note", JSON.stringify(notes));
};

module.exports = {
  getStoredNotes,
  saveNotes,
};
