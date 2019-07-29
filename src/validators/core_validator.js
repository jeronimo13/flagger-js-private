import {logger} from '../logger'

const validate = () => {
  return true
}

export const isValidFlagConfig = flagConfig => {
  const isValid = validate(flagConfig)
  if (!isValid) {
    logger(validate.errors.map(e => e.message))
  }
  return isValid
}
