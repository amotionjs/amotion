import Context from "./Context";
import Router from "./Router";

export type HandlerFC = (
  ctx: Context
) => void | Promise<void> | Promise<any> | any;
export type RouterHttpMethodFC = (
  path: string,
  ...handlers: HandlerFC[]
) => Router;
export type ErrorHandlerFC = (err: any, ctx: Context) => void | Promise<any>;
export type DoneFC = (err?: any) => Promise<void> | void;
export type RouterUseFC = (path:string | HandlerFC, ...handlers: HandlerFC[])=>Router
