import { User } from '../domain/entitys/user'
import { Hasher } from '../domain/useCases/security/Hasher'
import { AddUser, IdUser } from '../domain/useCases/user/add-user'
import { FindUserByEmail } from '../domain/useCases/user/find-user-by-email'

interface Database {
  add(input: any): Promise<void>
}

class AddUserRepository implements AddUser {
  constructor (private readonly findUserByEmail: FindUserByEmail,
    private readonly hashPassword: Hasher,
    private readonly database: Database) {}

  async create (user: User): Promise<IdUser> {
    const userAccount = await this.findUserByEmail.findByEmail(user.email)
    if (userAccount) {
      return null
    }
    const hashedPassword = await this.hashPassword.hash(user.password)
    const accountToDb = Object.assign({}, user, { password: hashedPassword })

    await this.database.add(accountToDb)
  }
}
const makeHashPassword = (): Hasher => {
  class HashPasswordStub implements Hasher {
    async hash (password: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new HashPasswordStub()
}

const makeFindUserByEmailRepository = (): FindUserByEmail => {
  class FindUserByEmailRepositoryStub implements FindUserByEmail {
    async findByEmail (email: string): Promise<any> {
      return new Promise(resolve => resolve(null))
    }
  }

  return new FindUserByEmailRepositoryStub()
}

const makeDatabase = (): Database => {
  class DatabaseStub implements Database {
    async add (input: any): Promise<void> {
      return null
    }
  }
  return new DatabaseStub()
}

interface SutTypes {
  sut: AddUser
  findUserByEmailRepositoryStub: FindUserByEmail
  hashPasswordStub: Hasher
  databaseStub: Database
}

const makeSut = (): SutTypes => {
  const databaseStub = makeDatabase()
  const hashPasswordStub = makeHashPassword()
  const findUserByEmailRepositoryStub = makeFindUserByEmailRepository()
  const sut = new AddUserRepository(findUserByEmailRepositoryStub, hashPasswordStub, databaseStub)
  return { sut, findUserByEmailRepositoryStub, hashPasswordStub, databaseStub }
}

describe('Add User Repository', () => {
  test('should calls findUserByEmail with correct email', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut()
    const findByEmailSpy = jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail')
    const user: User = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    await sut.create(user)
    expect(findByEmailSpy).toHaveBeenCalledWith('any_email')
  })
  test('should returns false if findUserByEmail returns a user', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail')
      .mockReturnValueOnce(new Promise(resolve => resolve({
        name: 'any_name',
        email: 'any_email',
        id: 'any_id'
      })))
    const user: User = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const result = await sut.create(user)
    expect(result).toBe(null)
  })
  test('should throw if findUserByEmail throws', async () => {
    const { sut, findUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(findUserByEmailRepositoryStub, 'findByEmail')
      .mockImplementationOnce(async () => {
        return new Promise((resolve, reject) => {
          reject(new Error())
        })
      })
    const user: User = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const result = sut.create(user)
    await expect(result).rejects.toThrow()
  })
  test('should calls hashPassword with correct password', async () => {
    const { sut, hashPasswordStub } = makeSut()
    const hashSpy = jest.spyOn(hashPasswordStub, 'hash')
    const user: User = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    await sut.create(user)
    expect(hashSpy).toHaveBeenCalledWith(user.password)
  })
  test('should throw if hashPassword throws', async () => {
    const { sut, hashPasswordStub } = makeSut()
    jest.spyOn(hashPasswordStub, 'hash')
      .mockImplementationOnce(async () => {
        return new Promise((resolve, reject) => {
          reject(new Error())
        })
      })
    const user: User = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const result = sut.create(user)
    await expect(result).rejects.toThrow()
  })
  test('should calls database with correct values', async () => {
    const { sut, databaseStub } = makeSut()
    const addSpy = jest.spyOn(databaseStub, 'add')
    const user: User = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    await sut.create(user)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'hashed_password'
    })
  })
  test('should throw if database throws', async () => {
    const { sut, databaseStub } = makeSut()
    jest.spyOn(databaseStub, 'add')
      .mockImplementationOnce(async () => {
        return new Promise((resolve, reject) => {
          reject(new Error())
        })
      })
    const user: User = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const result = sut.create(user)
    await expect(result).rejects.toThrow()
  })
  test('should return true if creat', async () => {
    const { sut, databaseStub } = makeSut()
    jest.spyOn(databaseStub, 'add')
      .mockImplementationOnce(async () => {
        return new Promise((resolve, reject) => {
          reject(new Error())
        })
      })
    const user: User = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    const result = sut.create(user)
    await expect(result).rejects.toThrow()
  })
})
