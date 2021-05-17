import AuthService from '../Src/Services/AuthService'
import UserRepository from '../Src/Repositories/UserRepository'
import { UserModel } from '../Src/Models/User'
import User from '../Src/Models/User'
import * as mongoose from 'mongoose'

type UserType = UserModel & mongoose.Document

process.env.JWT_PRIVATE_KEY = 'thisisprivatekey'
process.env.JWT_TOKEN_EXPIRESIN = '900'
process.env.JWT_REFRESH_PRIVATE_KEY = 'somesecretRefreshKey'
process.env.JWT_REFRESH_EXPIRESIN = '1800'

const user = {
  name: `Test`,
  surname: `Test`,
  email: `test@test.pl`,
  password: `Test123!`,
}

class TestRepository extends UserRepository {
  users: UserType[]

  constructor() {
    super(User)
    this.users = []
  }

  async getByEmail(email: string) {
    return this.users.find((user) => user.email === email)
  }

  async create(user: UserModel) {
    const newUser = (await new this.model(user)) as UserType
    this.users.push(newUser)
  }
}

const repo = new TestRepository()
const service = new AuthService(
  repo,
  process.env.JWT_PRIVATE_KEY,
  (process.env.JWT_TOKEN_EXPIRESIN = '900'),
  (process.env.JWT_REFRESH_PRIVATE_KEY = 'somesecretRefreshKey'),
  (process.env.JWT_REFRESH_EXPIRESIN = '1800'),
)

describe('Test AuthService ', () => {
  beforeEach(async () => {
    const password = await service.hashPassword(user as UserType)
    let user2 = Object.assign({}, user)
    user2.password = password
    await service.saveUser(user2 as UserType)
  })

  test(`generate token`, () => {
    expect(typeof service.generateToken(user as UserType)).toBe('string')
  })
  test(`find user`, async () => {
    expect(await service.findUser(`test@test.pl`)).toBe(repo.users[0])
  })
  test(`hash password`, async () => {
    expect(typeof (await service.hashPassword(user as UserType))).toBe('string')
  })
  test(`check password`, async () => {
    expect(
      await service.checkPassword(user.password, repo.users[0] as UserType),
    ).toBe(true)
  })
  test(`is admin`, async () => {
    let token = service.generateToken(repo.users[0])
    expect(await service.isAdmin(token)).toBe(false)
  })
  test(`is mentor`, async () => {
    let token = service.generateToken(repo.users[0])
    expect(await service.isMentor(token)).toBe(false)
  })
  test(`is participant`, async () => {
    let token = service.generateToken(repo.users[0])
    expect(await service.isParticipant(token)).toBe(false)
  })
  test(`is candidate`, async () => {
    let token = service.generateToken(repo.users[0])
    expect(await service.isCandidate(token)).toBe(true)
  })
})
