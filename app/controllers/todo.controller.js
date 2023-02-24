const db = require("../models");
const todo = db.todos;
const Op = db.Sequelize.Op;

// Create and Save a new todo
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a todo
    const todoData = {
        title: req.body.title,
        completed: !!(req.body.completed)
    };

    // Save todo in the database
    todo.create(todoData)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the todo."
            });
        });
};

// Retrieve all todos from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {title: {[Op.like]: `%${title}%`}} : null;

    todo.findAll({where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving todos."
            });
        });
};

// Find a single todo with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    todo.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find todo with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving todo with id=" + id
            });
        });
};

// Mark Completed a todo by the id in the request
exports.markCompleted = (req, res) => {
    req.body = {
        completed: true
    }

    exports.update(req, res);
}

// Mark Uncompleted a todo by the id in the request
exports.markUncompleted = (req, res) => {
    req.body = {
        completed: false
    }

    exports.update(req, res);
}


// Update a todo by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    todo.update(req.body, {
        where: {id: id}
    })
        .then(num => {
            let message = "todo was updated successfully.";

            if (num !== 1) {
                message = `Cannot update todo with id=${id}. Maybe todo was not found or body is empty!`;
            }

            res.send({message});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating todo with id=" + id
            });
        });
};

// Delete a todo with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    todo.destroy({
        where: {id: id}
    })
        .then(num => {
            let message = "todo was deleted successfully!";

            if (num !== 1) {
                message = `Cannot delete todo with id=${id}. Maybe todo was not found!`;
            }

            res.send({message});
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete todo with id=" + id
            });
        });
};

exports.findCompleted = (req, res) => {
    req.body = {
        completed: true
    }

    exports.findByCompleteStatus(req, res);
}

exports.findUncompleted = (req, res) => {
    req.body = {
        completed: false
    }

    exports.findByCompleteStatus(req, res);
}

exports.findByCompleteStatus = (req, res) => {
    const status = req.body.completed || false;

    todo.findAll({where: {completed: status}})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving todos."
            });
        });
};
