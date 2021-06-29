import { IncomingHttpHeaders, IncomingMessage } from 'http';
import Amotion from './Amotion';
import { nanoid } from 'nanoid';
import { Socket } from 'net';

class Request {
  public raw: IncomingMessage;
  public headers: IncomingHttpHeaders;
  public id: string | string[];
  public method?: string;
  public url?: string;
  public socket: Socket;
  public protocol: string

  constructor(request: IncomingMessage, app: Amotion) {
    this.raw = request;
    this.headers = request.headers;
    this.method = request.method;
    this.url = request.url;
    this.socket = request.socket;

    // Идентификационный ключ
    this.id = this.headers['x-request-id'] ?? nanoid(32);

    // Локация
    this.protocol = ""
  }
}

export default Request;
