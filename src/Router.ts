import Route from "./Route";
import  methods from "./methods";
import { HandlerFC } from "./types";

interface RouterTree {
  [key: string]: Route[];
}

class Router {
  private tree: RouterTree;
  private routes: Route[];
  private prefix: string;

  constructor(prefix: string = "/") {
    this.prefix = prefix;
    this.routes = [];
    this.tree = Object.fromEntries(methods.map((method) => [method, []]));
  }

  add(method: string, path: string, ...handlers: HandlerFC[]): Router | Error {
    if (!methods.includes(method)) {
      throw new Error("The specified method is not allowed in the router");
    }

    if (!path) {
      throw new Error("Path argument not specified");
    }

    // Create route
    const route: Route = new Route(method, path, handlers);

    // Add route to tree & routes
    this.tree[method].push(route);
    this.routes.push(route);

    return this;
  }
}

export default Router;
