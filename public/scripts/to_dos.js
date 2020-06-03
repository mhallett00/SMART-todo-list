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
      $('#film_shows').append(createTodo(todo));
    };
    if (todo.category_id === 2) {
      $('#restaurants').append(createTodo(todo));
    };
    if (todo.category_id === 3) {
      $('#products').append(createTodo(todo));
    };
    if (todo.category_id === 4){
      $('#books').append(createTodo(todo));
    };
    if (todo.category_id === 5) {
      $('#uncategorized').append(createTodo(todo));
    };
    $(`#item-${todo.id}`).click(()=>{

      alert(JSON.stringify(todo))
    })
  };

};



$('#newToDo').submit(function(event) {
  event.preventDefault();
  const name = this.elements.name.value
  $.ajax( { url: '/api/to_dos', method: 'POST', data: { name } })
    .done(function(result) {
      console.log(result)
      renderTodos(result);
    })
});

// creates an html snippet to wrap a new todo for display
const createTodo = function(todo) {
  console.log(todo)
  const $todo = $(`<p id='item-${todo.id}' >${todo.name}</p>`);
  return $todo;
};

//brings up edit menu
// $("p").click(function(event) {
  // event.preventdefault();
  // const name = this.element.name.value
  // console.log(this);
  // alert(event);
  // $.ajax( {url: '/api/to_dos/edit', mehtod: 'GET', data: {name} })
  // .done(function(result) {

  // })
// })

//posts to do edit
// $('').click(function(event) {
//   event.preventdefault();
//   const name = this.element.name.value
//   $.ajax( {url: '/api/to_dos/edit', method: 'POST', data: {name} })
//   .done(function(result) {
//     updateTodo(catid, getTodoInfo(name) )
//   })
// })

loadTodos();


});
