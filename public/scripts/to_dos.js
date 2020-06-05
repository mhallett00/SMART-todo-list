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
    if (todo.category_id === 1 && todo.status_id !== 3){
      $('.film_shows').prepend(createTodo(todo));
    };
    if (todo.category_id === 2 && todo.status_id !== 3) {
      $('.restaurants').prepend(createTodo(todo));
    };
    if (todo.category_id === 3 && todo.status_id !== 3) {
      $('.products').prepend(createTodo(todo));
    };
    if (todo.category_id === 4 && todo.status_id !== 3){
      $('.books').prepend(createTodo(todo));
    };
    if (todo.category_id === 5 && todo.status_id !== 3) {
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

  $('input[type="checkbox"]').click(function() {
    const $todoId = $(this).attr('value');
    const $status_id = 2
    if ($(this).is(":checked")) {
      $(this).siblings('label').addClass('strike');
      $.ajax({ url: '/api/to_dos/status', method: 'POST', data: { status_id: 2, id: $todoId }})
        .done(function(result) {
        })
    } else if ($(this).is(":not(:checked)")) {
      console.log("Checkbox is unchecked.");
      $(this).siblings('label').removeClass('strike');
      $.ajax({ url: '/api/to_dos/status', method: 'POST', data: { status_id: 1, id: $todoId }})
        .done(function(result) {
        })
      console.log($(this).attr('value'));
    }
  });

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
        $(`#divCheck${id}`).remove();
        renderTodos(result);

      })
    });

    $("#tododelete").click(()=>{
      const status_id = 3;
      const id = Number($("input[name='optradio']:checked").attr("id"));
      console.log('hello', typeof status_id, status_id);
      $.ajax({ url: '/api/to_dos/status', method: 'POST', data: {status_id, id} })
      .done(function(result) {
        $('#myModal').modal('hide');
        $("input[type='radio']").removeAttr("id");
        $(`#divCheck${id}`).remove();
      })
    });


$('#newToDo').submit(function(event) {
  event.preventDefault();
  const name = this.elements.name.value
  console.log('submission', name)
  if (name) {
    $.ajax( { url: '/api/to_dos', method: 'POST', data: { name } })
      .done(function(result) {
        // console.log(result)
        renderTodos(result);
      })
  } else {
    alert("Surely you'd like to add an item?");
  }
});

// creates an html snippet to wrap a new todo for display
const createTodo = function(todo) {
  console.log(todo);
  let statusComplete = "";
  let checkBox = "";
  if (todo.status_id === 2) {
    statusComplete = "strike"
    checkBox = "checked";
  };
  const $todo = $( `
  <div class="form-check" id="divCheck${todo.id}">
  <input class="form-check-input" ${checkBox} type="checkbox" value="${todo.id}" id="defaultCheck${todo.id}">
  <label class="form-check-label ${statusComplete}" for="defaultCheck1" id='item-${todo.id}'>
  ${todo.name}
  </label>
  </div>`);

  return $todo;
};

loadTodos();


});
