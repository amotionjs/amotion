import { ServerResponse } from 'http';
import Amotion from './Amotion';
import { lookup } from 'mime-types';

class Reply {
  constructor(public raw: ServerResponse, app: Amotion) {}

  type(value: string): this {
    const currentType = lookup(value) || 'text/plain';
    this.raw.setHeader('Content-Type', currentType);
    return this;
  }

  status(code: number): this {
    this.raw.statusCode = code;
    return this;
  }

  send<Payload>(payload: Payload): void {
    // Undefined content
    if (!payload) {
      this.status(204).raw.end();
    }

    // String and HTML content
    if (typeof payload === 'string') {
      this.type(/^\s*</.test(payload) ? 'html' : 'text');
      this.raw.end(payload);
    }
  }
}

export default Reply;
