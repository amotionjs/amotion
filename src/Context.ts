import { IncomingMessage, ServerResponse } from "http";
import Reply from "./Reply";
import delegate from "./helpers/delegate";
import Amotion from "./Amotion";
import { DoneFC } from "./types";
import Request from "./Request";

class Context {
  // Objects
  public request: Request;
  public reply: Reply;
  public app: Amotion;

  // Properties
  public state: any;
  public params: any;
  public method: string;
  public path: string;
  public url: string;

  // Methods
  public done: DoneFC;
  public type: (type: string) => Reply;
  public code: (type: number) => Reply;
  public send: (payload?: any) => void;

  constructor(
    request: IncomingMessage,
    response: ServerResponse,
    app: Amotion
  ) {
    this.request = new Request(request);
    this.reply = new Reply(response);
    this.app = app;
    this.state = {};

    // Properties
    this.method = request.method;
    this.path = request.url;
    this.url = request.url;

    // Delegate Reply methods
    delegate(this.reply, this).method("type").method("code").method("send");
  }
}

export default Context;
