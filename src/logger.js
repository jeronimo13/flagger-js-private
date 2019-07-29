export let logger = x => {
  // eslint-disable-next-line no-console
  console.error(x)
}

export function setLogger(fn) {
  logger = fn
}
