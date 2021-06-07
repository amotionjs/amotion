import { ServerResponse } from "http";

const CONTENT_TYPES = {
  TEXT: "text/plain",
};

class Reply {
  public raw: ServerResponse;

  constructor(response: ServerResponse) {
    this.raw = response;
  }

  setHeader(key: string, value: string | number) {
    this.raw.setHeader(key, value);
  }

  public type(type: string):Reply {
    this.setHeader('Content-Type', type)
    return this
  }

  public send(payload: any): void {
    if (typeof payload === "string") {
      this.type(CONTENT_TYPES.TEXT);
      this.raw.end(payload);
    }
  }
}

export default Reply;
