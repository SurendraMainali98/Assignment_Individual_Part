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
    // Part 1: Filtering todos based on search text and completion status
    const filteredTodos = todos.filter(function (todo) {
        const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        const hideCompletedMatch = !filters.hideCompleted || !todo.completed

        return searchTextMatch && hideCompletedMatch
    })

    const incompleteTodos = filteredTodos.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector('#todos').innerHTML = ''

    const summary = document.createElement('h2')
    summary.textContent = `You have ${incompleteTodos.length} todos left`
    document.querySelector('#todos').appendChild(summary)

    // Part 2: Creating checkbox inputs for todos and adding event listener
    filteredTodos.forEach(function (todo) {
        const todoEl = document.createElement('div')
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.checked = todo.completed
        todoEl.appendChild(checkbox)

        const todoText = document.createElement('span')
        if (todo.completed) {
            const strikeThrough = document.createElement('s')
            strikeThrough.textContent = todo.text
            todoText.appendChild(strikeThrough)
        } else {
            todoText.textContent = todo.text
        }
        todoEl.appendChild(todoText)

        document.querySelector('#todos').appendChild(todoEl)

        // Add event listener for checkbox
        checkbox.addEventListener('change', function () {
            todo.completed = !todo.completed
            renderTodos(todos, filters)
        })
    })
}

renderTodos(todos, filters)

// Event listeners for filtering and adding todos
document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector('#hide-completed').addEventListener('change', function (e) {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})

document.querySelector('#new-todo').addEventListener('submit', function (e) {
    e.preventDefault()
    const text = e.target.elements[0].value.trim()
    if (text.length > 0) {
        todos.push({
            text,
            completed: false
        })
        renderTodos(todos, filters)
        e.target.elements[0].value = ''
    }
})
