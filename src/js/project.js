// Project class
function Project(name) {
    this.name = name;
    this.todos = [];
}

Project.prototype.addTodo = function(todo) {
    this.todos.push(todo);
};

Project.prototype.removeTodo = function(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
};

module.exports = Project;