import parse from "./helpers/regexparam";
import { HandlerFC } from "./types";

class Route {
  private method: string;
  private _path: string;
  public handlers: HandlerFC[];
  private keys: string[];
  private pattern: RegExp;

  constructor(method: string, path: string, handlers: HandlerFC[]) {
    this.method = method;
    this.path = path;
    this.handlers = handlers;
  }

  public set path(path: string) {
    this._path = path;
    this._build();
  }

  public get path(): string {
    return this._path;
  }

  private _build() {
    const { keys, pattern } = parse(this._path);
    this.keys = keys;
    this.pattern = pattern;
  }

  match(path: string) {
    let out = null;
    let matches = this.pattern.exec(path);

    if (matches) {
      out = { params: {}, handlers: this.handlers };

      // Add params
      if (this.keys.length) {
        for (const index of this.keys.keys()) {
          out.params[this.keys[index]] = matches[1 + index] ?? null;
        }
      }
    }
    return out;
  }
}

export default Route;
