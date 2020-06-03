$(() => {
const loadTodos = function() {
  $.ajax( { url: '/api/to_dos', method: 'GET' } )
    .done(function(result) {
      console.log("hello", result);
      renderTodos(result.todos);
    })
};


const renderTodos = function(todos) {

  for (let todo of todos) {
    if (todo.category_id === 1){
      $('#film_shows').append(createTodo(todo.name));
    };
    if (todo.category_id === 2) {
      $('#restaurants').append(createTodo(todo.name));
    };
    if (todo.category_id === 3) {
      $('#products').append(createTodo(todo.name));
    };
    if (todo.category_id === 4){
      $('#books').append(createTodo(todo.name));
    };
    if (todo.category_id === 5) {
      $('#uncategorized').append(createTodo(todo.name));
    };
  };

};


$('#newToDo').submit(function(event) {
  event.preventDefault();
  const name = this.elements.name.value
  $.ajax( { url: '/api/to_dos', method: 'POST', data: { name } })
  .done(function(result) {
    renderTodos(result);
  })
});

// creates an html snippet to wrap a new todo for display
const createTodo = function(todo) {
  const $todo = $(`<p>${todo}</p>`);
  return $todo;
};

// $('#').click(function(event) {

// })

loadTodos();


});
