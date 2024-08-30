type OrArray<T> = T | T[];

type J<T extends HTMLElement = HTMLElement> = JDom<T> & T;
class JDom<T extends HTMLElement = HTMLElement> implements JDom {
  protected elems: T[] = [];
  protected elemsSet: Set<T> = new Set;
  #refRequested: boolean = false;
  constructor(selector?: string | OrArray<T | JDom<T>>, parent: HTMLElement | HTMLDocument = document) {
    if (typeof selector === 'string') {
      this.elems.push(...(parent.querySelectorAll(selector) as unknown as T[]));
    } else if (selector) {
      this.add(selector);
    }
    return new Proxy(this, {
      get(self, prop) {
        if (prop === '__v_isRef') {
          self.#refRequested = true;
          queueMicrotask(() => self.#refRequested = false);
          return true;
        }
        if (prop === 'value' && self.#refRequested) {
          self.#refRequested = false;
          return self.elems[0];
        }

        if (prop in self) {
          return self[prop as keyof typeof self];
        }

        if (!self.elems.length) return null;

        const val = self.elems[0][prop as keyof T];
        if (typeof val === 'function') {
          return val.bind(self.elems[0]);
        }
        return val;
      },
      set(self, prop, val, proxy) {
        if (val instanceof HTMLElement) {
          self.clear().add(val as T);
        } else if (val && typeof val === 'object' && '__v_skip' in val) {
          self.clear();
        } else if (val === null) {
          self.clear();
        } else {
          self.elems.forEach(elem => Reflect.set(elem, prop, val, proxy));
        }
        return true;
      }
    });
  }
  is(elem: any) {
    return this.elems.length === 1 && this.elems[0] === elem;
  }
  clear() {
    this.elems.length = 0;
    this.elemsSet.clear();
    return this as unknown as J<T>;
  }
  add(elem: OrArray<T | JDom<T>>) {
    const map = (elem: T | JDom<T>) => elem instanceof JDom ? elem.elems : [elem];
    let items: T[];
    if (Array.isArray(elem)) {
      items = elem.flatMap(map);
    } else {
      items = map(elem);
    }
    items.forEach(item => this.elemsSet.has(item) || (this.elemsSet.add(item), this.elems.push(item)));
    return this;
  }
}

export default {
  get input() { return new JDom as J<HTMLInputElement> },
  get dialog() { return new JDom as J<HTMLDialogElement> },
  get table() { return new JDom as J<HTMLTableElement> },
  get span() { return new JDom as J<HTMLSpanElement> },
}