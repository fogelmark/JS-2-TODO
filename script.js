const TODO_URL = 'https://jsonplaceholder.typicode.com/todos?_limit=7'


const form = document.querySelector('#form')
// const addTask = document.querySelector('.add-button')

const output = document.querySelector('#output')
const ul = document.createElement('ul')
output.append(ul)

const addTodo = async () => {
  const todo = document.querySelector('input[type=text]')
  try {
    const response = await fetch(TODO_URL, {
      method: 'POST',
      body: JSON.stringify({
        title: todo.value,
        completed: false,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    const data = await response.json()
    console.log(data);
    // output.innerText += data.title
    const li = document.createElement('li')
    ul.appendChild(li)
    li.textContent += data.title
  } catch (error) {
    console.log('något gick fel');
  }
}

// const getTodos = async () => {
//   const res = await fetch(TODO_URL)
//   const data = await res.json()
//   console.log(data);
  
//   data.forEach(todo => {
//     const li = document.createElement('li')
//     li.classList.add('list-item')
//     ul.appendChild(li)
//     li.textContent = todo.title
//   })
// }
// getTodos()

form.addEventListener('submit', e => {
  e.preventDefault()
  addTodo()
})