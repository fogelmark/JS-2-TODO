let limit = 7

const TODO_URL = `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
const ID_URL = 'https://jsonplaceholder.typicode.com/todos/'

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
  })
}

/* Skapa listans element */
const createListElement = (todoData) => {
  
  const item = document.createElement('div')
  item.classList.add('item-container')

  const checkbox = document.createElement('input')
  checkbox.type = 'checkbox'
  checkbox.classList.add('task-checkbox')

  const task = document.createElement('p')
  task.id = todoData.id
  task.classList.add('task-title')
  task.innerText = todoData.title

  const button = document.createElement('button')
  button.id = todoData.id
  button.classList.add('delete-button')
  button.innerText = 'delete'

  if (todoData.completed === true) {
    task.classList.add('strike')
    checkbox.setAttribute('checked', true)
  }

  button.addEventListener('click', e => {
    console.log(e.target.id);
    fetch(ID_URL + e.target.id, {
      method: 'DELETE'
    })
      .then(res => {
        // console.log(res)
        if (!task.classList.contains('strike')) {
          console.log('JUST STICK IT IN THE GLORY HOLE');
          return
        } else if (res.ok) {
          button.parentElement.remove()
          const todoIndex = todosArray.findIndex(task => task.id == e.target.id)
          todosArray.splice(todoIndex, 1)
          // console.log(todosArray);
        }
      })
  })

  item.appendChild(checkbox)
  item.appendChild(task)
  item.appendChild(button)

  return item
}

const addTask = e => {
  e.preventDefault()

  let inputValue = document.querySelector('input[type="text"]').value
  
  if (inputValue === '') {
    document.querySelector('.error-message').classList.remove('hidden')
  } else {
    const newTask = {
      title: inputValue,
      completed: false
    }
  
    // limit++

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

const changeStatus = e => {
  if (e.target.nodeName === 'DIV') {
    e.target.querySelector('p').classList.toggle('strike')
    e.target.querySelector('.task-checkbox').toggleAttribute('checked')
  }
}



output.addEventListener('click', changeStatus)
form.addEventListener('submit', addTask)


