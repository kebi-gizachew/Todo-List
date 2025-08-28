// Todo class
function Todo(title, description, date, id) {
    this.title = title;
    this.description = description;
    this.date = date;
    this.id = id;
}

// Add any methods you need for Todo objects
Todo.prototype.update = function(title, description, date) {
    this.title = title;
    this.description = description;
    this.date = date;
};

module.exports = Todo;