import UserService from '../Src/Services/UserService'
import UserRepository from '../Src/Repositories/UserRepository'
import { UserModel } from '../Src/Models/User'
import UserDbModel from '../Src/Models/User'
import { Document, Types } from 'mongoose'

class TestRepository extends UserRepository {
  users: Array<UserModel & Document>
  constructor() {
    super(UserDbModel)
    this.users = []
  }

  async clear() {
    this.users = []
  }

  async getAll() {
    return this.users
  }

  async getById(id: Types.ObjectId) {
    return this.users.find((user) => user._id === id)
  }

  async getByEmail(email: string) {
    return this.users.find((user) => user.email === email)
  }

  async create(user: UserModel) {
    const newUser = new this.model(user) as UserModel & Document
    this.users.push(newUser)
  }

  async updateById(id: Types.ObjectId, props: object) {
    const index = this.users.findIndex((user) => user._id === id)
    Object.assign(this.users[index], props)
  }

  async deleteById(id: Types.ObjectId) {
    this.users = this.users.filter((user) => user._id !== id)
  }
}

const testRepo = new TestRepository()
const service = new UserService(testRepo)

describe('Test UserService ', () => {
  const nUsers = 10
  let users: Array<UserModel & Document>

  beforeEach(async () => {
    for (let i = 0; i < nUsers; i++) {
      await service.createUser({
        _id: new Types.ObjectId(),
        username: `User${i}`,
        email: `user${i}@app.com`,
        name: `UserName${i}`,
        surname: `UserSurname${i}`,
        password: `Pass${i}`,
        type: 0,
        status: 0,
        grades: [],
      } as UserModel)
    }
    users = await service.getUsers()
  })

  afterEach(async () => {
    await testRepo.clear()
  })

  test(`create ${nUsers} users`, () => {
    expect(users).toHaveLength(nUsers)
  })

  test('find user by id', async () => {
    expect(await service.findUserById(users[0]._id)).toEqual(users[0])
  })

  test('update user', async () => {
    const newSurname = 'newSurname'
    const newPassword = 'newPassword'
    await service.updateUser(users[0]._id, {
      surname: newSurname,
      password: newPassword,
    })
    await service.updateUser(users[1]._id, {
      surname: newSurname + '1',
    })
    users = await service.getUsers()
    expect(users[0].surname).toBe(newSurname)
    expect(users[1].surname).toBe(newSurname + '1')
  })

  test('log in', async () => {
    const user = users[0]
    // correct email and password
    const loggedUser = await service.logIn(user.email, 'Pass0')
    expect(loggedUser).toEqual(user)
    // incorrect password
    expect(await service.logIn(user.email, 'WrongPassword')).toBeNull()
    // incorrect email
    expect(await service.logIn('WrongEmail', 'Pass0')).toBeNull()
  })

  test('delete user', async () => {
    const deletedId = users[0]._id
    await service.deleteUser(deletedId)
    users = await service.getUsers()
    expect(users.findIndex((user: Document) => user._id === deletedId)).toBe(-1)
  })
})
