const proxy = Symbol('__isProxy');

/**
 * This method uses javascript proxy to achieve a lazy intialization of a class.
 * ie an object is instantiated only when its properties are accessed
 *
 * @param instantiator this function returns the object that should be created.
 * @returns a proxy wrapping the created object
 */
export const lazy = <T extends object>(instantiator: () => T, options: { init?: T, loadOn: 'get' | 'set' | 'both' } = { loadOn: 'both' }) => {
    const handler: Handler<T> = {
        instance: undefined,
    };
    if (options.loadOn === 'get' || options.loadOn === 'both') {
        handler.get = (target: T, prop: string | symbol | number, reciever: any) => {
            if(prop === proxy) {
                return isProxy(target);
            }
            if (!handler.instance) {
                handler.instance = instantiator();
            }
            return Reflect.get(handler.instance, prop, reciever);
        };
    }

    if (options.loadOn === 'set' || options.loadOn === 'both') {
        handler.set = (target: T, p: string | symbol, value: any, receiver: any) => {
            if (!handler.instance) {
                handler.instance = instantiator();
            }
            return Reflect.set(handler.instance, p, value, receiver);
        };
    }
    const init = options.init ?? {};
    Object.defineProperty(init, proxy, {
        value: true,
        enumerable: false,
        writable: false,
    })
    return new Proxy(init as T, handler);
};

export const isProxy = (object: any) => {
    return Object.getOwnPropertyDescriptor(object, proxy)?.value as boolean;
};

interface Handler<T extends object> extends ProxyHandler<T> {
    instance: undefined | T;
}