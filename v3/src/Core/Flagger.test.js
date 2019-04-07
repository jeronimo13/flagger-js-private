import Flagger from './Flagger'

let environment1, environment2

const gatingInfo1 = {
  flags: [
    {
      hashKey: '31',
      isWebAccessible: false,
      codename: 'brand-refresh',
      flagStatus: 'operational',
      flagType: 'uncategorized'
    },
    {
      hashKey: '32',
      isWebAccessible: false,
      codename: 'admin-tools',
      flagStatus: 'operational',
      flagType: 'uncategorized'
    },
    {
      hashKey: '33',
      isWebAccessible: false,
      codename: 'workers-comp',
      flagStatus: 'operational',
      flagType: 'uncategorized'
    },
    {
      hashKey: '34',
      isWebAccessible: false,
      codename: 'analytics-dashboard',
      flagStatus: 'archived',
      flagType: 'basic'
    },
    {
      splits: [{treatmentId: '73', percentage: 1.0}],
      populations: [
        {
          rules: [],
          universes: [],
          percentage: 0.66,
          entityType: 'Company',
          hashKey: '29'
        }
      ],
      overrides: [],
      treatments: [
        {
          treatmentId: '72',
          codename: 'off',
          payload: null,
          isControl: false,
          isOffTreatment: true
        },
        {
          treatmentId: '73',
          codename: 'on',
          payload: null,
          isControl: false,
          isOffTreatment: false
        }
      ],
      flagType: 'basic',
      hashKey: '35',
      isPaused: false,
      isWebAccessible: false,
      codename: 'open-enrollment-v2',
      flagStatus: 'operational'
    },
    {
      splits: [
        {treatmentId: '104', percentage: 0.0},
        {treatmentId: '75', percentage: 1.0}
      ],
      populations: [
        {
          rules: [],
          universes: [],
          percentage: 0.29,
          entityType: 'User',
          hashKey: '30'
        },
        {
          rules: [],
          universes: [],
          percentage: 0.1,
          entityType: 'User',
          hashKey: '40'
        }
      ],
      overrides: [],
      treatments: [
        {
          treatmentId: '74',
          codename: 'off',
          payload: null,
          isControl: false,
          isOffTreatment: true
        },
        {
          treatmentId: '75',
          codename: 'on',
          payload: null,
          isControl: false,
          isOffTreatment: false
        },
        {
          treatmentId: '104',
          codename: 'lilac-cat',
          payload: null,
          isControl: false,
          isOffTreatment: false
        }
      ],
      flagType: 'basic',
      hashKey: '36',
      isPaused: true,
      isWebAccessible: false,
      codename: 'bitcoin-pay',
      flagStatus: 'operational'
    },
    {
      hashKey: '37',
      isWebAccessible: false,
      codename: 'paper-paystubs',
      flagStatus: 'archived',
      flagType: 'basic'
    },
    {
      splits: [{treatmentId: '79', percentage: 1.0}],
      populations: [
        {
          rules: [],
          universes: [],
          percentage: 0.75,
          entityType: 'User',
          hashKey: '32'
        }
      ],
      overrides: [],
      treatments: [
        {
          treatmentId: '78',
          codename: 'off',
          payload: null,
          isControl: false,
          isOffTreatment: true
        },
        {
          treatmentId: '79',
          codename: 'on',
          payload: null,
          isControl: false,
          isOffTreatment: false
        }
      ],
      flagType: 'basic',
      hashKey: '38',
      isPaused: true,
      isWebAccessible: false,
      codename: 'vuejs-rewrite',
      flagStatus: 'operational'
    },
    {
      hashKey: '39',
      isWebAccessible: false,
      codename: 'expensify-integration',
      flagStatus: 'archived',
      flagType: 'basic'
    },
    {
      hashKey: '40',
      isWebAccessible: false,
      codename: 'calendar-sync',
      flagStatus: 'archived',
      flagType: 'basic'
    },
    {
      splits: [
        {treatmentId: '88', percentage: 0.0},
        {treatmentId: '89', percentage: 0.0},
        {treatmentId: '87', percentage: 1.0}
      ],
      populations: [
        {
          rules: [],
          universes: [],
          percentage: 0.5,
          entityType: 'User',
          hashKey: '35'
        }
      ],
      overrides: [],
      treatments: [
        {
          treatmentId: '86',
          codename: 'off',
          payload: null,
          isControl: false,
          isOffTreatment: true
        },
        {
          treatmentId: '87',
          codename: 'wood-plan',
          payload: null,
          isControl: false,
          isOffTreatment: false
        },
        {
          treatmentId: '88',
          codename: 'silver-plan',
          payload: null,
          isControl: false,
          isOffTreatment: false
        },
        {
          treatmentId: '89',
          codename: 'daily-plan',
          payload: null,
          isControl: false,
          isOffTreatment: false
        }
      ],
      flagType: 'basic',
      hashKey: '41',
      isPaused: true,
      isWebAccessible: false,
      codename: 'special-support-plans',
      flagStatus: 'operational'
    },
    {
      splits: [
        {treatmentId: '91', percentage: 1.0},
        {treatmentId: '92', percentage: 0.0},
        {treatmentId: '93', percentage: 0.0}
      ],
      populations: [
        {
          rules: [],
          universes: [],
          percentage: 0.33,
          entityType: 'User',
          hashKey: '36'
        }
      ],
      overrides: [],
      treatments: [
        {
          treatmentId: '90',
          codename: 'off',
          payload: null,
          isControl: false,
          isOffTreatment: true
        },
        {
          treatmentId: '91',
          codename: 'monthly',
          payload: null,
          isControl: false,
          isOffTreatment: false
        },
        {
          treatmentId: '92',
          codename: 'weekly',
          payload: null,
          isControl: false,
          isOffTreatment: false
        },
        {
          treatmentId: '93',
          codename: 'daily',
          payload: null,
          isControl: false,
          isOffTreatment: false
        }
      ],
      flagType: 'basic',
      hashKey: '42',
      isPaused: true,
      isWebAccessible: false,
      codename: 'automated-payroll-run',
      flagStatus: 'operational'
    },
    {
      splits: [{treatmentId: '95', percentage: 1.0}],
      populations: [
        {
          rules: [],
          universes: [
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}],
            [{treatmentId: '95', percentage: 1.0}]
          ],
          percentage: 0.33,
          entityType: 'User',
          hashKey: '37'
        }
      ],
      overrides: [],
      treatments: [
        {
          treatmentId: '94',
          codename: 'off',
          payload: null,
          isControl: false,
          isOffTreatment: true
        },
        {
          treatmentId: '95',
          codename: 'control',
          payload: null,
          isControl: true,
          isOffTreatment: false
        }
      ],
      flagType: 'experiment',
      hashKey: '43',
      isPaused: false,
      isWebAccessible: false,
      codename: 'new-checkout-flow',
      flagStatus: 'operational'
    },
    {
      splits: [
        {treatmentId: '97', percentage: 1.0},
        {treatmentId: '98', percentage: 0.0},
        {treatmentId: '99', percentage: 0.0},
        {treatmentId: '100', percentage: 0.0}
      ],
      populations: [
        {
          rules: [],
          universes: [
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ],
            [
              {treatmentId: '97', percentage: 1.0},
              {treatmentId: '98', percentage: 0.0},
              {treatmentId: '99', percentage: 0.0},
              {treatmentId: '100', percentage: 0.0}
            ]
          ],
          percentage: 0.33,
          entityType: 'User',
          hashKey: '38'
        }
      ],
      overrides: [],
      treatments: [
        {
          treatmentId: '96',
          codename: 'off',
          payload: null,
          isControl: false,
          isOffTreatment: true
        },
        {
          treatmentId: '97',
          codename: 'control',
          payload: null,
          isControl: true,
          isOffTreatment: false
        },
        {
          treatmentId: '98',
          codename: 'paleviolet-red',
          payload: null,
          isControl: false,
          isOffTreatment: false
        },
        {
          treatmentId: '99',
          codename: 'red',
          payload: null,
          isControl: false,
          isOffTreatment: false
        },
        {
          treatmentId: '100',
          codename: 'orange',
          payload: null,
          isControl: false,
          isOffTreatment: false
        }
      ],
      flagType: 'experiment',
      hashKey: '44',
      isPaused: true,
      isWebAccessible: false,
      codename: 'button-colors',
      flagStatus: 'operational'
    },
    {
      hashKey: '45',
      isWebAccessible: false,
      codename: 'surge-pricing',
      flagStatus: 'archived',
      flagType: 'experiment'
    }
  ],
  env: {hashKey: '7', envKey: 'onz2150xjon6pkjr'}
}

