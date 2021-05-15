import PasswordService from '../Src/Services/PasswordService'
import UserService from '../Src/Services/UserService'
import UserRepository from '../Src/Repositories/UserRepository'
import { Repository } from '../Src/Repositories/Repository'
import { UserModel } from '../Src/Models/User'
import { PasswordResetTokenModel } from '../Src/Models/PasswordResetToken'
import UserDbModel from '../Src/Models/User'
import TokenDbModel from '../Src/Models/PasswordResetToken'
import { Document, Types } from 'mongoose'
import { notDeepEqual } from 'assert'

class TestUserRepository extends UserRepository {
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

class TestTokenRepository extends Repository {
  tokens: Array<PasswordResetTokenModel & Document>
  constructor() {
    super(TokenDbModel)
    this.tokens = []
  }

  async getById(id: Types.ObjectId) {
    return this.tokens.find((user) => user._id === id)
  }

  async create(token: PasswordResetTokenModel) {
    const newToken = new this.model(token) as PasswordResetTokenModel & Document
    this.tokens.push(newToken)
  }
}

const testUserRepo = new TestUserRepository()
const testTokenRepo = new TestTokenRepository()
const service = new PasswordService(testUserRepo, testTokenRepo)
const userService = new UserService(testUserRepo)

describe('Test Password Service', () => {
  let users: Array<UserModel & Document>

  beforeEach(async () => {
    await userService.createUser({
      _id: new Types.ObjectId(),
      username: `User1`,
      email: `user1@app.com`,
      name: `UserName1`,
      surname: `UserSurname1`,
      password: `Pass1`,
      type: 0,
      status: 0,
      grades: [],
    } as UserModel)

    users = await userService.getUsers()
  })

  test('change password', async () => {
    const testId = users[0]._id
    const oldPassword = `Pass1`
    await service.changePassword(testId, oldPassword, 'test')
    const user = await userService.findUserById(testId)
    expect(user.password).not.toBe(oldPassword)
  })

  test('password reset token created', async () => {
    const testId = users[0]._id
    const testEmail = users[0].email
    await service.requestPasswordReset(testEmail)
    const token = await service.passwordTokenRepository.getById(testId)
    expect(token).toBeTruthy()
  })

  //need to think how to get the token from the db - leaving empty for now not to make this any longer
  test('reset password', async () => {
    const testId = users[0]._id
  })
})
