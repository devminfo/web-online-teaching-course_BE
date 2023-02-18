import { Injectable } from '@nestjs/common';

@Injectable()
export default class AppService {
  sayHello(): string {
    return JSON.stringify({
      errors: [
        { title: 'Not found', detail: 'You entered the wrong place!!!' },
      ],
    });
  }
}
