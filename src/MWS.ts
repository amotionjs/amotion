import { Handler } from './types';

class MWS {
  #passive: Handler[] = [];
  #active: any;

  add(path: string, handlers: Handler[]): void {
    if (path === '*') {
      this.#passive = this.#passive.concat(handlers);
    }
  }

  lookup(path: string) {
    return {
      params: {},
      handlers: this.#passive,
    };
  }
}

export default MWS;
