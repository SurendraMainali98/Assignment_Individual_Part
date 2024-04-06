const todos = [{
    text: 'Order cat food',
    completed: false
}, {
    text: 'Clean kitchen',
    completed: true
}, {
    text: 'Buy food',
    completed: true
}, {
    text: 'Do work',
    completed: false
}, {
    text: 'Exercise',
    completed: true
}]

const filters = {
    searchText: '',
    hideCompleted: false
}

const renderTodos = function (todos, filters) {
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    // Clear previous content before rendering new todos
    let todosDiv = document.querySelector('#todos')
    todosDiv.innerHTML = ''

    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    todosDiv.appendChild(summary)

    filteredTodos.forEach(function (todo) {
        const todoDiv = document.createElement('div')
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.checked = todo.completed
        const todoText = document.createElement('span')
        todoText.textContent = todo.text
        if (todo.completed) {
            todoText.style.textDecoration = 'line-through'
        }
        todoDiv.appendChild(checkbox)
        todoDiv.appendChild(todoText)
        todosDiv.appendChild(todoDiv)
    })
}

renderTodos(todos, filters)

// Part 1
document.querySelector('#new-todo').addEventListener('submit', function (e) {
    e.preventDefault()

    const input = e.target.elements.todoInput.value
    todos.push({
        text: input,
        completed: false
    })
    renderTodos(todos, filters)

    e.target.elements.todoInput.value = ''
})

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#hide-completed').addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})

// Part 2
const todosDiv = document.querySelector('#todos')
todosDiv.addEventListener('change', function (e) {
    if (e.target.tagName.toLowerCase() === 'input' && e.target.type === 'checkbox') {
        const todoText = e.target.nextElementSibling.textContent.trim()
        const todoIndex = todos.findIndex(todo => todo.text === todoText)
        todos[todoIndex].completed = e.target.checked
        renderTodos(todos, filters)
    }
})
