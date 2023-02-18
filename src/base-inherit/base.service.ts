import { Types } from 'mongoose';

import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable, NotFoundException } from '@nestjs/common';

import BaseRepository from './base.repository';

@Injectable()
export default class BaseService<T> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly baseRepository: BaseRepository<T>,
  ) {}

  /**
   * Find one by
   * @param query object, default = {}
   * @param options QueryOptions|undefined, default = {}
   * @returns  Promise<any | null>
   */
  public async findOneBy(query = {}, options = {}): Promise<any | null> {
    return this.baseRepository.findOneBy(query, options);
  }

  /**
   * Find one by id
   * @param id ObjectId
   * @param options QueryOptions|undefined, default = {}
   * @returns  Promise<any | null>
   */
  public async findOneById(
    id: Types.ObjectId,
    options = {},
  ): Promise<any | null> {
    return this.baseRepository.findOneById(id, options);
  }

  /**
   * Find many by
   * @param query object, default = {}
   * @param options QueryOptions|undefined, default = {}
   * @returns  Promise<any | null>
   */
  public async findManyBy(query = {}, options = {}): Promise<any | null> {
    return this.baseRepository.findManyBy(query, options);
  }

  /**
   * Create new object
   * @param data object
   * @returns  Promise<any>
   */
  public async create(data: any): Promise<any> {
    return this.baseRepository.create(data);
  }

  /**
   * Update one by
   * @param query object, default = {}
   * @param data object
   * @param options QueryOptions | null | undefined, default = {new: true}
   * @returns  Promise<any>
   */
  public async updateOneBy(query = {}, data: any, options?: any): Promise<any> {
    const result = await this.baseRepository.updateOneBy(query, data, options);

    if (!result) throw new NotFoundException('Not found item.');

    return result;
  }

  /**
   * Update one by id
   * @param id ObjectId
   * @param data object
   * @param options QueryOptions | null | undefined, default = {new: true}
   * @returns Promise<any>
   */
  public async updateOneById(
    id: Types.ObjectId,
    data: any,
    options?: any,
  ): Promise<any> {
    const result = this.baseRepository.updateOneById(id, data, options);

    if (!result) throw new NotFoundException('Not found item.');

    return result;
  }

  /**
   * Update many by
   * @param query ObjectId, default = {}
   * @param data object
   * @returns Promise<any>
   */
  public updateManyBy(query = {}, data = {}): Promise<any | null> {
    return this.baseRepository.updateManyBy(query, data);
  }

  /**
   * Upsert one by
   * @param data object
   * @param query? object | undefined
   * @returns Promise<any>
   */
  public upsertOneBy(data: any, query?: any): Promise<any> {
    return this.baseRepository.upsertOneBy(data, query);
  }

  /**
   * Upsert many by
   * @param data object
   * @returns Promise<any>
   */
  public upsertManyBy(data = {}, query?: any): Promise<any> {
    return this.baseRepository.upsertManyBy(data, query);
  }

  /**
   * Delete one by
   * @param query any, default = {}
   * @returns Promise<any>
   */
  public async deleteOneBy(query = {}): Promise<any> {
    const result = await this.baseRepository.deleteOneBy(query);

    if (!result) throw new NotFoundException('Not found item.');

    return result;
  }

  /**
   * Delete one by
   * @param query any, default = {}
   * @returns Promise<any>
   */
  public async deleteOneHardBy(query = {}): Promise<any> {
    const result = await this.baseRepository.deleteOneHardBy(query);

    if (!result) throw new NotFoundException('Not found item.');

    return result;
  }

  /**
   * Delete soft one by id
   * @param id !ObjectId
   * @returns Promise<any>
   */
  public async deleteOneById(id: Types.ObjectId): Promise<any> {
    const result = await this.baseRepository.deleteOneById(id);

    if (!result) throw new NotFoundException('Not found item.');

    return result;
  }

  /**
   * Delete hard one by id
   * @param id !ObjectId
   * @returns Promise<any>
   */
  public async deleteOneHardById(id: Types.ObjectId): Promise<any> {
    const result = await this.baseRepository.deleteOneHardById(id);

    if (!result) throw new NotFoundException('Not found item.');

    return result;
  }

  /**
   * Delete soft many
   * @param query Object, default = {}
   * @returns Promise<object>
   */
  public deleteMany(query = {}): Promise<any> {
    return this.baseRepository.deleteMany(query);
  }

  /**
   * Delete hard many
   * @param query Object, default = {}
   * @returns Promise<object>
   */
  public deleteManyHard(query: any): Promise<any> {
    return this.baseRepository.deleteManyHard(query);
  }

  /**
   * Delete soft many by Ids
   * @param ids ObjectId[]
   * @returns Promise<object>
   */
  public async deleteManyByIds(ids: Types.ObjectId[]): Promise<any> {
    return this.baseRepository.deleteManyByIds(ids);
  }

  /**
   * Delete hard many by Ids
   * @param ids ObjectId[]
   * @returns Promise<object>
   */
  public async deleteManyHardByIds(ids: Types.ObjectId[]): Promise<any> {
    return this.baseRepository.deleteManyHardByIds(ids);
  }

  /**
   * Find all and page info
   * @param query Object, default = {}
   * @returns Promise<object>
   */
  public paginate(query: any): Promise<any> {
    return this.baseRepository.paginate(query);
  }

  public async findAndCount(query = {}): Promise<Number> {
    return this.baseRepository.findAndCount(query);
  }
}
