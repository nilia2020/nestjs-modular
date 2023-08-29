import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from 'src/users/services/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`User email:${email} not found`);
    }
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...response } = user.toJSON();
        if (password) {
        }
        return response;
      } else {
        throw new NotFoundException(`User password not found`);
      }
    }
  }
}
