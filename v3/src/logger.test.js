import logger from './logger'

test('logger.debug() calls console.debug()', () => {
  logger.setLogLevel('debug')
  console.debug = jest.fn()
  logger.debug('hello world 123')
  expect(console.debug.mock.calls[0][0]).toBe('hello world 123')
})

test('logger.info() calls console.info()', () => {
  logger.setLogLevel('info')
  console.info = jest.fn()
  logger.info('hello world 234')
  expect(console.info.mock.calls[0][0]).toBe('hello world 234')
})

test('logger.warn() calls console.warn()', () => {
  logger.setLogLevel('warn')
  console.warn = jest.fn()
  logger.warn('hello world 345')
  expect(console.warn.mock.calls[0][0]).toBe('hello world 345')
})

test('logger.error() calls console.error()', () => {
  logger.setLogLevel('error')
  console.error = jest.fn()
  logger.error('hello world 456')
  expect(console.error.mock.calls[0][0]).toBe('hello world 456')
})

test('logger.log() aliases logger.info()', () => {
  logger.setLogLevel('info')
  console.info = jest.fn()
  logger.log('hello world 567')
  expect(console.info.mock.calls[0][0]).toBe('hello world 567')
})

test('default logLevel blocks debug statements', () => {
  logger.setLogLevel()
  console.debug = jest.fn()
  logger.debug('hello world 678')
  expect(console.debug).not.toBeCalled()
})

test('invalid logLevel will default to error only', () => {
  logger.setLogLevel('bullschniz')

  expect(logger.validLevels).toEqual(['error'])

  console.debug = jest.fn()
  console.info = jest.fn()
  console.warn = jest.fn()
  console.error = jest.fn()

  logger.debug('hello world 789')
  logger.info('hello world 789')
  logger.log('hello world 789')
  logger.warn('hello world 789')
  logger.error('hello world 789')

  expect(console.debug).not.toBeCalled()
  expect(console.info).not.toBeCalled()
  expect(console.warn).not.toBeCalled()
  expect(console.error.mock.calls[0][0]).toBe('hello world 789')
})
