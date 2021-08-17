import { IncomingMessage, ServerResponse } from 'http';
import Amotion, { AmotionOptions } from './Amotion';
import Request from './Request';
import Reply from './Reply';
import Delegate from './Delegate';

class Context {
  public request: Request;
  public reply: Reply;

  // Properties
  public params: any = {};
  public method: Request['method'];
  public url: Request['url'];

  // Reply methods
  public status: Reply['status'];
  public send: Reply['send'];

  constructor(
    request: IncomingMessage,
    response: ServerResponse,
    private app: Amotion,
    private options: AmotionOptions,
  ) {
    this.request = new Request(request, app);
    this.reply = new Reply(response, app);

    // Request delegates
    new Delegate(this.request, this).prop('method').prop('url');

    // Reply delegates
    new Delegate(this.reply, this).method('send').method('status');
  }

  done(err?: Error): void {
    // Обрабатываем ошибку
    if (err) return this.options.onError(err, this);

    console.log(this.app.router)

    this.status(200).send('<h1>Hello, world!</h1>');
  }
}

export default Context;
