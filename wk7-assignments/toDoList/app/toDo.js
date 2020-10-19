let toDoList = document.getElementById("toDoList")
let itemText = document.getElementById("itemText")
let priorityText = document.getElementById("priorityText")
let dateText = document.getElementById("dateCreatedText")
let addButton = document.getElementById("addButton")


addButton.addEventListener('click', () => {
    // give the values of the textBoxes to variables
    let item = itemText.value 
    let priority = priorityText.value 
    let date = dateText.value 

    // send all of the added information to the server as a POST
    fetch('http://localhost:3000/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            item: item,
            priority: priority,
            date: date
        })
    }).then(response => response.json())
    .then(result => {
        if(result.success) {
            // this will fetch the list again and refresh 
            populateToDoList()
        }
    })
})

function populateToDoList() {
    // clear the list so it doesn't add on each time
    toDoList.innerHTML = ''

    fetch('http://localhost:3000/todos')
    .then(response => response.json())
    .then(todos => {
        let items = todos.map((item) => {
            return `
            <li><h3>${item.item}</h3>
            <li>Priority level: ${item.priority}</li>
            <li>Date created: ${item.date}</li>
            </li>
            `
        })
        toDoList.insertAdjacentHTML('beforeend', items.join(''))
    })
}

populateToDoList()