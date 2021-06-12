import { STATUS_CODES } from "http";
import Context from "./Context";

const STATUS_ERROR: string[] = Object.keys(STATUS_CODES).filter(
  (status) => +status >= 400
);

type Props = {
  [key in string | number]: string | number | boolean;
};

class HttpError extends Error {
  readonly statusCode: number;
  readonly error: string | undefined;
  readonly props?: Props;

  constructor(statusCode: number = 500, message?: string, props?: Props) {
    super(message);
    const stringStatusCode: string = statusCode.toString();
    // Check status code is error status
    if (STATUS_ERROR.includes(stringStatusCode)) {
      this.statusCode = statusCode;
      this.error = STATUS_CODES[stringStatusCode];
    } else {
      throw new Error(
        `Incorrect error status code ${statusCode}. Please input error status code!`
      );
    }

    this.props = props ?? {};
  }

  public toJSON() {
    return {
      isSuccess: false,
      statusCode: this.statusCode,
      error: this.error,
    };
  }

  public static async handler(err: any, ctx: Context): Promise<void> {
    if (err instanceof HttpError) {
      ctx.code(err.statusCode).send(err.toJSON());
    }

    ctx.code(500).send(err.stack);
  }
}

export default HttpError;
