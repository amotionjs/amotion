import { IncomingHttpHeaders, IncomingMessage } from 'http';
import Amotion from './Amotion';
import { nanoid } from 'nanoid';
import { Socket } from 'net';

export type Method =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS'
  | 'HEAD'
  | string;

class Request {
  public headers: IncomingHttpHeaders;
  public id: string | string[];
  public method?: Method;
  public url?: string;
  public socket: Socket;

  constructor(public raw: IncomingMessage, app: Amotion) {
    this.headers = raw.headers;
    this.method = raw.method;
    this.url = raw.url;
    this.socket = raw.socket;

    // Идентификационный ключ
    this.id = this.get('X-Request-Id') ?? nanoid(32);
  }

  // Получение header
  public get(header: string): string | string[] | undefined {
    return this.headers[header.toLowerCase()];
  }
}

export default Request;
