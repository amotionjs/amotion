class Delegate<Parent = any, Child = any> {
  #parent: Parent;
  #child: Child;

  constructor(parent: Parent, child: Child) {
    this.#parent = parent;
    this.#child = child;
  }

  method(name: string): this {
    this.#child[name] = this.#parent[name].bind(this.#parent);
    return this;
  }

  prop(name: string): this {
    this.#child[name] = this.#parent[name];
    return this;
  }
}

export default Delegate;
