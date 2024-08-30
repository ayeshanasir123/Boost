import { provide as vueProvide, inject as vueInject, ref, getCurrentInstance, onMounted, reactive } from 'vue';
import $ from 'jquery';
//import './prototypes/dom.js';

// export const windowWidth = ref($(window).width());

// window.addEventListener('resize', () => {
//   windowWidth.value = $(window).width();
// });

export function asyncRef(value) {
  const _value = ref();
  return computed({
    get() {
      return _value.value;
    },
    set(value) {
      if (value && typeof value?.then === 'function') {
        value.then(value => _value.value = value);
      } else {
        _value.value = value;
      }
    }
  });
}

export function asyncComputed(getter) {
  const _value = ref();
  watch(computed(getter), async val => _value.value = await val, { immediate: true });
  return computed({
    get() {
      return _value.value;
    },
  });
}

export function useClass(elem, className, boolToWatch = null) {
  if (boolToWatch) {
    watch(boolToWatch, val => $(elem).toggleClass(className, !!val), { immediate: true });
  } else {
    onMounted(() => $(elem).addClass(className));
    onUnmounted(() => $(elem).removeClass(className));
  }
}

export function listen(target, ...args) {
  const self = getCurrentInstance();
  const app = self.appContext.app;
  let out;
  if (target === window || target === document || target instanceof EventTarget) {
    $(target).on(...args);
    out = () => $(target).off(...args)
  } else if (target instanceof $) {
    target.on(...args);
    out = () => target.off(...args)
  } else {
    app.bind(target, args[0], self);
    out = () => app.unbind(target, args[0], self);
  }
  onUnmounted(out);
  return out;
}

export function refs(...values) {
  return values.map(item => ref(item));
}

export function reactiveCopy(what) {
  const out = structuredClone(what);
  Object.setPrototypeOf(out, Object.getPrototypeOf(what));
  return reactive(out);
}

export function inject(injects, ...defaults) {

  if (!arguments.length) {
    const instance = getCurrentInstance();
    return instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
  }

  const names = injects.match(/\S+/g);
  if (names.length === 1) {
    return vueInject.call(null, injects, defaults[0] ?? null);
  }
  return names.map((name, i) => vueInject(name, defaults[i]));
}

export function provide(provides) {
  if (typeof provides === 'object') {
    for (const k in provides) {
      vueProvide(k, provides[k]);
    }
    return;
  }
  vueProvide(...arguments);
}


export function defineDirective(directive) {

  if (directive.mountedElem) {
    directive.mounted = function (elem, binding, vnode) {
      const globals = Object.assign({}, vnode.ctx.appContext.app.config.globalProperties);
      globals.vnode = vnode;
      directive.mountedElem($(elem), binding, globals)
    };
  }

  if (directive.updatedElem) {
    directive.updated = function (elem, binding, vnode) {
      const globals = Object.assign({}, vnode.ctx.appContext.app.config.globalProperties);
      globals.vnode = vnode;
      directive.updatedElem($(elem), binding, globals)
    };
  }

  if (directive.changedElem) {
    directive.updated = directive.updated = function (elem, binding, vnode) {
      const globals = Object.assign({}, vnode.ctx.appContext.app.config.globalProperties);
      globals.vnode = vnode;
      directive.changedElem($(elem), binding, globals)
    };
  }



  return directive;

}

export function makeId(prefix = 'id', length = 6) {
  return prefix + [...Math.random().toString()].reverse().slice(0, length).join('');
}

export function provideReactive(name, obj = {}) {
  const provider = reactive(obj);
  provide(name, provider);
  return provider;
}

export function onMountedElem(cb) {
  const self = getCurrentInstance();
  self.exposed ??= {};
  onMounted(() => {
    const $me = findElem();
    const globals = self.appContext.app.config.globalProperties;
    cb($me, self, globals);
  });
}

export function onRendered(cb) {
  onMountedElem(($me, self, globals) => {
    cb($me, self, globals);
    onUpdated(() => cb($me, self, globals));
  });
}

/**
 * some hack to import a jquery plugin/module in both requirejs and vite es modules environment simultaneously
 */
export async function importJqueryModule(loader) {

  const isProduction = $('[data-mode=production]').length;

  if (isProduction) { // scoped so no need to handle 
    const { default: out } = await loader();
    out(null, $);
    return out;
  }

  return new Promise(resolve => {

    doLoad(async () => {
      //remove requirejs' 'define()' to allow to load it as es module
      const _define = window.define;
      window.define = null;
      const { default: out } = await loader();
      out(null, $);
      window.define = _define;
      resolve(out);
    });

    // wait for all initial requirejs modules loaded so we dont override 'define()' needed for loading amd modules
    function doLoad(cb) {
      const registry = window.require?.s?.contexts?._?.registry;
      if (typeof registry === 'object' && Object.keys(registry).length <= 2) { // for some reason 2 modules are left, @todo: investigate
        return cb();
      }
      setTimeout(() => doLoad(cb), 100);
    }

  });

}

export function splitAttrs(what) {
  const attrs = useAttrs();
  const out = [reactive({}), reactive({})];

  watchEffect(() => {
    Object.remove(out[0]);
    Object.remove(out[1]);
    Object.extend(out[0], attrs, what);
    Object.extend(out[1], attrs, '!' + what)
  });

  return out;
}

export function collectTree(obj, childrenName, propName, cb) {

  const out = [];

  const items = obj[childrenName];
  if (!items) {
    return out;
  }
  for (const item of Array.isArray(items) ? items : Object.values(items)) {
    let value;
    if (propName in item) {
      value = cb ? cb(item[propName], item) : item[propName];
      if (value !== undefined) {
        out.push(value);
        continue;
      }
    }
    out.append(collectTree(item, childrenName, propName, cb));
  }
  return out;
}

