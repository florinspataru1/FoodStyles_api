module.exports = (sequelize, Sequelize) => {
    const todo = sequelize.define("todo", {
        title: {
            type: Sequelize.STRING
        },
        completed: {
            type: Sequelize.BOOLEAN
        }
    });

    return todo;
};
