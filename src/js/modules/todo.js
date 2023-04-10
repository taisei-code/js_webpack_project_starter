const addForm  = document.querySelector('.td-add-form');
const addInput = document.querySelector('.td-add-input');
const todosUl  = document.querySelector('.todos');
const donesUl  = document.querySelector('.dones');

let todoData = [];

addForm.addEventListener('submit', e => {
  e.preventDefault();
  let todoObj = {
    content: addInput.value.trim(),
    isDone: false
  };
  if(todoObj.content) {
    todoData.push(todoObj);
  }
  addInput.value = '';
  updateLS();
})

function updateLS() {
  localStorage.setItem('myTodo', JSON.stringify(todoData));
}

function getTodoData() {
  return JSON.parse(localStorage.getItem('myTodo'));
}

function createTodoElement(todo) {
  const todoItem          = document.createElement('li');
  const todoContent       = document.createElement('p');
  todoContent.textContent = todo.content;
  todoItem.appendChild(todoContent);

  const btnContainer = document.createElement('div');
  const btn          = document.createElement('img');
  btn.classList.add('td-btn');
  const upBtn = btn.cloneNode(false);
  upBtn.setAttribute('src', './images/todo_button/up.png');

  if(!todo.isDone) {
    btn.setAttribute('src', './images/todo_button/ok.png');
    btnContainer.appendChild(btn);
    btnContainer.appendChild(upBtn);
    todoItem.appendChild(btnContainer);
    todosUl.appendChild(todoItem);
  } else {
    btn.setAttribute('src', './images/todo_button/cancel.png');
    btnContainer.appendChild(btn);
    btnContainer.appendChild(upBtn);
    todoItem.appendChild(btnContainer);
    donesUl.appendChild(todoItem);
  }
}

createElement({content: 'remans to do', isDone: false})
createElement({content: 'already', isDone: true})