/// <reference types="lodash" />

declare module 'futil-js' {

  // Arrays
  // ------

  export function compactJoin(joinString: string):
    (xs: string[]) => string

  export function dotJoin(xs: string[]): string

  export function dotJoinWith(filterFunction: Function): 
    (xs: string[]) => string

  export function repeated<T>(xs: T[]): T[]
}
