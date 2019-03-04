export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min)) + min
}

export const getRandomOf = <T>(xs: ArrayLike<T>) =>
  xs.length ? xs[getRandomInt(0, xs.length)] : null
