import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PasswordService {
  compare(plainPassword: string, databasePassword: string) {
    return bcrypt.compare(plainPassword, databasePassword);
  }

  hash(plainPassword: string) {
    return bcrypt.hash(plainPassword, 10);
  }
}
