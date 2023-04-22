const addForm       = document.querySelector('.td-add-form');
const addInput      = document.querySelector('.td-add-input');
const todosUl       = document.querySelector('.todos');
const donesUl       = document.querySelector('.dones');
const searchForm    = document.querySelector('.td-search-form');
const searchInput   = document.querySelector('.td-search-input');

// 追加されたタスクを配列で管理
let todoData = [];

// タスクが追加された時の処理
addForm.addEventListener('submit', e => {
  e.preventDefault();

  // 入力された文字列を取得してオブジェクトに格納
  let todoObj = {
    // inputに入力された値（タスク）を管理
    content: addInput.value.trim(),
    // タスク完了・未完了を管理
    isDone: false
  };
  console.log(todoObj);

  if(todoObj.content) {
    // 配列にタスクを追加していく処理
    todoData.push(todoObj);
  }
  console.log(todoData);

  addInput.value = '';
  updateLS();
  updateTodo();
})

// ローカルストレージにデータを保存
function updateLS() {
  localStorage.setItem('myTodo', JSON.stringify(todoData));
}

// ローカルストレージに保存されたデータを取得
function getTodoData() {
  return JSON.parse(localStorage.getItem('myTodo')) || [] ;
}

function createTodoElement(todo) {
  const todoItem          = document.createElement('li');
  todoItem.classList.add('td-item');
  const todoContent       = document.createElement('p');
  todoContent.classList.add('td-content');
  todoContent.textContent = todo.content;
  todoItem.appendChild(todoContent);

  const btnContainer = document.createElement('div');
  btnContainer.classList.add('td-btn-container');
  const btn          = document.createElement('img');
  btn.classList.add('td-btn');
  const upBtn = btn.cloneNode(false);
  upBtn.setAttribute('src', './images/todo_button/up.png');

  if(!todo.isDone) {
    upBtn.classList.add('edit-btn');
    btn.classList.add('isDone-btn');

    btn.setAttribute('src', './images/todo_button/ok.png');
    btnContainer.appendChild(btn);
    btnContainer.appendChild(upBtn);
    todoItem.appendChild(btnContainer);
    todosUl.appendChild(todoItem);

  } else {
    upBtn.classList.add('undo-btn');
    btn.classList.add('delete-btn');

    btn.setAttribute('src', './images/todo_button/cancel.png');
    btnContainer.appendChild(btn);
    btnContainer.appendChild(upBtn);
    todoItem.appendChild(btnContainer);
    donesUl.appendChild(todoItem);

  }

  // ボタンクリックでリスト移動
  todoItem.addEventListener('click', e => {
    if(e.target.classList.contains('isDone-btn')) {
      todo.isDone = true;
    }
    if(e.target.classList.contains('undo-btn')) {
      todo.isDone = false;
    }
    if(e.target.classList.contains('edit-btn')) {
      addInput.value = e.target.parentElement.previousElementSibling.textContent;
      todoData = todoData.filter(data => data !== todo);
      addInput.focus();
    }
    if(e.target.classList.contains('delete-btn')) {
      todoData = todoData.filter(data => data !== todo);
    }
    updateLS();
    updateTodo();
  })
}

function updateTodo() {
  todosUl.innerHTML = '';
  donesUl.innerHTML = '';
  todoData = getTodoData();
  todoData.forEach(todo => {
    createTodoElement(todo);
  })
}

updateTodo();

searchForm.addEventListener('submit', () => {
  e.preventDefault();
})

searchInput.addEventListener('keyup', () => {
  const searchWord = searchInput.value.trim().toLowerCase();
  const todoItems  = document.querySelectorAll('.td-item');
  todoItems.forEach(todoItem => {
    todoItem.classList.remove('hide');
    if(!todoItem.textContent.toLocaleLowerCase().includes(searchWord)) {
      todoItem.classList.add('hide');
    }
  })
})