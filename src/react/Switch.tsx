import type { Selector } from '@legendapp/state';
import { ReactElement, ReactNode } from 'react';
import { useSelector } from './useSelector';

export function Switch<T extends object>({
    value,
    children,
}: {
    value?: Selector<T>;
    children: Record<keyof T, () => ReactNode>;
}): ReactElement;
export function Switch<T extends string | number | symbol>({
    value,
    children,
}: {
    value?: Selector<T>;
    children: Record<T, () => ReactNode>;
}): ReactElement;
export function Switch<T>({
    value,
    children,
}: {
    value?: Selector<T>;
    children: Record<any, () => ReactNode>;
}): ReactElement {
    // Select from an object of cases
    return ((children as Record<any, () => ReactNode>)[useSelector(value)]?.() ??
        (children as Record<any, () => ReactNode>)['default']?.() ??
        null) as ReactElement;
}
