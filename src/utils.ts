import dargs from 'dargs'

type DargsFlags = {
  '--'?: string[] | undefined
  _?: string[] | undefined
} & Record<string, string | number | boolean | readonly string[]>

const args = (url: string, flags: DargsFlags = {}) => {
  const argsList = dargs(flags, { useEquals: false })
  return [url].concat(argsList).filter(Boolean)
}

const isJSON = (str = '') => str.startsWith('{')

export {
  args,
  isJSON,
  DargsFlags,
}
