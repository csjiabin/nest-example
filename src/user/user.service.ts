import { getConnection, getRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './user.dto';
import { UserInterface } from './user.interface';
import { Users } from './user.entity';
@Injectable()
export class UserService {
  private readonly users = Users;
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}
  findOneByToken(token) {
    return token;
  }
  async findAll(options: UserInterface): Promise<any> {
    const pagesize = Number(options.pagesize) || 10;
    const page = Number(options.page) * pagesize || 0;
    const [list, count = 0] = await this.usersRepository.findAndCount({
      where: {
        ...options,
      },
      skip: page,
      take: pagesize,
    });
    return { list, count };
  }
  async addUser(options: UserDto): Promise<any> {
    const user = this.usersRepository.create();
    Object.keys(options).forEach(key => {
      user[key] = options[key];
    });
    return await this.usersRepository.save(user);
  }
  async findUser(id: number): Promise<any> {
    return await this.usersRepository.findOneOrFail({ id });
  }
  async deleteUser(id: number): Promise<any> {
    return await this.usersRepository.delete({ id });
  }
  async updateUser(id, options: UserDto): Promise<any> {
    const user = await this.usersRepository.findOneOrFail({ id });
    return await this.usersRepository.update(id, options);
  }
}
