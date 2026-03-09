import type { AxiosError } from 'axios';
import Axios from 'axios';
import { toast } from 'sonner';
import { i18n } from '@/locales';
import { ApiStatus } from './status';

/**
 * Error response interface
 * @descCN 错误响应接口
 */
export interface ErrorResponse {
  /**
   * error code
   * @descCN 错误状态码
   */
  code: number;
  /**
   * error message
   * @descCN 错误消息
   */
  message: string;
  /**
   * error data
   * @descCN 错误附加数据
   */
  data?: unknown;
}

/**
 * Error log data interface
 * @descCN 错误日志数据接口
 */
export interface ErrorLogData {
  /**
   * error code
   * @descCN 错误状态码
   */
  code: number;
  /**
   * error message
   * @descCN 错误消息
   */
  message: string;
  /**
   * error data
   * @descCN 错误附加数据
   */
  data?: unknown;
  /**
   * error timestamp
   * @descCN 错误发生时间戳
   */
  timestamp: string;
  /**
   * request URL
   * @descCN 请求 URL
   */
  url?: string;
  /**
   * request method
   * @descCN 请求方法
   */
  method?: string;
  /**
   * error stack
   * @descCN 错误堆栈信息
   */
  stack?: string;
}

/**
 * Custom HttpError class
 * @descCN 自定义 HttpError 类
 */
export class HttpError extends Error {
  public readonly code: number;
  public readonly data?: unknown;
  public readonly timestamp: string;
  public readonly url?: string;
  public readonly method?: string;

  /**
   * Create HTTP error instance
   * @descCN 创建 HTTP 错误实例
   * @param message 消息
   * @param code 状态码
   * @param options 配置项
   * @param options.data 错误数据
   * @param options.url 请求 URL
   * @param options.method 请求方法
   */
  constructor(
    message: string,
    code: number,
    options?: {
      data?: unknown;
      url?: string;
      method?: string;
    },
  ) {
    super(message);
    this.name = 'HTTP Error';
    this.code = code;
    this.data = options?.data;
    this.timestamp = new Date().toISOString();
    this.url = options?.url;
    this.method = options?.method;
  }

  /**
   * Convert to error log data
   * @descCN 转换为错误日志数据
   * @returns 错误日志数据
   */
  public toLogData(): ErrorLogData {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
      timestamp: this.timestamp,
      url: this.url,
      method: this.method,
      stack: this.stack,
    };
  }
}

/**
 * Get error message
 * @descCN 获取错误消息
 * @param status 错误状态码
 * @returns 错误消息
 */
function getErrorMessage(status: number) {
  const errorMap: Record<number, string> = {
    [ApiStatus.unauthorized]: 'api.errMsg401',
    [ApiStatus.forbidden]: 'api.errMsg403',
    [ApiStatus.notFound]: 'api.errMsg404',
    [ApiStatus.methodNotAllowed]: 'api.errMsg405',
    [ApiStatus.requestTimeout]: 'api.errMsg408',
    [ApiStatus.internalServerError]: 'api.errMsg500',
    [ApiStatus.notImplemented]: 'api.errMsg501',
    [ApiStatus.badGateway]: 'api.errMsg502',
    [ApiStatus.serviceUnavailable]: 'api.errMsg503',
    [ApiStatus.gatewayTimeout]: 'api.errMsg504',
    [ApiStatus.httpVersionNotSupported]: 'api.errMsg505',
  };

  return i18n.t(errorMap[status] || 'api.errMsgDefault');
}

/**
 * Handle error
 * @descCN 处理错误
 * @param error 错误对象
 */
export function handleError(error: AxiosError<ErrorResponse>): never {
  // 处理取消的请求
  if (Axios.isCancel(error)) {
    console.warn('Request cancelled:', error.message);
    throw new HttpError(i18n.t('api.requestCancelled'), ApiStatus.error);
  }

  const statusCode = error.response?.status;
  const errorMessage = error.response?.data?.message ?? error.message;
  const requestConfig = error.config;

  // 处理网络错误
  if (!error.response) {
    throw new HttpError(i18n.t('api.networkError'), ApiStatus.error, {
      url: requestConfig?.url,
      method: requestConfig?.method?.toUpperCase(),
    });
  }

  // 处理 HTTP 状态码错误
  const message = statusCode !== undefined ? getErrorMessage(statusCode) : errorMessage || i18n.t('api.errMsgDefault');

  throw new HttpError(message, statusCode ?? ApiStatus.error, {
    data: error.response.data,
    url: requestConfig?.url,
    method: requestConfig?.method?.toUpperCase(),
  });
}

/**
 * Show error message
 * @descCN 显示错误消息
 * @param error 错误对象
 * @param showMessage 是否显示错误消息
 */
export function showError(error: HttpError, showMessage: boolean = true) {
  if (showMessage) {
    // 添加错误消息显示
    toast.error(error.message);
  }
  // 记录错误日志
  console.error('[HTTP Error]', error.toLogData());
}

/**
 * Show success message
 * @descCN 显示成功消息
 * @param message 成功消息
 * @param showMessage 是否显示消息
 */
export function showSuccess(message: string, showMessage: boolean = true) {
  if (showMessage) {
    // 添加成功消息显示
    toast.success(message);
  }
}

/**
 * Check if error is HttpError type
 * @descCN 判断是否为 HttpError 类型
 * @param error 错误对象
 * @returns 是否为 HttpError 类型
 */
export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError;
}
