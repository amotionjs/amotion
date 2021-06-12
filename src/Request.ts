import { IncomingMessage } from "http";
import { nanoid } from "nanoid";

class Request {
  public raw: IncomingMessage;
  public headers: IncomingMessage["headers"];
  public id: string;
  public url: string

  constructor(request: IncomingMessage) {
    this.raw = request;
    this.headers = this.raw.headers;
    this.id = this.headers['x-request-id'] ?? nanoid(16);
    this.url = request.url
  }
}

export default Request;
