import Parent from './lq-parent.vue';
import { h } from 'vue';
export default function LqParent(props: any) {
    return h(Parent, { expose: props });
}