const todos = require("../controllers/todo.controller");

module.exports = app => {

    var router = require("express").Router();

    // Create a new todo
    router.post("/createTodo", todos.create);

    // Retrieve all todos
    router.get("/listTodos", todos.findAll);

    // Retrieve all completed todos
    router.get("/completed", todos.findCompleted);

    // Retrieve all uncompleted todos
    router.get("/uncompleted", todos.findUncompleted);

    // Retrieve a single todo with id
    router.get("/:id", todos.findOne);

    // Mark todo with id as completed
    router.put("/markTodoCompleted/:id", todos.markCompleted);

    // Mark todo with id as uncompleted
    router.put("/markTodoUncompleted/:id", todos.markUncompleted);

    // Delete a todo with id
    router.delete("/deleteTodo/:id", todos.delete);

    app.use('/api/todos', router);
};
