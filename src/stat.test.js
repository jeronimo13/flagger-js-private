import Stat from './stat'

let stat1, stat2, stat3, stat4

beforeEach(() => {
  stat1 = new Stat('hello', Stat.TYPE_DURATION)
  stat2 = new Stat('hello', Stat.TYPE_DURATION)
  stat3 = new Stat('bye', Stat.TYPE_COUNT)
  stat4 = new Stat('bye', Stat.TYPE_COUNT)
})

test('compacts stats of same name and type', () => {
  stat1.start()
  stat1.stop()
  stat2.start()
  stat2.stop()
  expect(Stat.compactStats([stat1, stat2])).toHaveLength(1)
})

test('compacts all name & type combinations', () => {
  stat1.start()
  stat1.stop()
  stat2.start()
  stat2.stop()
  stat3.setCount(5)
  stat4.setCount(8)
  expect(Stat.compactStats([stat1, stat2, stat3, stat4])).toHaveLength(2)
})

test.skip('compacting duration sets average duration', () => {
  stat1.start()
  stat1.stop()
  stat2.start()
  stat2.stop()
  expect(Stat.compactStats([stat1, stat2])[0].averageDuration).toEqual(
    (stat1.getDuration() + stat2.getDuration()) / 2
  )
})

test.skip('can compact duration multiple times', () => {
  stat1.start()
  stat1.stop()
  stat2.start()
  stat2.stop()
  expect(
    Stat.compactStats(Stat.compactStats([stat1, stat2]).concat([stat1]))[0]
      .averageDuration
  ).toEqual(
    (stat1.getDuration() + stat1.getDuration() + stat2.getDuration()) / 3
  )
})

test('compacting counts totals count', () => {
  stat3.setCount(Math.floor(Math.random() * 1000))
  stat4.setCount(Math.floor(Math.random() * 1000))
  expect(Stat.compactStats([stat3, stat4])[0].count).toEqual(
    stat3.count + stat4.count
  )
})

test('count returned is accurate', () => {
  stat3.setCount(5)
  expect(stat3.getStatsObj().count).toEqual(5)
})
