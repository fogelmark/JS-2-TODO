let limit = 7

const TODO_URL = `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`


/* Tom array där datan ska ligga */
const todosArray = []

const output = document.querySelector('#output')


/* Hämta datan från URLen */
const fetchTodos = async () => {
  const response = await fetch(TODO_URL)
  const data = await response.json()

  /* Pusha datan i tomma arrayen */
  data.forEach(todos => {
    todosArray.push(todos)
  });
  printList()
}
fetchTodos()


/* Printa listan i DOM. Exekveras i fetchTodos ^ */
const printList = () => {
  output.textContent = ''


  todosArray.forEach(todos => {
    const listElement = createListElement(todos)
    output.appendChild(listElement)
    console.log(todos);
  })
}

/* Skapa listan */
const createListElement = (todoData) => {

  const item = document.createElement('div')
  item.classList.add('item-container')

  const task = document.createElement('p')
  task.innerText = todoData.title

  const button = document.createElement('button')
  button.innerText = 'delete'

  button.addEventListener('click', (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
      });
    button.parentElement.remove()
  })

  item.appendChild(task)
  item.appendChild(button)

  return item
}


const submitTask = e => {
  e.preventDefault()

  let inputValue = document.querySelector('input[type="text"]').value
  
  if (inputValue === '') {
    document.querySelector('.error-message').classList.remove('hidden')
  } else {
    const newTask = {
      userId: 1,
      title: inputValue,
      id: limit + 1,
      completed: false
    }
  
    limit++
    
    console.log(newTask);
  
    fetch(TODO_URL, {
    method: 'POST',
    body: JSON.stringify(newTask),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      todosArray.push(data)
      const listElement = createListElement(data)
      output.appendChild(listElement)
      document.querySelector('.error-message').classList.add('hidden')
    });
  }
  form.reset()
}

console.log(todosArray);

form.addEventListener('submit', submitTask)


