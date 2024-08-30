import { reactive } from 'vue';

class Model<T extends object> {
    //private _defaultValues: Partial<T>;

    constructor(defaultValues: Partial<T> = {}) {
        console.log('Model constructor called');
        //this._defaultValues = { ...defaultValues };
        Object.assign(this, { ...defaultValues });
        const reactiveInstance = reactive(this) as this & T;
        return reactiveInstance;
    }

    clear(data: Partial<T> = {}) {
        for (const k in this) delete this[k];
        Object.assign(this, data);
    }

    get loaded() {
        return Object.keys(this).length > 0;
    }

    set(data: Partial<T>) {
        this.clear(data);
    }

    reset() {
        this.clear();
    }
}

export function createModel<T extends object>(defaultValues: Partial<T> = {}): Model<T> & T {
    const modelInstance = new Model(defaultValues);
    return modelInstance as Model<T> & T;
}