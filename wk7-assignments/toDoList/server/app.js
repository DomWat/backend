const express = require('express')
const app = express()
const cors = require('cors')

// allows html to access the server info
app.use(cors())
// lets you parse the json info
app.use(express.json())

// an array that will contain the items chosen by user
let toDoListArray = []

// this will create the root route
app.get('/', (req, res) => {
    res.send('This is working!')
})

// create the get so all information will be visible
app.get('/todos', (req, res) => {
    res.json(toDoListArray)
})

// create the post so information will be added to the server
app.post('/todos', (req, res) => {
    // getting to do list from user
    let item = req.body.item
    // getting priority from user
    let priority = req.body.priority
    // getting date
    let date = req.body.date

    // check if item, priority, date is not null
    if (item != null && priority != null && date != null) {
        // creates an object from users info and pushes to array
        let task = { item: item, priority: priority, date: date }
        toDoListArray.push(task)
        res.json({ success: true })
    } else {
        res.json({success: false, errorMessage: 'Unable to add task'})
    }

})



// this is how you start the server
app.listen(3000, () => {
    console.log('The server is running...')
})