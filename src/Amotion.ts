import { createServer, Server, IncomingMessage, ServerResponse } from "http";
import Router from "./Router";
import  methods  from "./methods";
import Context from "./Context";
import { ErrorHandlerFC } from "./types";
import HttpError from "./HttpError";

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

  constructor() {
    this.server = createServer(this.handleRequest);
    this.router = new Router("/");
    this.store = {
      errorHandler: HttpError.handler,
    };
  }

  public handleRequest(
    request: IncomingMessage,
    response: ServerResponse
  ): void {
    const ctx = new Context(request, response);

    ctx.send('Hello, world! by Amotion')

    // Done
    ctx.done = async (err?: any) => {
      if (err) {
      }
    };

    // Start done
  }

  public start(port: number): any {
    return new Promise((resolve, reject) => {
      this.server.on("error", (err) => reject(err));
      this.server.listen(port, () => resolve(this.server));
    });
  }
}

export default Amotion;
