import { STATUS_CODES } from "http";
import Context from "./Context";

interface Props {
  [key: string]: string | number | boolean;
}

class HttpError extends Error {
  readonly statusCode: number;
  readonly error: string;
  readonly props: Props;

  constructor(
    statusCode: number = 500,
    message: string = null,
    props: any = {}
  ) {
    super();
    this.statusCode = statusCode;
    this.error = STATUS_CODES[statusCode];
    this.message = message;
    this.props = props;
  }

  public toJSON() {
    return {
      isSuccess: false,
      statusCode: this.statusCode,
      error: this.error,
      message: this.message,
      props: this.props,
    };
  }

  public static async handler(err: any, ctx: Context): Promise<any> {
    if (err instanceof HttpError) {
      ctx.code(err.statusCode).send(err.toJSON());
    }

    ctx.code(500).send(err.stack);
  }
}

export default HttpError;
