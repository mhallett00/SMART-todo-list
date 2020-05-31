$(() => {
const loadTodos = function() {
  $.ajax( { url: '/api/to_dos', method: 'GET' } )
    .done(function(todos) {
      renderTodos(todos);
    })
};

const renderTodos = function(todos) {
// loop through todos JSON that it's passed
// then this function will handle it or a helper will
// will have to sort todos by category
// THEN another helper in here that will create html snippet (like <p>) to append to list
// or append row to table
// renderTodos will do actual appending
let arrs = todos.to_dos;
for (let todo of arrs) {
  $('#restaurant').append(createTodo(todo.name));

}
};


const createTodo = function(todo) {
  const $todo = $(`<p>${todo}</p>`);
  return $todo;
}

loadTodos();


});