const gatingInfo2 = {
  flags: [
    {
      splits: [
        {treatmentId: '10961', percentage: 0.2},
        {treatmentId: '10962', percentage: 0.25},
        {treatmentId: '10963', percentage: 0.55}
      ],
      populations: [
        {
          rules: [],
          universes: [],
          percentage: 0.95,
          entityType: 'User',
          hashKey: '7283'
        },
        {
          rules: [],
          universes: [],
          percentage: 0.39,
          entityType: 'UserGroup',
          hashKey: '10568'
        },
        {
          rules: [
            {
              operator: 'lte',
              value: 15,
              attributeName: 'age',
              attributeType: 'int',
              valueList: null
            }
          ],
          universes: [],
          percentage: 1.0,
          entityType: 'Object',
          hashKey: '11011'
        }
      ],
      overrides: [
        {treatmentId: '19718', entityId: '2', entityType: 'User'},
        {treatmentId: '19718', entityId: '4', entityType: 'UserGroup'},
        {treatmentId: '10963', entityId: '1', entityType: 'User'},
        {treatmentId: '10961', entityId: '9', entityType: 'UserGroup'}
      ],
      treatments: [
        {
          treatmentId: '10961',
          codename: 'default',
          payload: null,
          isControl: false,
          isOffTreatment: false
        },
        {
          treatmentId: '10962',
          codename: 'variation-1',
          payload: null,
          isControl: false,
          isOffTreatment: false
        },
        {
          treatmentId: '10963',
          codename: 'variation-2',
          payload: null,
          isControl: false,
          isOffTreatment: false
        },
        {
          treatmentId: '19718',
          codename: 'off',
          payload: null,
          isControl: false,
          isOffTreatment: true
        }
      ],
      flagType: 'basic',
      hashKey: '267',
      isPaused: false,
      isWebAccessible: true,
      codename: 'bitcoin-pay',
      flagStatus: 'operational'
    }
  ],
  env: {hashKey: '94', envKey: 'z2veg4bd2vnuu8j8'},
  sdkInfo: {SDK_INGESTION_INTERVAL: 60, SDK_INGESTION_MAX_ITEMS: 500}
}

