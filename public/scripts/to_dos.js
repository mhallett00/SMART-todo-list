$(() => {

  const loadTodos = function() {
    $.ajax({ url: '/api/to_dos', method: 'GET' })
      .done(function(result) {
        renderTodos(result.todos);
      });
  };


  const renderTodos = function(todos) {

    for (let todo of todos) {
      if (todo.category_id === 1 && todo.status_id !== 3) {
        $('.film_shows').prepend(createTodo(todo));
      }
      if (todo.category_id === 2 && todo.status_id !== 3) {
        $('.restaurants').prepend(createTodo(todo));
      }
      if (todo.category_id === 3 && todo.status_id !== 3) {
        $('.products').prepend(createTodo(todo));
      }
      if (todo.category_id === 4 && todo.status_id !== 3) {
        $('.books').prepend(createTodo(todo));
      }
      if (todo.category_id === 5 && todo.status_id !== 3) {
        $('.uncategorized').prepend(createTodo(todo));
      }
      $(`#item-${todo.id}`).click(()=>{
        $('#myModal').modal();
        $("input[type='radio']").attr("id", `${todo.id}`);
      });
    }

    $('input[type="checkbox"]').click(function() {
      const $todoId = $(this).attr('value');
      const $status_id = 2;
      if ($(this).is(":checked")) {
        $(this).siblings('label').addClass('strike');
        $.ajax({ url: '/api/to_dos/status', method: 'POST', data: { status_id: 2, id: $todoId }})
          .done(function(result) {
          });
      } else if ($(this).is(":not(:checked)")) {
        $(this).siblings('label').removeClass('strike');
        $.ajax({ url: '/api/to_dos/status', method: 'POST', data: { status_id: 1, id: $todoId }})
          .done(function(result) {
          });
      }
    });

  };

  $("input[type='radio']").click(()=>{
    const category_id = Number($("input[name='optradio']:checked").val());
    const id = Number($("input[name='optradio']:checked").attr("id"));
    $.ajax({ url: '/api/to_dos/edit', method: 'POST', data: {category_id, id} })
      .done(function(result) {
        $('#myModal').modal('hide');
        $("input[type='radio']").removeAttr("id");
        $(`#divCheck${id}`).remove();
        renderTodos(result);

      });
  });

  $("#tododelete").click(()=>{
    const status_id = 3;
    const id = Number($("input[name='optradio']:checked").attr("id"));
    $.ajax({ url: '/api/to_dos/status', method: 'POST', data: {status_id, id} })
      .done(function(result) {
        $('#myModal').modal('hide');
        $("input[type='radio']").removeAttr("id");
        $(`#divCheck${id}`).remove();
      });
  });


  $('#newToDo').submit(function(event) {
    event.preventDefault();
    const name = this.elements.name.value;
    if (name) {
      $.ajax({ url: '/api/to_dos', method: 'POST', data: { name } })
        .done(function(result) {
          renderTodos(result);
        });
    } else {
      alert("Surely you'd like to add an item?");
    }
  });

  // creates an html snippet to wrap a new todo for display
  const createTodo = function(todo) {
    let statusComplete = "";
    let checkBox = "";
    if (todo.status_id === 2) {
      statusComplete = "strike";
      checkBox = "checked";
    }
    const $todo = $(`
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
