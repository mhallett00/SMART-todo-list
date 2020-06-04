$(() => {
const loadTodos = function() {
  $.ajax( { url: '/api/to_dos', method: 'GET' } )
    .done(function(result) {
      // console.log("hello", result);
      renderTodos(result.todos);
    })
};


const renderTodos = function(todos) {

  for (let todo of todos) {
    if (todo.category_id === 1){
      $('.film_shows').prepend(createTodo(todo));
    };
    if (todo.category_id === 2) {
      $('.restaurants').prepend(createTodo(todo));
    };
    if (todo.category_id === 3) {
      $('.products').prepend(createTodo(todo));
    };
    if (todo.category_id === 4){
      $('.books').prepend(createTodo(todo));
    };
    if (todo.category_id === 5) {
      $('.uncategorized').prepend(createTodo(todo));
    };
    $(`#item-${todo.id}`).click(()=>{
      $('#myModal').modal();
      console.log(todo.id);
      $("input[type='radio']").attr("id", `${todo.id}`);
      // add temporary html tag of todo.id
      // alert(JSON.parse(JSON.stringify(todo)))
    })
  };

};
// somehow we need to tie modal show with this modal
    $("input[type='radio']").click(()=>{
      const category_id = Number($("input[name='optradio']:checked").val());
      const id = Number($("input[name='optradio']:checked").attr("id"));
      // console.log('hello', radioCatId, radioItemId);
      $.ajax({ url: '/api/to_dos/edit', method: 'POST', data: {category_id, id} })
      .done(function(result) {
        $('#myModal').modal('hide');
        $("input[type='radio']").removeAttr("id");
        $(`#item-${id}`).remove();
        renderTodos(result);

      })
    });


$('#newToDo').submit(function(event) {
  event.preventDefault();
  const name = this.elements.name.value
  console.log('submission', name)
  $.ajax( { url: '/api/to_dos', method: 'POST', data: { name } })
    .done(function(result) {
      // console.log(result)
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
