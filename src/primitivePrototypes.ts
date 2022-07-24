import { state } from './observableState';
import { getObservableFromPrimitive } from './observableFns';

export function extendPrototypes() {
    if (!state.didOverride) {
        state.didOverride = true;
        const fn = (name: string) =>
            function (...args: any) {
                const obs = getObservableFromPrimitive(this);
                if (obs) {
                    return obs[name](...args);
                }
            };
        const toOverride = [Number, Boolean, String];
        ['assign', 'get', 'on', 'set', 'delete'].forEach((key) => {
            toOverride.forEach((override) => (override.prototype[key] = fn(key)));
        });
    }
}