import { onMounted, getCurrentInstance, ref, type Component } from 'vue';

export function onMountedParent(cb: Function) {
  const self = getCurrentInstance();
  let mounted = false;
  Object.defineProperty(self!.parent, 'isMounted', {
    get() {
      return mounted;
    },
    set(val) {
      if (val) cb;
      mounted = val;
    }
  });
}