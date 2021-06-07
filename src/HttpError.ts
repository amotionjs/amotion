import Context from "./Context";

interface Props {
  [key: string]: string | number | boolean;
}

class HttpError extends Error {
  public statusCode: number;
  public props: Props;

  constructor() {
    super();
    this.statusCode = 500;
    this.props = {};
  }

  public toJSON() {
      return {
          statusCode: this.statusCode,
          error: null,
          message: null,
          props: this.props
      }
  }

  public static async handler(err: any, ctx: Context): Promise<any> {
      if (err instanceof HttpError) {
      }
  }
}

export default HttpError;
