import { AxiosResponse } from 'axios';

import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpClientService {
  constructor(private readonly httpService: HttpService) {}

  /**
   * API GET
   * @param url
   * @param config
   * @returns
   */
  public get(url: string, config?: any): Promise<AxiosResponse<any[], any>> {
    return this.httpService.axiosRef.get(url, config);
  }

  /**
   * API POST
   * @param url string
   * @param data any
   * @param config AxiosRequestConfig
   * @returns
   */
  public post(
    url: string,
    data?: any,
    config?: any,
  ): Promise<AxiosResponse<any[], any>> {
    return this.httpService.axiosRef.post(url, data, config);
  }

  /**
   * API PUT
   * @param url string
   * @param data any
   * @param config AxiosRequestConfig
   * @returns
   */
  public async put(
    url: string,
    data?: any,
    config?: any,
  ): Promise<AxiosResponse<any[], any>> {
    return this.httpService.axiosRef.put(url, data, config);
  }

  /**
   * API PATCH
   * @param url string
   * @param data any
   * @param config AxiosRequestConfig
   * @returns
   */
  public async patch(
    url: string,
    data?: any,
    config?: any,
  ): Promise<AxiosResponse<any[], any>> {
    return this.httpService.axiosRef.patch(url, data, config);
  }

  /**
   * API DELETE
   * @param url string
   * @param config AxiosRequestConfig
   * @returns
   */
  public async delete(
    url: string,
    config?: any,
  ): Promise<AxiosResponse<any[], any>> {
    return this.httpService.axiosRef.delete(url, config);
  }
}
