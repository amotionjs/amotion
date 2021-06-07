export default function (from: any, to: any) {
  const funcs:any = {}


    funcs.method = (key: string) => {
            to[key] = from[key].bind(from)
            return
        }

        return funcs
}