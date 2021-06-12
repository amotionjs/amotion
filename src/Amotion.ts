import { createServer, Server, IncomingMessage, ServerResponse } from "http";
import Router from "./Router";
import methods from "./methods";
import Context from "./Context";
import { ErrorHandlerFC, RouterHttpMethodFC, RouterUseFC } from "./types";
import HttpError from "./HttpError";
import delegate from "./helpers/delegate";

interface Store {
  errorHandler: ErrorHandlerFC;
}

class Amotion {
  private server: Server;
  private router: Router;
  private store: Store;

  // Statics
  public static allowedMethods = methods;
  public static Router = Router;
  public static HttpError = HttpError;

  // Router Methods
  public use: RouterUseFC;
  public get: RouterHttpMethodFC;
  public post: RouterHttpMethodFC;
  public put: RouterHttpMethodFC;
  public patch: RouterHttpMethodFC;
  public del: RouterHttpMethodFC;
  public options: RouterHttpMethodFC;
  public head: RouterHttpMethodFC;

  constructor() {
    this.server = createServer(this.handleRequest.bind(this));
    this.router = new Router("/");
    this.store = {
      errorHandler: HttpError.handler,
    };

    delegate(this.router, this).methods(
      "use",
      "get",
      "post",
      "put",
      "patch",
      "del",
      "options",
      "head"
    );
  }

  public async handleRequest(
    request: IncomingMessage,
    response: ServerResponse
  ): Promise<any> {
    const ctx = new Context(request, response, this);
    const { params, handlers } = this.router.lookup(ctx.method, ctx.path);
    const iterator = handlers[Symbol.iterator]();

    // Set params
    ctx.params = params;

    // Done
    ctx.done = async (err) => {
      // Error FC
      if (err) return this.store.errorHandler(err, ctx);

      const { value: handler } = iterator.next();

      if (handler) {
        try {
          const [payload] = await Promise.all([handler(ctx)]);

          // Error not rejected & throw, returned simple
          if (payload && payload.stack && payload.message) {
            return ctx.done(payload);
          }

          // Send payload with status code 200
          if (payload) {
            return ctx.code(200).send(payload);
          }
        } catch (e) {
          // Error rejected or throw
          await ctx.done(e);
        }
      } else {
        // Not found next route
        ctx.code(500).send(`Oops! It looks like route didn't have a send`);
      }
    };

    if (handlers.length) {
      // Start done
      ctx.done();
    } else {
      // Not found
      ctx.code(404).send(`Not found: ${ctx.method} ${ctx.url}`);
    }
  }

  public start(port: number): any {
    return new Promise((resolve, reject) => {
      this.server.on("error", (err) => reject(err));
      this.server.listen(port, () => resolve(this.server));
    });
  }
}

export default Amotion;
