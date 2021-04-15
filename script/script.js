'use strict';

const todoControl = document.querySelector('.todo-control'),
  headerInput = document.querySelector('.header-input'),
  todoList = document.querySelector('.todo-list'),
  todoCompleted = document.querySelector('.todo-completed');


let todoData = [];

if (localStorage.getItem('todoDataLoc')) {
  todoData = JSON.parse(localStorage.getItem('todoDataLoc'));
};

const render = function () {

  todoList.textContent = '';
  todoCompleted.textContent = '';

  todoData.forEach(function (item, id) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
      '<div class="todo-buttons">' +
      '<button button class="todo-remove" ></button >' +
      '<button class="todo-complete"></button>' +
      '</div > ';

    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoComplete = li.querySelector('.todo-complete');
    btnTodoComplete.addEventListener('click', function () {
      item.completed = !item.completed;
      setLocal();
      render();
    });

    const btnTodoDel = li.querySelector('.todo-remove');
    btnTodoDel.addEventListener('click', function () {

      todoData.splice(id, 1);
      setLocal();
      render();
    });

  });

};

todoControl.addEventListener('submit', function (e) {
  e.preventDefault();

  const newTodo = {
    value: headerInput.value,
    completed: false
  };
  headerInput.value = '';

  if (newTodo.value !== '') {
    todoData.push(newTodo);
    setLocal();
  }
  render();
});

const setLocal = function () {
  localStorage.setItem('todoDataLoc', JSON.stringify(todoData));
};

render();