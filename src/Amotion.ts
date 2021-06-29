import { createServer, Server, IncomingMessage, ServerResponse } from 'http';
import Context from './Context';

class Amotion {
  // Создаем сервер
  private _server: Server = createServer(
    (req: IncomingMessage, res: ServerResponse) =>
      setImmediate(() => this.handleRequest(req, res)),
  );

  // Обработчик запросов на сервер
  public handleRequest = (req: IncomingMessage, res: ServerResponse): void => {
    // Создаем контекст запроса
    const ctx = new Context(req, res, this);
    

  };

  // Запуск приложения
  public run = (port: number): Promise<void> =>
    new Promise((resolve, reject) => {
      this._server.listen(port, resolve).on('error', reject);
    });

  // Остановка приложения
  public destroy = (): Promise<void> =>
    new Promise((resolve, reject) => {
      this._server.close((err) => {
        if (err) reject(err);
        resolve();
      });
    });
}

export default Amotion;
