interface DelegateRef {
  method: (key: string) => DelegateRef;
  methods: (...keys: string[]) => DelegateRef;
}

export default function delegate(from: any, to: any): DelegateRef {
  const refs: DelegateRef = {
    method(key) {
      to[key] = from[key].bind(from);
      return refs;
    },
    methods(...keys) {
      for (const key of keys) {
        refs.method(key);
      }

      return refs;
    },
  };

  return refs;
}
