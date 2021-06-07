import { HandlerFC } from "./types";

class Route {
  public method: string;
  public path: string;
  public handlers: HandlerFC[];
  constructor(method: string, path: string, handlers: HandlerFC[]) {
    this.method = method;
    this.path = path;
    this.handlers = handlers;
  }
}

export default Route;
