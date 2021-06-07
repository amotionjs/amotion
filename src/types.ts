import Context from "./Context";

export type HandlerFC = (ctx: Context) => void | Promise<any>;
export type ErrorHandlerFC = (err: any, ctx: Context) => void | Promise<any>;
