import nock from 'nock'
import React from 'react'
import renderer from 'react-test-renderer'

import Airship from './index'
import {withFlag, FlagSwitch, Flag} from './react'

beforeAll(async () => {
  nock('https://api.airshiphq.com', {encodedQueryParams: true})
    .get('/v2/gating-info/onz2150xjon6pkjr')
    .query({casing: 'camel'})
    .reply(200, {
      flags: [
        {
          splits: [{treatmentId: '36', percentage: 1}],
          populations: [
            {
              rules: [],
              universes: [],
              percentage: 0,
              entityType: 'User',
              hashKey: '1'
            }
          ],
          overrides: [{treatmentId: '36', entityId: '1', entityType: 'User'}],
          treatments: [
            {
              treatmentId: '35',
              codename: 'off',
              isControl: false,
              isOffTreatment: true
            },
            {
              treatmentId: '36',
              codename: 'on',
              isControl: false,
              isOffTreatment: false,
              payload: {
                a: 'b'
              }
            }
          ],
          flagType: 'basic',
          hashKey: '16',
          isPaused: false,
          isWebAccessible: true,
          codename: 'bitcoin-pay',
          flagStatus: 'operational'
        },
        {
          splits: [
            {treatmentId: '40', percentage: 0},
            {treatmentId: '38', percentage: 1},
            {treatmentId: '39', percentage: 0}
          ],
          populations: [
            {
              rules: [],
              universes: [],
              percentage: 0,
              entityType: 'User',
              hashKey: '2'
            }
          ],
          overrides: [
            {treatmentId: '38', entityId: '1', entityType: 'User'},
            {treatmentId: '39', entityId: '2', entityType: 'User'},
            {treatmentId: '40', entityId: '3', entityType: 'User'}
          ],
          treatments: [
            {
              treatmentId: '37',
              codename: 'off',
              isControl: false,
              isOffTreatment: true
            },
            {
              treatmentId: '38',
              codename: 'default',
              isControl: false,
              isOffTreatment: false
            },
            {
              treatmentId: '39',
              codename: 'variation-1',
              isControl: false,
              isOffTreatment: false
            },
            {
              treatmentId: '40',
              codename: 'variation-2',
              isControl: false,
              isOffTreatment: false
            }
          ],
          flagType: 'basic',
          hashKey: '17',
          isPaused: false,
          isWebAccessible: true,
          codename: 'treatment',
          flagStatus: 'operational'
        }
      ],
      env: {hashKey: '1', envKey: 'onz2150xjon6pkjr'},
      sdkInfo: {SDK_INGESTION_INTERVAL: 60, SDK_INGESTION_MAX_ITEMS: 500}
    })
  nock.disableNetConnect()

  await Airship.configure({envKey: 'onz2150xjon6pkjr'})
  Airship.identify({id: 1})
})

afterAll(() => {
  nock.cleanAll()
  nock.enableNetConnect()
})

test('withFlag adds flags.<name>.enabled property', () => {
  function TestComponent(props) {
    return <div>{props.flags['bitcoin-pay'].enabled.toString()}</div>
  }

  const WrappedComponent = withFlag(TestComponent, 'bitcoin-pay')

  const component = renderer.create(<WrappedComponent />)

  expect(component.toJSON()).toMatchSnapshot()
})

test('withFlag adds flags.<name>.eligible property', () => {
  function TestComponent(props) {
    return <div>{props.flags['bitcoin-pay'].eligible.toString()}</div>
  }

  const WrappedComponent = withFlag(TestComponent, 'bitcoin-pay')

  const component = renderer.create(<WrappedComponent />)

  expect(component.toJSON()).toMatchSnapshot()
})

test('withFlag adds flags.<name>.treatment property', () => {
  function TestComponent(props) {
    return <div>{props.flags['bitcoin-pay'].treatment.toString()}</div>
  }
  const WrappedComponent = withFlag(TestComponent, 'bitcoin-pay')

  const component = renderer.create(<WrappedComponent />)

  expect(component.toJSON()).toMatchSnapshot()
})

test('withFlag adds flags.<name>.payload property', () => {
  function TestComponent(props) {
    return <div>{JSON.stringify(props.flags['bitcoin-pay'].payload)}</div>
  }
  const WrappedComponent = withFlag(TestComponent, 'bitcoin-pay')

  const component = renderer.create(<WrappedComponent />)

  expect(component.toJSON()).toMatchSnapshot()
})

test('withFlag wrapped components accept entity prop', () => {
  function TestComponent(props) {
    return <div>{props.flags['bitcoin-pay'].enabled.toString()}</div>
  }
  const WrappedComponent = withFlag(TestComponent, 'bitcoin-pay')

  const component = renderer.create(<WrappedComponent entity={{id: 2}} />)

  expect(component.toJSON()).toMatchSnapshot()
})

test('withFlag wrapped components handles invalid flag name', () => {
  function TestComponent(props) {
    return <div>{props.flags['unreal-flag'].enabled.toString()}</div>
  }
  const WrappedComponent = withFlag(TestComponent, 'unreal-flag')

  const component = renderer.create(<WrappedComponent entity={{id: 2}} />)

  expect(component.toJSON()).toMatchSnapshot()
})

test('FlagSwitch accepts entity prop', () => {
  const component = renderer.create(
    <FlagSwitch flag="bitcoin-pay" entity={{id: 2}}>
      <Flag case="on">On!</Flag>
      <Flag case="off">Off!</Flag>
    </FlagSwitch>
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('Flag can inherit flag prop from FlagSwitch', () => {
  const component = renderer.create(
    <FlagSwitch flag="bitcoin-pay">
      <Flag case="on">On!</Flag>
      <Flag case="off">Off!</Flag>
    </FlagSwitch>
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('Flag can override flag prop from FlagSwitch', () => {
  const component = renderer.create(
    <FlagSwitch flag="bitcoin-pay">
      <Flag flag="treatment" case="default">
        Default
      </Flag>
      <Flag flag="treatment" case="variation-1">
        Variation 1
      </Flag>
      <Flag flag="treatment" case="variation-2">
        Variation 1
      </Flag>
      <Flag flag="treatment" case="off">
        Off
      </Flag>
    </FlagSwitch>
  )

  expect(component.toJSON()).toMatchSnapshot()
})

test('Flag accepts entity prop', () => {
  const component = renderer.create(
    <>
      <Flag flag="treatment" entity={{id: 2}} case="default">
        Default
      </Flag>
      <Flag flag="treatment" entity={{id: 2}} case="variation-1">
        Variation 1
      </Flag>
      <Flag flag="treatment" entity={{id: 2}} case="variation-2">
        Variation 2
      </Flag>
      <Flag flag="treatment" entity={{id: 2}} case="off">
        Off
      </Flag>
    </>
  )

  expect(component.toJSON()).toMatchSnapshot()
})
