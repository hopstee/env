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