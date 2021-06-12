import { ServerResponse } from "http";
import { Stream } from "stream";
import { nanoid } from "nanoid";

const CONTENT_TYPES = {
  TEXT: "text/plain",
  HTML: "text/html; charset=utf-8",
  JSON: "application/json; charset=utf-8",
  BIN: "application/octet-stream",
};

class Reply {
  public id: string
  public raw: ServerResponse;

  constructor(response: ServerResponse) {
    this.id = nanoid(24)
    this.raw = response;

    // Request ID
    this.setHeader('X-Request-Id', this.id)
    // Powered
    this.setHeader("X-Powered", "Amotion.js");
  }

  public setHeader(name: string, value: string | number): void {
    this.raw.setHeader(name, value);
  }

  public removeHeader(name: string): void {
    this.raw.removeHeader(name);
  }

  public type(type: string): Reply {
    this.setHeader("Content-Type", type);
    return this;
  }

  public length(length: number): Reply {
    this.setHeader("Content-Length", length);
    return this;
  }

  public code(statusCode: number) {
    this.raw.statusCode = statusCode;
    return this;
  }

  public write(chunk?: any): Reply {
    this.raw.write(chunk);
    return this;
  }

  public end(payload?: any): void {
    this.raw.end(payload);
  }

  public send(payload?: any): void {
    if (!payload) {
      this.code(204);
      this.removeHeader("Content-Type");
      this.removeHeader("Content-Length");
      this.removeHeader("Transfer-Encoding");
      this.end();
    } else if (typeof payload === "string") {
      this.type(/^\s*</.test(payload) ? CONTENT_TYPES.HTML : CONTENT_TYPES.TEXT)
        .length(Buffer.byteLength(payload))
        .end(payload);
    } else if (Buffer.isBuffer(payload)) {
      this.type(CONTENT_TYPES.BIN)
        .length(payload.length)
        .raw.end(payload, "binary");
    } else if (payload instanceof Stream) {
      this.type(CONTENT_TYPES.BIN)
      this.removeHeader('Content-Length');
      payload.pipe(this.raw)
    } else {
      this.removeHeader("Content-Length");
      this.type(CONTENT_TYPES.JSON).end(JSON.stringify(payload));
    }
  }
}

export default Reply;
