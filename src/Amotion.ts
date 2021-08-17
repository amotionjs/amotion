import { createServer, IncomingMessage, ServerResponse } from 'http';
import Context from './Context';
import Router from './Router';

export interface AmotionOptions {
  onError: (err: Error, ctx: Context) => void;
}

const defaultOptions: AmotionOptions = {
  onError(err, ctx) {
    ctx.send(err.toString());
  },
};

class Amotion {
  // Создаем сервер
  public server = createServer((req: IncomingMessage, res: ServerResponse) =>
    setImmediate(() => this.handleRequest(req, res)),
  );

  // Router
  public router = new Router('/');

  constructor(public options: AmotionOptions = defaultOptions) {}

  // Обработчик запросов на сервер
  public handleRequest = (req: IncomingMessage, res: ServerResponse): void => {
    // Создаем контекст запроса
    const ctx = new Context(req, res, this, this.options);

    // Запускаем цикл
    ctx.done();
  };

  // Запуск приложения
  public run = (port: number): Promise<void> =>
    new Promise((resolve, reject) => {
      this.server.listen(port, () => resolve()).on('error', reject);
    });

  // Остановка приложения
  public destroy = (): Promise<void> =>
    new Promise((resolve, reject) => {
      this.server.close((err) => {
        if (err) reject(err);
        resolve();
      });
    });
}

export default Amotion;
