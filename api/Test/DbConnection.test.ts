import * as mongoose from 'mongoose'
require('dotenv').config()

//test skipped by default as it will not pass on GitHub
describe.skip('MongoDB Atlas connection test', () => {
  let connection
  console.log(process.env)
  beforeAll(async () => {
    jest.resetModules()
    connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  })

  test('Should be connected with MongoDB Atlas', () => {
    const connectionState = connection.connection.readyState
    expect(connectionState).toBe(1) //readyState will be 1 if connection is established
  })

  afterAll(async () => {
    await connection.disconnect()
  })
})
