import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getInitials(name: string) {
    const dividedName = name.split(' ')
    const firstLetter = dividedName[0]?.slice(0, 1)?.toUpperCase() || ''
    const secondLetter = dividedName[1]?.slice(0, 1)?.toUpperCase() || ''

    return firstLetter + secondLetter
}

export function deepClone<T>(obj: T): T {
    if (typeof obj !== 'object' || obj === null) return obj;

    if (Array.isArray(obj)) {
        return obj.map(item => deepClone(item)) as T;
    }

    const clonedObj: Record<string, unknown> = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            clonedObj[key] = deepClone(obj[key]);
        }
    }

    return clonedObj as T;
}

export function deepEqual<T>(obj1: T, obj2: T): boolean {
    if (obj1 === obj2) return true;

    if (
        typeof obj1 !== "object" ||
        typeof obj2 !== "object" ||
        obj1 === null ||
        obj2 === null
    ) {
        return false;
    }

    const keys1 = Object.keys(obj1) as (keyof T)[];
    const keys2 = Object.keys(obj2) as (keyof T)[];

    if (keys1.length !== keys2.length) return false;

    return keys1.every((key) => deepEqual(obj1[key], obj2[key]));
};
