import { Method } from './Request';
import { Handler } from './types';
import { parse } from 'regexparam';
import { join } from 'path';

class Route {
  private pattern: RegExp;
  private keys: string[];

  constructor(private readonly method: Method, private _path: string) {}

  public set path(value: string) {
    const { pattern, keys } = parse(value);

    this._path = value;
    this.pattern = pattern;
    this.keys = keys;
  }

  public get path() {
    return this._path;
  }
}

class Router {
  private routes: Route[] = [];
  private middlewares: Route[] = [];

  constructor(private readonly mountPath: string = '/') {}

  public use(path: string, ...handlers: Handler[]): this {
    const route = new Route(
      ''
    )

    this.middlewares.push(route);

    return this;
  }

  private add(method: Method, path: string, ...handlers: Handler[]): this {
    const joinedPath = join(this.mountPath, path);
    const { pattern, keys } = parse(joinedPath);

    const route: Route = {
      method,
      path: joinedPath,
      pattern,
      keys,
    };

    this.routes.push(route);

    return this;
  }

  public register(router: Router): this {
    return this;
  }
}

export default Router;
