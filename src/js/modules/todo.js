const addForm  = document.querySelector('.td-add-form');
const addInput = document.querySelector('.td-add-input');

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