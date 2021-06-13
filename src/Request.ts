import { IncomingMessage } from "http";
import { nanoid } from "nanoid";

class Request {
  public raw: IncomingMessage;
  public headers: IncomingMessage["headers"];
  public id: string;
  public method: string;
  public socket: IncomingMessage["socket"];
  public protocol: string
  public hostname: string
  public url: string;


  constructor(request: IncomingMessage) {
    this.raw = request;
    this.headers = this.raw.headers;
    this.id = this.headers["x-request-id"]
    this.method = request.method;
    this.socket = request.socket;

    // Location
    // this.protocol = this.raw.socket.encrypted ? "https" : "http";
    // this.hostname = this.headers["host"] ?? this.headers[":authority"]

    console.log(this.socket)

    this.url = request.url;
  }
}

export default Request;
