import UserRepository from '../Repositories/UserRepository'
import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'
import * as crypto from 'crypto'
import 'dotenv/config'

export default class PasswordService {
  userRepository: UserRepository
  passwordTokenRepository: UserRepository
  rounds: number = 10

  constructor(userRepository, passwordTokenRepository) {
    this.userRepository = userRepository
    this.passwordTokenRepository = passwordTokenRepository
  }

  async requestPasswordReset(email: string) {
    const users = await this.userRepository.getAll()
    const user = users.find((user) => user.email === email)
    if (!user) throw new Error('User does not exist!')
    const userId = user._id
    let token = await this.passwordTokenRepository.getById(userId)
    if (token) await this.passwordTokenRepository.deleteById(userId)

    let resetToken = crypto.randomBytes(32).toString('hex')
    const hashedResetToken = await bcrypt.hash(resetToken, this.rounds)

    await this.passwordTokenRepository.create({
      _id: user._id,
      token: hashedResetToken,
      createdAt: Date.now(),
    })
    const link = `${process.env.PAGE_URL}/passwordReset?token=${resetToken}&id=${user._id}`
    return {
      email: user.email,
      link: link,
    }
  }

  async resetPassword(
    userId: mongoose.Types.ObjectId,
    token: string,
    password: string,
  ) {
    let resetToken = await this.passwordTokenRepository.getById(userId)
    if (!resetToken) throw new Error('Invalid or expired password reset token')
    const isValid = await bcrypt.compare(token, resetToken.token)
    if (!isValid) throw new Error('Invalid or expired password reset token')

    const hashedPassword = await bcrypt.hash(password, this.rounds)
    const user = await this.userRepository.getById(userId)
    user.password = hashedPassword
    this.userRepository.updateById(userId, user)
    await this.passwordTokenRepository.deleteById(userId)
    return true
  }

  async changePassword(
    id: mongoose.Types.ObjectId,
    oldPassword: string,
    newPassword: string,
  ): Promise<void> {
    if (oldPassword === newPassword)
      throw new Error('Old and new passwords are the same')
    const user = await this.userRepository.getById(id)
    if (!user) throw new Error('Invalid user')
    const passwordMatch = await bcrypt.compare(oldPassword, user.password)
    if (!passwordMatch) throw new Error('Invalid pw')
    user.password = await bcrypt.hash(newPassword, this.rounds)
    this.userRepository.updateById(id, user)
  }
}
