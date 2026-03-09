import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig, Method } from 'axios';
import type { ErrorResponse } from './error';
import Axios from 'axios';
import { i18n } from '@/locales';
import { handleError, HttpError, showError } from './error';
import { ApiStatus } from './status';

// 默认配置
const defaultConfig: AxiosRequestConfig = {
  timeout: 5000, // 超时时间 单位是ms，这里设置了5s的超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
};

// 响应数据基础结构
export interface BaseResponse {
  code: number;
  message?: string;
}

// 去除与BaseResponse冲突的字段
type OmitBaseResponse<T> = Omit<T, keyof BaseResponse>;

// 响应数据类型定义 - 避免属性冲突，确保BaseResponse优先级
export type ResponseData<T = any> = BaseResponse & OmitBaseResponse<T>;

// 拦截器配置类型
interface InterceptorsConfig {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  requestErrorInterceptor?: (error: AxiosError) => Promise<any>;
  responseInterceptor?: (response: AxiosResponse<ResponseData<any>>) => any;
  responseErrorInterceptor?: (error: AxiosError) => Promise<any>;
}

/**
 * 增强型 HTTP 客户端，基于 Axios 封装
 * 支持拦截器配置、多实例管理等功能
 */
class HttpClient {
  private instance: AxiosInstance; // Axios 实例
  private requestInterceptorId?: number; // 请求拦截器 ID
  private responseInterceptorId?: number; // 响应拦截器 ID

  /**
   * 创建 HTTP 客户端实例
   * @param customConfig 自定义 Axios 配置
   * @param interceptors 自定义拦截器配置
   */
  constructor(customConfig?: AxiosRequestConfig, interceptors?: InterceptorsConfig) {
    this.instance = Axios.create({ ...defaultConfig, ...customConfig });
    this.initInterceptors(interceptors);
  }

  /** 初始化拦截器 */
  private initInterceptors(interceptors?: InterceptorsConfig) {
    this.initRequestInterceptor(interceptors?.requestInterceptor, interceptors?.requestErrorInterceptor);
    this.initResponseInterceptor(interceptors?.responseInterceptor, interceptors?.responseErrorInterceptor);
  }

  /** 初始化请求拦截器 */
  private initRequestInterceptor(customInterceptor?: InterceptorsConfig['requestInterceptor'], customErrorInterceptor?: InterceptorsConfig['requestErrorInterceptor']) {
    // 默认请求拦截器
    const defaultInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      /* 在这里写请求拦截器的默认业务逻辑 */
      // 添加token
      // const token = useUserStore.getState().token;

      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }

      return config;
    };

    // 默认请求错误拦截器
    const defaultErrorInterceptor = async (error: AxiosError): Promise<any> => {
      /* 在这里写请求错误拦截器的默认业务逻辑 */
      // 处理请求前的错误
      showError(this.createHttpError(i18n.t('api.requestConfigError'), ApiStatus.error));

      return Promise.reject(error);
    };

    // 优先使用自定义拦截器，否则使用默认拦截器
    this.requestInterceptorId = this.instance.interceptors.request.use(customInterceptor || defaultInterceptor, customErrorInterceptor || defaultErrorInterceptor);
  }

  /** 初始化响应拦截器 */
  private initResponseInterceptor(customInterceptor?: InterceptorsConfig['responseInterceptor'], customErrorInterceptor?: InterceptorsConfig['responseErrorInterceptor']) {
    // 默认响应拦截器
    const defaultInterceptor = (response: AxiosResponse<ResponseData<any>>) => {
      /* 在这里写响应拦截器的默认业务逻辑 */
      // 处理不同的响应状态码
      const { code, message } = response.data;

      switch (code) {
        case ApiStatus.success:
          return response.data;
        // case ApiStatus.unauthorized:
        //   // 未授权处理
        //   break;
        // case ApiStatus.forbidden:
        //   // 权限不足处理
        //   break;
        default: {
          // 其他错误处理
          const error = this.createHttpError(message ?? i18n.t('api.errMsgDefault'), code);
          showError(error);
          throw error;
        }
      }
    };

    // 默认响应错误拦截器
    const defaultErrorInterceptor = async (error: AxiosError<ErrorResponse>) => {
      return Promise.reject(handleError(error));
    };

    // 优先使用自定义拦截器，否则使用默认拦截器
    this.responseInterceptorId = this.instance.interceptors.response.use(customInterceptor || defaultInterceptor, customErrorInterceptor || defaultErrorInterceptor);
  }

  /** 统一创建HttpError */
  private createHttpError(message: string, code: number) {
    return new HttpError(message, code);
  }

  /** 移除请求拦截器 */
  public removeRequestInterceptor() {
    if (this.requestInterceptorId !== undefined) {
      this.instance.interceptors.request.eject(this.requestInterceptorId);
      this.requestInterceptorId = undefined; // 重置ID，避免重复移除
    }
  }

  /** 移除响应拦截器 */
  public removeResponseInterceptor() {
    if (this.responseInterceptorId !== undefined) {
      this.instance.interceptors.response.eject(this.responseInterceptorId);
      this.responseInterceptorId = undefined; // 重置ID，避免重复移除
    }
  }

  /** 动态设置请求拦截器 */
  public setRequestInterceptor(customInterceptor?: InterceptorsConfig['requestInterceptor'], customErrorInterceptor?: InterceptorsConfig['requestErrorInterceptor']) {
    this.removeRequestInterceptor();
    this.initRequestInterceptor(customInterceptor, customErrorInterceptor);
  }

  /** 动态设置响应拦截器 */
  public setResponseInterceptor(customInterceptor?: InterceptorsConfig['responseInterceptor'], customErrorInterceptor?: InterceptorsConfig['responseErrorInterceptor']) {
    this.removeResponseInterceptor();
    this.initResponseInterceptor(customInterceptor, customErrorInterceptor);
  }

  /** 获取 Axios 实例 */
  public getInstance(): AxiosInstance {
    return this.instance;
  }

  /**
   * 通用请求方法
   * @param method 请求方法
   * @param url 请求地址
   * @param config 请求配置
   * @returns 响应数据
   */
  public async request<T>(method: Method, url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    const requestConfig: AxiosRequestConfig = {
      ...config,
      method,
      url,
    };

    const response = await this.instance.request<ResponseData<T>>(requestConfig);

    return response.data;
  }

  /**
   * GET 请求
   * @param url 请求地址
   * @param config 请求配置
   * @returns 响应数据
   */
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.request<T>('get', url, config);
  }

  /**
   * POST 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   * @returns 响应数据
   */
  public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.request<T>('post', url, { ...config, data });
  }

  /**
   * PUT 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   * @returns 响应数据
   */
  public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.request<T>('put', url, { ...config, data });
  }

  /**
   * DELETE 请求
   * @param url 请求地址
   * @param config 请求配置
   * @returns 响应数据
   */
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.request<T>('delete', url, config);
  }

  /**
   * PATCH 请求
   * @param url 请求地址
   * @param data 请求数据
   * @param config 请求配置
   * @returns 响应数据
   */
  public async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<ResponseData<T>> {
    return this.request<T>('patch', url, { ...config, data });
  }
}

// 默认导出实例 - 可直接使用
export const http = new HttpClient({
  baseURL: import.meta.env.VITE_SERVICE_BASE_URL,
});

export default HttpClient;
