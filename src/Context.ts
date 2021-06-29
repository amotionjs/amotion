import { IncomingMessage, ServerResponse } from 'http';
import Amotion from './Amotion';
import Request from './Request';

class Context {
  public request: Request;
  public reply: ServerResponse;
  public app: Amotion;

  constructor(
    request: IncomingMessage,
    response: ServerResponse,
    app: Amotion,
  ) {
    this.request = new Request(request, app);
    this.reply = response;
    this.app = app;
  }
}

export default Context;
