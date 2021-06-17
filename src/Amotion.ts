import { createServer, Server } from 'http';

class Amotion {
  // Создаем сервер
  private _server: Server = createServer();

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
