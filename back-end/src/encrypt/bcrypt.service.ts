import { Injectable } from '@nestjs/common';
import { Encrypt } from './encrypt.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService implements Encrypt {
  private readonly SALTS = 10;

  hash(password: string): string {
    return bcrypt.hashSync(password, this.SALTS);
  }
  compare(password: string, encryptedPassword: string): string {
    return bcrypt.compareSync(password, encryptedPassword);
  }
}