beforeEach(() => {
  environment1 = new Flagger()
  environment1.configure({gatingInfo: gatingInfo1})

  environment2 = new Flagger()
  environment2.configure({gatingInfo: gatingInfo2})
})

// test creation of flags

test('uncategorized flags correctly can tell that they are uncategorized', () => {
  const flagNames = ['workers-comp', 'admin-tools', 'brand-refresh']
  for (let i = 0; i < flagNames.length; i++) {
    const flag = environment1.flag(flagNames[i])
    expect(flag.isUncategorized()).toEqual(true)
  }
})

test('basic flags correctly can tell that they are basic flags', () => {
  const flagNames = [
    'calendar-sync',
    'paper-paystubs',
    'vuejs-rewrite',
    'analytics-dashboard',
    'special-support-plans',
    'open-enrollment-v2',
    'bitcoin-pay',
    'expensify-integration',
    'automated-payroll-run'
  ]
  for (let i = 0; i < flagNames.length; i++) {
    const flag = environment1.flag(flagNames[i])
    expect(flag.getType()).toEqual('basic')
  }
})

test('experiment flags correctly can tell that they are experiment flags', () => {
  const flagNames = ['button-colors', 'new-checkout-flow', 'surge-pricing']
  for (let i = 0; i < flagNames.length; i++) {
    const flag = environment1.flag(flagNames[i])
    expect(flag.getType()).toEqual('experiment')
  }
})

test('archived flags correctly can tell that they are archived', () => {
  const flagNames = [
    'calendar-sync',
    'paper-paystubs',
    'analytics-dashboard',
    'expensify-integration',
    'surge-pricing'
  ]
  for (let i = 0; i < flagNames.length; i++) {
    const flag = environment1.flag(flagNames[i])
    expect(flag.isArchived()).toEqual(true)
  }
})

test('paused flags correctly can tell that they are paused', () => {
  const flagNames = [
    'vuejs-rewrite',
    'special-support-plans',
    'bitcoin-pay',
    'automated-payroll-run'
  ]
  for (let i = 0; i < flagNames.length; i++) {
    const flag = environment1.flag(flagNames[i])
    expect(flag.isPaused).toEqual(true)
  }
})
