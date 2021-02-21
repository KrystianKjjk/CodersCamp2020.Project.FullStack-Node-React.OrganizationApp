import * as mongoose from 'mongoose';
require('dotenv').config();


describe('MongoDB Atlas connection test', () => {
    let connection;

    beforeAll(async () => {
        jest.resetModules();
        connection = await mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
    })

    test('Should be connected with MongoDB Atlas', () =>{
        const connectionState = connection.connection.readyState;
        expect(connectionState).toBe(1); //readyState will be 0 if connection is
    })

    afterAll(async () => {
        await connection.disconnect();
      });
})