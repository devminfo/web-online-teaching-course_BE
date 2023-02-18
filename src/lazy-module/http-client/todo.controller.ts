import {
  Controller, Delete, Get, Param, Post, Put, Req
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { HttpClientService } from './http-client.service';

@ApiTags('Todo - HttpClient')
@Controller('todos')
export default class TodoController {
  constructor(private readonly httpClientService: HttpClientService) {}

  /**
   * Get all todos
   * @returns
   */
  @Get()
  async getTodo() {
    const { data } = await this.httpClientService.get(
      'https://62e9ed8501787ec7121e56a3.mockapi.io/api/v1/todos',
    );

    return data;
  }

  /**
   * Create todo
   * @param req
   * @returns
   */
  @Post()
  async createTodo() {
    const { data } = await this.httpClientService.post(
      'https://62e9ed8501787ec7121e56a3.mockapi.io/api/v1/todos',
      {
        title: 'Learn nestjs',
        status: true,
      },
    );
    return data;
  }

  /**
   * Update todo
   * @returns
   */
  @Put(':id')
  async updateTodo(@Param('id') id: string) {
    const { data } = await this.httpClientService.put(
      `https://62e9ed8501787ec7121e56a3.mockapi.io/api/v1/todos/${id}`,
      {
        title: 'Learn nodejs',
        status: true,
      },
    );
    return data;
  }

  /**
   * Delete todo
   * @returns
   */
  @Delete(':id')
  async deleteTodo(@Param('id') id: string) {
    const { data } = await this.httpClientService.delete(
      `https://62e9ed8501787ec7121e56a3.mockapi.io/api/v1/todos/${id}`,
    );
    return data;
  }

  /**
   * find todo
   * @returns
   */
  @Get(':id')
  async findTodo(@Param('id') id: string) {
    const { data } = await this.httpClientService.get(
      `https://62e9ed8501787ec7121e56a3.mockapi.io/api/v1/todos/${id}`,
    );
    return data;
  }
}
