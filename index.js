const express = require('express')
const uuid = require('uuid')
const port = 3000

const app = express()
app.use(express.json())

// Query params - meusite.com/users?nome=edmar&age=38 // Filtros
// Route params - /users/2  // Buscar, deletar ou atualizar algo específico
// Request Body - { "name": "Edmar", "age":}

//app.get('/users', (request, response) => {

    //const { name, age } = request.body

    //return response.json({ name, age })

   // Ex: do query params console.log(request.query)

   //const {id} = request.params

   //console.log(id)

//const { name, age } = request.query

//return response.json({id})

    // return response.json({name, age})
//})

const users = []       // usar essa const para apenas fins de estudo o certo é mandar para um banco de dados

const checkUserId = (request, response, next) => {
    const { id } = request.params
    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({ error: "User not found"})
    }

    request.userIndex = index
    request.userId = id

    next()

}

app.get('/users', (request, response) => {

   

    return response.json(users)

})

app.post('/users', (request, response) => {

    const { name, age } = request.body

    const user = { id:uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)

})

app.put('/users/:id', checkUserId, (request, response) => {

    //const { id } = request.params
    const { name, age } = request.body
    const index = request.userIndex
    const id = request.userId

    const updateUser = { id, name, age }

    //const index = users.findIndex(user => user.id === id)

    //if(index < 0){
        //return response.status(404).json({ error: "User not found"})
    //}

   users[index] = updateUser



    return response.json(updateUser)

})

app.delete('/users/:id', checkUserId, (request, response) => {

    const index = request.userIndex

    //const { id } = request.params

    //const index = users.findIndex(user => user.id === id)

    /*if(index < 0){
        return response.status(404).json({ error: "User not found"})
    }*/

    users.splice(index,1)

    return response.status(204).json()

})

app.listen(port, () =>{
    console.log('😎 Server started on port $(port)')
})


// Get - buscar informação do back-end
// Post - criar informação no back-end
// Put / Patch - Alterar Atualizar informação no back-end
// Delete - Deletar informação no back-end

// Middlewares - Interceptador - Tem o poder de parar ou alterar dados da requisição.