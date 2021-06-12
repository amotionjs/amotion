import { IncomingMessage } from "http";

class Request {
  public raw: IncomingMessage;

  constructor(request: IncomingMessage) {
    this.raw = request;
  }
}

export default Request;
