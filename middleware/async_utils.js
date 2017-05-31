export const timeout = ms => {
  return new Promise((resolve, reject) => setTimeout(resolve, ms))
}

export const sleep = async (ms, func, ...args) => {
  await timeout(ms)
  return func(...args)
}
