import { IncomingMessage, ServerResponse } from "http";
import Reply from "./Reply";
import delegate from "./helpers/delegate";

type ContentDoneFC = (err: any) => void;

class Context {
  // Objects
  public request: IncomingMessage;
  public reply: Reply;

  // Methods
  public done: ContentDoneFC;
  public send: (payload: any) => void

  constructor(request: IncomingMessage, response: ServerResponse) {
    this.request = request;
    this.reply = new Reply(response);


    // Delegate Reply methods
    delegate(this.reply, this)
        .method('send')
        .method('type')
  }
}

export default Context;
