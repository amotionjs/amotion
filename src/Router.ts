import Route from "./Route";
import methods from "./methods";
import { HandlerFC, RouterHttpMethodFC } from "./types";

interface RouterTree {
  [key: string]: Route[];
}

class Router {
  private tree: RouterTree;
  private routes: Route[];
  private middlewares: Route[];
  private prefix: string;

  public get: RouterHttpMethodFC = this.add.bind(this, "GET");
  public post: RouterHttpMethodFC = this.add.bind(this, "POST");
  public put: RouterHttpMethodFC = this.add.bind(this, "PUT");
  public patch: RouterHttpMethodFC = this.add.bind(this, "PATCH");
  public del: RouterHttpMethodFC = this.add.bind(this, "DELETE");
  public options: RouterHttpMethodFC = this.add.bind(this, "OPTIONS");
  public head: RouterHttpMethodFC = this.add.bind(this, "HEAD");

  constructor(prefix: string = "/") {
    this.prefix = prefix;
    this.routes = [];
    this.middlewares = [];
    this.tree = Object.fromEntries(
      methods.map((method: string) => [method, []])
    );
  }

  use(path: string | HandlerFC, ...handlers: HandlerFC[]): Router {
    if (typeof path === "function") {
      handlers = [path, ...handlers];
      path = "*";
    }

    let route = this.middlewares.find((route) => route.path === path);
    if (route) {
      route.handlers = [...route.handlers, ...handlers];
      this.middlewares = [
        ...this.middlewares.filter((route) => route.path !== path),
        route,
      ];
    } else {
      this.middlewares.push(new Route("MIDDLEWARE", path, handlers));
    }

    return this;
  }

  public add(
    method: string,
    path: string,
    ...handlers: HandlerFC[]
  ): this | Error {
    if (!methods.includes(method)) {
      throw new Error("The specified method is not allowed in the router");
    }

    if (!path) {
      throw new ReferenceError("Path argument not specified");
    }

    // Create route
    const route: Route = new Route(method, path, handlers);

    // Add route to tree & routes
    this.tree[method].push(route);
    this.routes.push(route);

    return this;
  }

  public lookup(method: string, path: string) {
    if (!methods.includes(method)) {
      throw new Error("The specified method is not allowed in the router");
    }

    if (!path) {
      throw new ReferenceError("Path argument not specified");
    }

    let params: any = {},
      handlers: HandlerFC[] = [];

    for (const route of this.middlewares) {
      const rslt = route.match(path);

      if (rslt) {
        params = rslt.params;
        handlers = rslt.handlers;
        break;
      }
    }

    for (const route of this.tree[method]) {
      const rslt = route.match(path);

      if (rslt) {
        params = { ...params, ...rslt.params };
        handlers = [...handlers, ...rslt.handlers];
        break;
      }
    }

    return { params, handlers };
  }
}

export default Router;
