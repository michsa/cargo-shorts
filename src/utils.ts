import Color from 'color'

export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

export const getRandomOf = <T>(xs: ArrayLike<T>): T | null =>
  xs.length ? xs[getRandomInt(0, xs.length)] : null

export const modulate = (fn: string, value: unknown, color: string): string =>
  Color(color)
    [fn](value)
    .string()
