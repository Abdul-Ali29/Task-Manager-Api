const request = require('supertest')
const { set } = require('../src/app')
const app = require('../src/app')
const Task = require('../src/models/task')
const { 
    userOneId,
    userOne,
    userTwo,
    userTwoId,
    setupDatabase,
    taskOne,
    taskTwo,
    taskThree } = require('./fixtures/db')

beforeEach(setupDatabase)


test('Should create task for user', async () => {
    const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
        description: 'from my test'
    })
    .expect(201)

    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
    expect(task.completed).toBe(false)
})

test('Should get all tasks for correct user', async () => {
    const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    expect(201)
    expect(response.body.length).toEqual(2)
   
})

test('Should not delete other user tasks', async () => {
    const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)

    const task = Task.findById(taskOne._id)
    expect(task).not.toBeNull()
})   