export function dispatchClosest(method, ...args) {
  const fn = closestExpose.call(this, method);
  if (fn) {
    return fn(...args);
  }
  console.error(`Method "${method}" not found for a closest component`);
}

export function closestExpose(name) {

  const self = this?.$ || getCurrentInstance();

  let parent = self;

  while (parent) {
    if (parent.exposed?.[name]) {
      return parent.exposed[name];
    }
    parent = parent.parent;
  }
}

export function closestProp(name) {

  const self = getCurrentInstance();

  let parent = self;

  while (parent) {
    if (parent.props[name]) {
      return parent.props[name];
    }
    parent = parent.parent;
  }
}

/** 
 * adds input to a 'form' provide so it would be possible to collect information from inputs.
 * it adds an input to a form under the input's closest 'name' prop (see closestProp()). that would be a name 
 * of the corresponding property in the form's 'data' prop. deep props like 'prop.childProp' supported in the name;
 * if the form has already an input with the same name that means you tries to add a child input of the existing form input.
 * thus it adds the input to the parent input that could be also be a child of a top form input.
 * return [value, form] where 'value' is a ref of value that should be used for binding the input to the form's field value.
 * the 'form' could be null that means that the input is outside a form and used standalone.
 * in that case the 'value' is return from a useModel() call;
*/

class Input {
  mix(obj) {
    return mixreturn(this, obj);
  }
}

export function registerInput(props = {}) {

  const self = getCurrentInstance();

  const { form = null } = inject();
  let name = props.name ?? closestProp('name');
  if (name === 'default') {
    name = '';
  }

  if (form && name) {

    let parent = form.inputs[name];
    let value;

    if (!parent) {

      if (!form.data) {
        throw new Error('You should provide :data="data" for <input-form>');
      }

      const getter = () => {
        try {
          return eval('form.data.' + name);
        } catch (e) {
          console.warn(`Form property "${name}" doesn't exists? (${e.message})`);
        }
      };
      const setter = value => {
        try {
          eval('form.data.' + name + ' = value');
        } catch (e) {
          console.warn(`Cannot change form property "${name}" (doesn't exists)? (${e.message})`);
        }
      };

      value = ref(getter(form));

      watch(value, setter);

      watch(() => getter(), _value => {
        value.value = _value;
      });

      form.inputs[name] = Object.setPrototypeOf(Object.assign(props, { self, value, name }), Input.prototype);

    } else {

      value = useModel();

      (parent.inputs ??= []).push(Object.assign(props, { self, value, name }));


    }
    onUnmounted(() => {
      delete form.inputs[name];
    });
    return [value, form];

  }

  return [useModel(), null];
}

export function proxySetter(obj, name, pre, post) {

  const [owner, prop] = Object.getPropertyDescriptor(obj, name);

  const _set = prop.set;

  prop.set = function (value) {
    if (false === pre?.(value)) {
      return;
    }

    _set.apply(this, arguments);
    post?.(value);
  }

  Object.defineProperty(owner, name, prop);

}

export function mountComponent(app, elem, component, slot = () => []) {
  if (!(elem instanceof jQuery)) {
    elem = $(elem);
  }

  let vNode = createVNode(component, elem.data(), slot);
  vNode.appContext = app._context;
  elem.empty();
  render(vNode, elem[0]);
  return vNode.component;
}

export function appendComponent(app, elem, component, props, slot = () => []) {
  if (!(elem instanceof jQuery)) {
    elem = $(elem);
  }

  let vNode = createVNode(component, props, slot);
  vNode.appContext = app._context;
  render(vNode, elem[0]);
  return vNode.component;
}

export function mountComponents(app, components) {

  for (const [key, comp] of Object.entries(components)) {

    $(`[data-vue=${key}]`).each((idx, elem) => {
      mountComponent(app, elem, comp);
    });
  }
}

export function syncObject(dst, src) {
  if (Array.isArray(dst)) {
    dst.splice(0, dst.length, ...src);
    return;
  }
  if (typeof dst === 'object') {
    Object.assign(dst, src);
    return;
  }
  throw new Error('syncObject: destination isnt an object');
}

export function findElem(selector, arg2) {

  if (arguments.length > 1 && [...arguments].every(arg => typeof arg === 'string')) {
    return [...arguments].map(arg => findElem(arg));
  }

  let self;

  if (selector?.vnode) {
    [self, selector] = [selector, arg2];
  } else {
    self = getCurrentInstance();
  }

  const getChildren = self => {
    return self.subTree.children?.map(child => child.el.nodeType === 3 ? getChildren(child.component) : child.el).flat() ?? [];
  }

  let elem = self.vnode.el;
  if (
    (elem instanceof Comment && elem.data === 'teleport start') ||
    elem.nodeType === 3
  ) {
    elem = getChildren(self);
  }

  return selector ? $(elem).find(selector) : $(elem);
}

export function useModel(name = 'modelValue') {

  const self = getCurrentInstance();

  return computed({
    get() {
      return unref(self.props[name]);
    },
    set(value) {
      if (value === self.props[name]) {
        return false;
      }
      return self?.emit('update:' + name, value);
    }
  });

}

export function loadScript(url) {

  if ([...document.head.querySelectorAll('script')].some(script => script.src === url)) {
    return;
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

export function toRefs(props) {
  const out = {};

  for (const name in props) {
    if (
      Array.isArray(props[name])
      //props[name]?.__proto__.constructor.name === 'Object'
    ) {
      out[name] = reactive(props[name]);
      continue;
    }
    out[name] = toRef(props, name);
  }

  return out;
}

export function propsToRefs() {

  const { props } = getCurrentInstance();
  return toRefs(props);
}