!(function(e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t(
        require('@babel/runtime-corejs2/core-js/number/is-integer'),
        require('@babel/runtime-corejs2/core-js/object/assign'),
        require('md5'),
        require('fast-json-stable-stringify'),
        require('@babel/runtime-corejs2/core-js/parse-float'),
        require('@babel/runtime-corejs2/core-js/parse-int'),
        require('@babel/runtime-corejs2/core-js/object/values'),
        require('@babel/runtime-corejs2/regenerator'),
        require('@babel/runtime-corejs2/core-js/date/now'),
        require('@babel/runtime-corejs2/core-js/array/is-array'),
        require('@babel/runtime-corejs2/core-js/json/stringify'),
        require('@babel/runtime-corejs2/core-js/array/from'),
        require('@babel/runtime-corejs2/core-js/set'),
        require('eventsource'),
        require('http'),
        require('https'),
        require('url'),
        require('@babel/runtime-corejs2/core-js/object/keys')
      ))
    : 'function' == typeof define && define.amd
      ? define([
          '@babel/runtime-corejs2/core-js/number/is-integer',
          '@babel/runtime-corejs2/core-js/object/assign',
          'md5',
          'fast-json-stable-stringify',
          '@babel/runtime-corejs2/core-js/parse-float',
          '@babel/runtime-corejs2/core-js/parse-int',
          '@babel/runtime-corejs2/core-js/object/values',
          '@babel/runtime-corejs2/regenerator',
          '@babel/runtime-corejs2/core-js/date/now',
          '@babel/runtime-corejs2/core-js/array/is-array',
          '@babel/runtime-corejs2/core-js/json/stringify',
          '@babel/runtime-corejs2/core-js/array/from',
          '@babel/runtime-corejs2/core-js/set',
          'eventsource',
          'http',
          'https',
          'url',
          '@babel/runtime-corejs2/core-js/object/keys'
        ], t)
      : (e.Flagger = t(
          e._Number$isInteger,
          e._Object$assign,
          e.md5,
          e.stringify,
          e._parseFloat,
          e._parseInt,
          e._Object$values,
          e._regeneratorRuntime,
          e._Date$now,
          e._Array$isArray,
          e._JSON$stringify,
          e._Array$from,
          e._Set,
          e.EventSource,
          e.http,
          e.https,
          e.url,
          e._Object$keys
        ))
})(this, function(i, g, t, e, k, n, r, f, h, m, p, b, I, v, a, s, o, u) {
  'use strict'
  function l(e) {
    return (l =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function(e) {
            return typeof e
          }
        : function(e) {
            return e &&
              'function' == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? 'symbol'
              : typeof e
          })(e)
  }
  function c(e, t, n, r, i, a, s) {
    try {
      var o = e[a](s),
        u = o.value
    } catch (e) {
      return void n(e)
    }
    o.done ? t(u) : Promise.resolve(u).then(r, i)
  }
  function d(o) {
    return function() {
      var e = this,
        s = arguments
      return new Promise(function(t, n) {
        var r = o.apply(e, s)
        function i(e) {
          c(r, t, n, i, a, 'next', e)
        }
        function a(e) {
          c(r, t, n, i, a, 'throw', e)
        }
        i(void 0)
      })
    }
  }
  function y(e, t) {
    if (!(e instanceof t))
      throw new TypeError('Cannot call a class as a function')
  }
  function _(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n]
      ;(r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        'value' in r && (r.writable = !0),
        Object.defineProperty(e, r.key, r)
    }
  }
  function w(e, t, n) {
    return t && _(e.prototype, t), n && _(e, n), e
  }
  function S(e, t, n) {
    return (
      t in e
        ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
          })
        : (e[t] = n),
      e
    )
  }
  function j(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = null != arguments[e] ? arguments[e] : {},
        r = Object.keys(n)
      'function' == typeof Object.getOwnPropertySymbols &&
        (r = r.concat(
          Object.getOwnPropertySymbols(n).filter(function(e) {
            return Object.getOwnPropertyDescriptor(n, e).enumerable
          })
        )),
        r.forEach(function(e) {
          S(t, e, n[e])
        })
    }
    return t
  }
  function O(e, t) {
    if ('function' != typeof t && null !== t)
      throw new TypeError('Super expression must either be null or a function')
    ;(e.prototype = Object.create(t && t.prototype, {
      constructor: {value: e, writable: !0, configurable: !0}
    })),
      t && T(e, t)
  }
  function x(e) {
    return (x = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function(e) {
          return e.__proto__ || Object.getPrototypeOf(e)
        })(e)
  }
  function T(e, t) {
    return (T =
      Object.setPrototypeOf ||
      function(e, t) {
        return (e.__proto__ = t), e
      })(e, t)
  }
  function E(e) {
    if (void 0 === e)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called"
      )
    return e
  }
  function D(e, t) {
    return !t || ('object' != typeof t && 'function' != typeof t) ? E(e) : t
  }
  ;(i = i && i.hasOwnProperty('default') ? i.default : i),
    (g = g && g.hasOwnProperty('default') ? g.default : g),
    (t = t && t.hasOwnProperty('default') ? t.default : t),
    (e = e && e.hasOwnProperty('default') ? e.default : e),
    (k = k && k.hasOwnProperty('default') ? k.default : k),
    (n = n && n.hasOwnProperty('default') ? n.default : n),
    (r = r && r.hasOwnProperty('default') ? r.default : r),
    (f = f && f.hasOwnProperty('default') ? f.default : f),
    (h = h && h.hasOwnProperty('default') ? h.default : h),
    (m = m && m.hasOwnProperty('default') ? m.default : m),
    (p = p && p.hasOwnProperty('default') ? p.default : p),
    (b = b && b.hasOwnProperty('default') ? b.default : b),
    (I = I && I.hasOwnProperty('default') ? I.default : I),
    (v = v && v.hasOwnProperty('default') ? v.default : v),
    (u = u && u.hasOwnProperty('default') ? u.default : u)
  var P = function(e) {
    console.error(e)
  }
  var U = function() {
      return !0
    },
    G = 'User',
    N = (function() {
      function n(e) {
        y(this, n)
        var t = n.isValidObject(e)
        t
          ? ((e = n._cloneObject(e)),
            (t = n._fillInFields(e)),
            (this.object = t ? e : null))
          : (this.object = null)
      }
      return (
        w(
          n,
          [
            {
              key: 'getHash',
              value: function() {
                return t(
                  e(
                    j({}, this.object, {
                      attributes: this.object.attributes || {},
                      group: j({}, this.object.group, {
                        attributes:
                          (this.object.group && this.object.group.attributes) ||
                          {}
                      })
                    })
                  )
                )
              }
            },
            {
              key: 'getId',
              value: function() {
                var e = this.object
                return ''.concat(e.type, '_').concat(e.id)
              }
            },
            {
              key: 'isValid',
              value: function() {
                return null !== this.object
              }
            },
            {
              key: 'getRawObject',
              value: function() {
                return this.object
              }
            },
            {
              key: 'getObject',
              value: function() {
                var e = this.object,
                  t = g({}, e)
                return delete t.group, new n(t)
              }
            },
            {
              key: 'getGroup',
              value: function() {
                var e = this.object.group || null
                return e && new n(e)
              }
            }
          ],
          [
            {
              key: 'isValidObject',
              value: function(e) {
                var t = !0
                if (
                  (t ||
                    P(
                      U.errors.map(function(e) {
                        return e.message
                      })
                    ),
                  t)
                ) {
                  var n = void 0 !== e.isGroup && e.isGroup,
                    r = void 0 !== e.type ? e.type : G,
                    i = r.lastIndexOf('Group')
                  ;-1 === i ||
                    i !== r.length - 'Group'.length ||
                    n ||
                    (P(
                      "An entity's type that ends with `Group` must be a group entity and therefore has to have an explicit `isGroup: true` property"
                    ),
                    (t = !1))
                }
                return t
              }
            },
            {
              key: '_cloneObject',
              value: function(e) {
                var t = g({}, e)
                return (
                  void 0 !== e.attributes &&
                    (t.attributes = g({}, e.attributes)),
                  void 0 !== e.group &&
                    ((t.group = g({}, e.group)),
                    void 0 !== e.group.attributes &&
                      (t.group.attributes = g({}, e.group.attributes))),
                  t
                )
              }
            },
            {
              key: '_fillInFields',
              value: function(e) {
                if (
                  (void 0 === e.type && (e.type = G),
                  void 0 === e.displayName && (e.displayName = '' + e.id),
                  void 0 === e.isGroup && (e.isGroup = !1),
                  i(e.id))
                ) {
                  var t = '' + e.id
                  if (250 < t.length)
                    return P('Integer id must have 250 digits or less'), !1
                  e.id = t
                }
                var n = null
                if (
                  (void 0 !== e.group && (n = e.group),
                  null !== n &&
                    void 0 === n.displayName &&
                    (n.displayName = '' + n.id),
                  null !== n &&
                    void 0 === n.type &&
                    (n.type = e.type + 'Group'),
                  null !== n && (n.isGroup = !0),
                  null !== n && i(n.id))
                ) {
                  var r = '' + n.id
                  if (250 < r.length)
                    return P('Integer id must have 250 digits or less'), !1
                  n.id = r
                }
                return !0
              }
            }
          ]
        ),
        n
      )
    })(),
    A = 'string',
    L = 'float',
    C = 'boolean',
    K = 'date',
    R = 'datetime',
    M = 'is',
    F = 'is_not',
    z = 'in',
    q = 'not_in',
    V = 'lt',
    W = 'lte',
    B = 'gt',
    H = 'gte',
    Y = 'from',
    $ = 'until',
    J = 'after',
    X = 'before',
    Z = function(e) {
      return (1 * n(t(e), 16)) / 3402823669209385e23
    },
    Q = (function() {
      function h(e) {
        y(this, h), (this.population = e)
      }
      return (
        w(
          h,
          [
            {
              key: '_ruleMatches',
              value: function(e, t) {
                var n = t.attributes || {}
                if (!n.hasOwnProperty(e.attributeName)) return !1
                var r = n[e.attributeName],
                  i = h.categorizeValueType(r),
                  a = ['int', L]
                if (-1 !== a.indexOf(i) && -1 !== a.indexOf(e.attributeType));
                else if (i !== e.attributeType) return !1
                var s = e.value,
                  o = e.valueList,
                  u = e.operator
                if (i === A)
                  return u === M
                    ? r === s
                    : u === F
                      ? r !== s
                      : u === z
                        ? -1 !== o.indexOf(r)
                        : u === q
                          ? -1 === o.indexOf(r)
                          : (P('Invalid rule operator encountered'), !1)
                if (-1 !== a.indexOf(i))
                  return u === M
                    ? r === s
                    : u === F
                      ? r !== s
                      : u === z
                        ? -1 !== o.indexOf(r)
                        : u === q
                          ? -1 === o.indexOf(r)
                          : u === V
                            ? r < s
                            : u === W
                              ? r <= s
                              : u === B
                                ? s < r
                                : u === H
                                  ? s <= r
                                  : (P('Invalid rule operator encountered'), !1)
                if (i === C)
                  return u === M
                    ? r === s
                    : u === F
                      ? r !== s
                      : (P('Invalid rule operator encountered'), !1)
                if (i !== K && i !== R)
                  return P('Invalid attribute type encountered'), !1
                var l = s && new Date(s).getTime(),
                  c =
                    o &&
                    o.map(function(e) {
                      return new Date(e).getTime()
                    }),
                  f = new Date(r).getTime()
                return u === M
                  ? f === l
                  : u === F
                    ? f !== l
                    : u === z
                      ? -1 !== c.indexOf(f)
                      : u === q
                        ? -1 === c.indexOf(f)
                        : u === Y
                          ? l <= f
                          : u === $
                            ? f <= l
                            : u === J
                              ? l < f
                              : u === X
                                ? f < l
                                : (P('Invalid rule operator encountered'), !1)
              }
            },
            {
              key: 'getGateValues',
              value: function(e, t, n, r) {
                var i = this.population
                if (this.population.entityType !== e.type) return {eligible: !1}
                for (var a = i.rules, s = !0, o = 0; o < a.length; o++) {
                  var u = a[o]
                  s = s && this._ruleMatches(u, e)
                }
                if (s) {
                  var l = 'SAMPLING:control_'
                      .concat(n.hashKey, ':env_')
                      .concat(t.hashKey, ':rule_set_')
                      .concat(this.population.hashKey, ':client_object_')
                      .concat(e.type, '_')
                      .concat(e.id),
                    c = Z(l)
                  if (
                    c <= this.population.percentage &&
                    0 < this.population.percentage
                  ) {
                    for (
                      var f = r
                          ? this.population.universes[
                              Math.max(Math.floor(100 * c) - 1, 0)
                            ]
                          : n.splits,
                        h = {},
                        p = 0;
                      p < f.length;
                      p++
                    ) {
                      var g = f[p]
                      h[g.treatmentId] = g
                    }
                    for (
                      var v = 'DISTRIBUTION:control_'
                          .concat(n.hashKey, ':env_')
                          .concat(t.hashKey, ':client_object_')
                          .concat(e.type, '_')
                          .concat(e.id),
                        d = Z(v),
                        y = 0,
                        m = n.treatments.filter(function(e) {
                          return !e.isOffTreatment
                        }),
                        b = null,
                        I = 0;
                      I < m.length;
                      I++
                    ) {
                      var _ = m[I]
                      if (
                        h.hasOwnProperty(_.treatmentId) &&
                        d <=
                          (y = k((y + h[_.treatmentId].percentage).toFixed(3)))
                      ) {
                        b = _
                        break
                      }
                    }
                    return {treatment: b, eligible: !0}
                  }
                  return {eligible: !0}
                }
                return {eligible: !1}
              }
            }
          ],
          [
            {
              key: 'categorizeValueType',
              value: function(e) {
                if (!0 === e || !1 === e) return 'boolean'
                if ('number' == typeof e)
                  return 0 <= (e + '').indexOf('.') ? 'float' : 'int'
                if ('string' != typeof e)
                  return P('Unexpected attribute value type encountered'), null
                var t = new Date(e).getTime()
                if (isNaN(t)) return 'string'
                var n = new Date(e).toISOString(),
                  r = n.lastIndexOf('T00:00:00.000Z')
                return -1 !== r && n.length - 'T00:00:00.000Z'.length === r
                  ? 'date'
                  : 'datetime'
              }
            }
          ]
        ),
        h
      )
    })(),
    ee = (function() {
      function i(e, t) {
        if ((y(this, i), -1 === [i.TYPE_DURATION, i.TYPE_COUNT].indexOf(t)))
          throw 'Invalid stat type passed'
        ;(this.name = e),
          (this.type = t),
          (this.count = 0),
          (this.startTime = null),
          (this.averageDuration = 0)
      }
      return (
        w(i, null, [
          {
            key: 'compactStats',
            value: function(e) {
              var t = e.reduce(function(e, t) {
                var n = [t.name, t.type].join(',')
                return (e[n] = e[n] || []), e[n].push(t), e
              }, {})
              return r(t).map(function(e) {
                var t,
                  n,
                  r = new i(e[0].name, e[0].type)
                switch (r.type) {
                  case i.TYPE_DURATION:
                    ;(t = e.reduce(function(e, t) {
                      return e + t.averageDuration * t.count
                    }, 0)),
                      (n = e.reduce(function(e, t) {
                        return e + t.count
                      }, 0)),
                      r.setAverageDuration(t / n),
                      r.setCount(n)
                    break
                  case i.TYPE_COUNT:
                    r.setCount(
                      e.reduce(function(e, t) {
                        return e + t.count
                      }, 0)
                    )
                }
                return r
              })
            }
          }
        ]),
        w(i, [
          {
            key: 'start',
            value: function() {
              return this
            }
          },
          {
            key: 'stop',
            value: function() {
              return this
            }
          },
          {
            key: 'setCount',
            value: function(e) {
              return (this.count = e), this
            }
          },
          {
            key: 'setAverageDuration',
            value: function(e) {
              return (this.averageDuration = e), this
            }
          },
          {
            key: 'getDuration',
            value: function() {
              return this.averageDuration
            }
          },
          {
            key: 'getStatsObj',
            value: function() {
              var e = {name: this.name}
              if (this.type === i.TYPE_DURATION) {
                if (0 !== this.averageDuration)
                  return (
                    (e.duration = this.averageDuration),
                    (e.unit = 'ns'),
                    (e.count = this.count),
                    e
                  )
              } else if (this.type === i.TYPE_COUNT)
                return (e.count = this.count), e
              return null
            }
          }
        ]),
        i
      )
    })()
  ;(ee.TYPE_DURATION = 'stat_type__duration'),
    (ee.TYPE_COUNT = 'stat_type__count')
  var te,
    ne = (function() {
      function n(e, t) {
        y(this, n),
          'string' == typeof e
            ? ((this._isWild = !0), (this.flagName = e))
            : ((this.hashKey = e.hashKey),
              (this.flag = e),
              (this.codename = e.codename),
              (this.isPaused = e.isPaused),
              (this.offTreatment = e.offTreatment),
              (this.treatments = e.treatments),
              (this.treatmentsMap = e.treatmentsMap),
              (this.overrides = e.overrides),
              (this.populations = e.populations),
              (this.splits = e.splits)),
          (this.delegate = t)
      }
      return (
        w(n, [
          {
            key: 'isUncategorized',
            value: function() {
              return (
                Boolean(this._isWild) || 'uncategorized' === this.flag.flagType
              )
            }
          },
          {
            key: 'isWild',
            value: function() {
              return Boolean(this._isWild)
            }
          },
          {
            key: 'isArchived',
            value: function() {
              return 'archived' === this.flag.flagStatus
            }
          },
          {
            key: 'setDelegate',
            value: function(e) {
              this.delegate = e
            }
          },
          {
            key: 'getType',
            value: function() {
              if (this._isWild)
                return (
                  P(
                    'Encountered uncategorized flag "'.concat(
                      this.flagName,
                      '". Visit Airship web app to convert it to a real flag'
                    )
                  ),
                  'uncategorized'
                )
              switch (this.flag.flagType) {
                case 'basic':
                  return 'basic'
                case 'experiment':
                  return 'experiment'
                case 'uncategorized':
                  return 'uncategorized'
                default:
                  return P('Unexpected flag type encountered'), null
              }
            }
          },
          {
            key: 'getTreatment',
            value: function(e) {
              if (!this.delegate) throw 'Delegate not provided to flag'
              return this.delegate.getTreatment(this, e)
            }
          },
          {
            key: 'getPayload',
            value: function(e) {
              if (!this.delegate) throw 'Delegate not provided to flag'
              return this.delegate.getPayload(this, e)
            }
          },
          {
            key: 'isEligible',
            value: function(e) {
              if (!this.delegate) throw 'Delegate not provided to flag'
              return this.delegate.isEligible(this, e)
            }
          },
          {
            key: 'isEnabled',
            value: function(e) {
              if (!this.delegate) throw 'Delegate not provided to flag'
              return this.delegate.isEnabled(this, e)
            }
          }
        ]),
        n
      )
    })(),
    re = (function() {
      function e() {
        y(this, e)
      }
      var t, n
      return (
        w(e, [
          {
            key: 'identify',
            value: function(e) {
              this.object = e
            }
          },
          {
            key: 'maybeIngest',
            value: ((n = d(
              f.mark(function e() {
                return f.wrap(
                  function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                        case 'end':
                          return e.stop()
                      }
                  },
                  e,
                  this
                )
              })
            )),
            function() {
              return n.apply(this, arguments)
            })
          },
          {
            key: '_identifyObject',
            value: function(e) {
              return e instanceof N ? e : new N(e)
            }
          },
          {key: '_saveStat', value: function() {}},
          {key: '_saveExposure', value: function() {}},
          {
            key: 'publish',
            value: ((t = d(
              f.mark(function e(t) {
                return f.wrap(
                  function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                        case 'end':
                          return e.stop()
                      }
                  },
                  e,
                  this
                )
              })
            )),
            function(e) {
              return t.apply(this, arguments)
            })
          },
          {key: 'shutdown', value: function() {}},
          {
            key: 'flag',
            value: function(e) {
              var t = this.router ? this.router.getFlag(e) : new ne(e)
              return t.setDelegate(this), t
            }
          },
          {
            key: '_getAllocation',
            value: function(e, t) {
              var n = e.offTreatment
              if (e.isArchived())
                return (
                  P('The flag "'.concat(e.codename, '" has been archived')),
                  {treatment: n, eligible: !1}
                )
              if (e.isPaused) return {treatment: n, eligible: !1}
              if (!t) return {treatment: n, eligible: !1}
              var r = t.getId(),
                i = e.overrides[r]
              if (i) {
                var a = e.treatmentsMap[i.treatmentId]
                return {
                  treatment: a,
                  eligible: !a.isOffTreatment,
                  fromOverride: !0
                }
              }
              for (
                var s = t.getRawObject(),
                  o = 'experiment' === e.getType(),
                  u = e.populations,
                  l = null,
                  c = !1,
                  f = 0;
                f < u.length;
                f++
              ) {
                var h = new Q(u[f]).getGateValues(s, this.router.getEnv(), e, o)
                if (((c = c || h.eligible), h.treatment)) {
                  l = h.treatment
                  break
                }
              }
              return {treatment: l || n, eligible: c}
            }
          },
          {
            key: '_resolveAllocations',
            value: function(e, t) {
              return e.fromOverride
                ? e
                : t.fromOverride
                  ? t
                  : e.treatment.isOffTreatment
                    ? t.treatment.isOffTreatment
                      ? e
                      : t
                    : e
            }
          },
          {
            key: '_getExposure',
            value: function(e, t, n, r) {
              var i = t.getRawObject()
              return {
                flag: e.codename,
                type: i.type,
                id: i.id,
                treatment: n.treatment.codename,
                methodCalled: r,
                eligible: n.eligible,
                timeExposed: new Date().toISOString()
              }
            }
          },
          {
            key: 'getTreatment',
            value: function(e, t) {
              var n = new ee('duration__get_treatment', ee.TYPE_DURATION)
              n.start(), (t = t || this.object)
              var r = this._identifyObject(t)
              if (!r.isValid() || e.isUncategorized()) return 'off'
              var i = this._getAllocation(e, r),
                a = this._getAllocation(e, r.getGroup()),
                s = this._resolveAllocations(i, a),
                o = this._getExposure(e, r, s, 'get_treatment')
              return (
                this._saveExposure(o),
                n.stop(),
                this._saveStat(n),
                s.treatment.isGhost
                  ? (e.offTreatment && e.offTreatment.codename) || 'off'
                  : s.treatment.codename
              )
            }
          },
          {
            key: 'getPayload',
            value: function(e, t) {
              var n = new ee('duration__get_payload', ee.TYPE_DURATION)
              n.start(), (t = t || this.object)
              var r = this._identifyObject(t)
              if (!r.isValid() || e.isUncategorized()) return null
              var i = this._getAllocation(e, r),
                a = this._getAllocation(e, r.getGroup()),
                s = this._resolveAllocations(i, a),
                o = this._getExposure(e, r, s, 'get_payload')
              return (
                this._saveExposure(o),
                n.stop(),
                this._saveStat(n),
                s.treatment.isGhost
                  ? (e.offTreatment && e.offTreatment.payload) || null
                  : s.treatment.payload
              )
            }
          },
          {
            key: 'isEligible',
            value: function(e, t) {
              var n = new ee('duration__is_eligible', ee.TYPE_DURATION)
              n.start(), (t = t || this.object)
              var r = this._identifyObject(t)
              if (!r.isValid() || e.isUncategorized()) return !1
              var i = this._getAllocation(e, r),
                a = this._getAllocation(e, r.getGroup()),
                s = this._resolveAllocations(i, a),
                o = this._getExposure(e, r, s, 'is_eligible')
              return (
                this._saveExposure(o), n.stop(), this._saveStat(n), s.eligible
              )
            }
          },
          {
            key: 'isEnabled',
            value: function(e, t) {
              var n = new ee('duration__is_enabled', ee.TYPE_DURATION)
              n.start(), (t = t || this.object)
              var r = this._identifyObject(t)
              if (!r.isValid() || e.isUncategorized()) return !1
              var i = this._getAllocation(e, r),
                a = this._getAllocation(e, r.getGroup()),
                s = this._resolveAllocations(i, a),
                o = this._getExposure(e, r, s, 'is_enabled')
              return (
                this._saveExposure(o),
                n.stop(),
                this._saveStat(n),
                !s.treatment.isOffTreatment
              )
            }
          }
        ]),
        e
      )
    })(),
    ie = function e(t, n) {
      if ((y(this, e), null == t))
        throw 'Cannot have an undefined or null key for a LRUNode'
      if (null == n)
        throw 'Cannot have an undefined or null value for a LRUNode'
      ;(this.key = t), (this.value = n), (this.prev = null), (this.next = null)
    },
    ae = (function() {
      function t(e) {
        y(this, t),
          (this.size = 0),
          (this.limit = 'number' == typeof e ? e : 10),
          (this.map = {}),
          (this.head = null),
          (this.tail = null)
      }
      return (
        w(t, [
          {
            key: 'setHead',
            value: function(e) {
              ;(e.next = this.head),
                (e.prev = null) !== this.head && (this.head.prev = e),
                (this.head = e),
                null === this.tail && (this.tail = e),
                this.size++,
                (this.map[e.key] = e)
            }
          },
          {
            key: 'set',
            value: function(e, t) {
              var n = new ie(e, t)
              this.map[e]
                ? ((this.map[e].value = n.value), this.remove(n.key))
                : this.size >= this.limit &&
                  (delete this.map[this.tail.key],
                  this.size--,
                  (this.tail = this.tail.prev),
                  (this.tail.next = null)),
                this.setHead(n)
            }
          },
          {
            key: 'get',
            value: function(e) {
              if (this.map[e]) {
                var t = this.map[e].value,
                  n = new ie(e, t)
                return this.remove(e), this.setHead(n), t
              }
              return null
            }
          },
          {
            key: 'remove',
            value: function(e) {
              var t = this.map[e]
              null !== t.prev ? (t.prev.next = t.next) : (this.head = t.next),
                null !== t.next ? (t.next.prev = t.prev) : (this.tail = t.prev),
                delete this.map[e],
                this.size--
            }
          },
          {
            key: 'removeAll',
            value: function(e) {
              ;(this.size = 0),
                (this.map = {}),
                (this.head = null),
                (this.tail = null),
                'number' == typeof e && (this.limit = e)
            }
          },
          {
            key: 'forEach',
            value: function(e) {
              for (var t = this.head, n = 0; t; ) e(t, n), n++, (t = t.next)
            }
          }
        ]),
        t
      )
    })(),
    se = (function() {
      function t(e) {
        y(this, t),
          (this.gatingInfo = e),
          (this.gatingInfoMap = this._getGatingInfoMap(this.gatingInfo))
      }
      return (
        w(t, [
          {
            key: '_getGatingInfoMap',
            value: function(e) {
              for (var t = {}, n = e.flags, r = 0; r < n.length; r++) {
                var i = g({}, n[r])
                if (
                  'uncategorized' !== i.flagType &&
                  'archived' !== i.flagStatus
                ) {
                  for (var a = i.overrides, s = {}, o = 0; o < a.length; o++) {
                    var u = a[o]
                    s[''.concat(u.entityType, '_').concat(u.entityId)] = u
                  }
                  i.overrides = s
                  for (
                    var l = i.treatments, c = {}, f = null, h = 0;
                    h < l.length;
                    h++
                  ) {
                    var p = l[h]
                    ;(c[p.treatmentId] = p).isOffTreatment && (f = p)
                  }
                  ;(i.treatments = l),
                    (i.treatmentsMap = c),
                    (i.offTreatment = f),
                    (t[i.codename] = new ne(i))
                } else t[i.codename] = new ne(i)
              }
              return t
            }
          },
          {
            key: 'getIngestionMaxItem',
            value: function() {
              var e = this.gatingInfo.sdkInfo
              return e ? e.SDK_INGESTION_MAX_ITEMS : null
            }
          },
          {
            key: 'getBrowserIngestionMaxItems',
            value: function() {
              var e = this.gatingInfo.sdkInfo
              return e ? e.SDK_BROWSER_INGESTION_MAX_ITEMS : null
            }
          },
          {
            key: 'getIngestionInterval',
            value: function() {
              var e = this.gatingInfo.sdkInfo
              return e ? 1e3 * e.SDK_INGESTION_INTERVAL : null
            }
          },
          {
            key: 'getBrowserIngestionInterval',
            value: function() {
              var e = this.gatingInfo.sdkInfo
              return e ? 1e3 * e.SDK_BROWSER_INGESTION_INTERVAL : null
            }
          },
          {
            key: 'getShouldIngestObjects',
            value: function() {
              var e = this.gatingInfo.sdkInfo
              return e && 'boolean' == typeof e.SDK_SHOULD_INGEST_OBJECTS
                ? e.SDK_SHOULD_INGEST_OBJECTS
                : null
            }
          },
          {
            key: 'getShouldIngestStats',
            value: function() {
              var e = this.gatingInfo.sdkInfo
              return e && 'boolean' == typeof e.SDK_SHOULD_INGEST_STATS
                ? e.SDK_SHOULD_INGEST_STATS
                : null
            }
          },
          {
            key: 'getShouldIngestExposures',
            value: function() {
              var e = this.gatingInfo.sdkInfo
              return e && 'boolean' == typeof e.SDK_SHOULD_INGEST_EXPOSURES
                ? e.SDK_SHOULD_INGEST_EXPOSURES
                : null
            }
          },
          {
            key: 'getShouldIngestFlags',
            value: function() {
              var e = this.gatingInfo.sdkInfo
              return e && 'boolean' == typeof e.SDK_SHOULD_INGEST_FLAGS
                ? e.SDK_SHOULD_INGEST_FLAGS
                : null
            }
          },
          {
            key: 'getFlag',
            value: function(e) {
              return this.gatingInfoMap[e] || new ne(e)
            }
          },
          {
            key: 'getEnv',
            value: function() {
              return this.gatingInfo.env
            }
          },
          {
            key: 'isLocallyConfigured',
            value: function() {
              return null === this.getEnv().envKey
            }
          }
        ]),
        t
      )
    })(),
    oe = ''.concat('https://backup-api.airshiphq.com', '/v2/gating-info'),
    ue = (function(e) {
      function n(e) {
        var t
        return (
          y(this, n),
          ((t = D(this, x(n).call(this))).gatingInfoListener = e),
          t.init(),
          t
        )
      }
      var t, r, i, a, s, o, u, l, c
      return (
        O(n, re),
        w(n, [
          {
            key: 'init',
            value: function() {
              ;(this.ingestionMaxItems = 500),
                (this.ingestionInterval = 3e4),
                (this.ingestionMaxItems = 5),
                (this.ingestionInterval = 15e3),
                (this.objects = []),
                (this.stats = []),
                (this.exposures = []),
                (this.flags = new I()),
                (this.oldFlags = new I()),
                (this.objectLRUCache = new ae(500)),
                (this.firstIngestion = !0),
                (this.shouldIngestObjects = !0),
                (this.shouldIngestStats = !0),
                (this.shouldIngestExposures = !0),
                (this.shouldIngestFlags = !0)
            }
          },
          {
            key: 'restartIngestionWorker',
            value: function() {
              var e = this
              this.ingestionWorker && clearInterval(this.ingestionWorker),
                (this.ingestionWorker = setInterval(function() {
                  e.maybeIngest(!0)
                }, this.ingestionInterval))
            }
          },
          {
            key: 'maybeIngest',
            value: ((c = d(
              f.mark(function e() {
                var t,
                  n,
                  r,
                  i,
                  a,
                  s,
                  o = this,
                  u = arguments
                return f.wrap(
                  function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (
                            ((t = 0 < u.length && void 0 !== u[0] && u[0]),
                            this.shouldIngestObjects || (this.objects = []),
                            this.shouldIngestStats || (this.stats = []),
                            this.shouldIngestExposures || (this.exposures = []),
                            this.shouldIngestFlags || (this.flags = new I()),
                            (n =
                              t ||
                              this.objects.length >= this.ingestionMaxItems ||
                              this.stats.length >= this.ingestionMaxItems ||
                              this.exposures.length >= this.ingestionMaxItems ||
                              0 < this.flags.size),
                            this.firstIngestion &&
                              ((n = n || 0 < this.objects.length),
                              (this.firstIngestion = !n)),
                            0 === this.objects.length &&
                              0 === this.stats.length &&
                              0 === this.exposures.length &&
                              0 === this.flags.size &&
                              (n = !1),
                            n)
                          )
                            return (
                              (r = this.objects),
                              (i = this.stats),
                              (a = this.exposures),
                              (s = b(this.flags)).forEach(function(e) {
                                o.oldFlags.add(e)
                              }),
                              (this.objects = []),
                              (this.stats = []),
                              (this.exposures = []),
                              (this.flags = new I()),
                              (e.next = 20),
                              this.postContent(
                                this.primaryServerUrl +
                                  '/v2/identify/' +
                                  this.envKey,
                                p({
                                  objects: r,
                                  stats: i
                                    .map(function(e) {
                                      return e.getStatsObj()
                                    })
                                    .filter(function(e) {
                                      return null !== e
                                    }),
                                  exposures: a,
                                  flags: s,
                                  sdkInfo: {name: 'js', version: '2.0.4'}
                                })
                              ).catch(function(e) {
                                P(e)
                              })
                            )
                          e.next = 20
                          break
                        case 20:
                        case 'end':
                          return e.stop()
                      }
                  },
                  e,
                  this
                )
              })
            )),
            function() {
              return c.apply(this, arguments)
            })
          },
          {
            key: '_identifyObject',
            value: function(e) {
              var t = re.prototype._identifyObject.call(this, e)
              if (!t.isValid()) return t
              var n = t.getId(),
                r = t.getHash(),
                i = this.objectLRUCache.get(n)
              return (
                (null !== i && r === i) || this.objects.push(t.getRawObject()),
                this.objectLRUCache.set(n, r),
                this.maybeIngest(),
                t
              )
            }
          },
          {
            key: '_compactStats',
            value: function() {
              this.stats = ee.compactStats(this.stats)
            }
          },
          {
            key: '_saveStat',
            value: function(e) {
              this.stats.push(e),
                this.stats.length >= this.ingestionMaxItems &&
                  this._compactStats(),
                this.maybeIngest()
            }
          },
          {
            key: '_saveExposure',
            value: function(e) {
              this.exposures.push(e), this.maybeIngest()
            }
          },
          {
            key: 'publish',
            value: ((l = d(
              f.mark(function e(t) {
                var n = this
                return f.wrap(
                  function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (m(t)) {
                            e.next = 3
                            break
                          }
                          return (
                            P(
                              'The "publish" method takes an array of objects (aka entities).'
                            ),
                            e.abrupt('return')
                          )
                        case 3:
                          return (
                            t.forEach(function(e) {
                              n._identifyObject(e)
                            }),
                            (e.next = 6),
                            this.maybeIngest(!0)
                          )
                        case 6:
                        case 'end':
                          return e.stop()
                      }
                  },
                  e,
                  this
                )
              })
            )),
            function(e) {
              return l.apply(this, arguments)
            })
          },
          {
            key: 'getContent',
            value: ((u = d(
              f.mark(function e(t) {
                var n, r
                return f.wrap(
                  function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), fetch(t)
                        case 2:
                          return (n = e.sent), (e.next = 5), n.json()
                        case 5:
                          return (r = e.sent), e.abrupt('return', r)
                        case 7:
                        case 'end':
                          return e.stop()
                      }
                  },
                  e,
                  this
                )
              })
            )),
            function(e) {
              return u.apply(this, arguments)
            })
          },
          {
            key: 'postContent',
            value: ((o = d(
              f.mark(function e(t, n) {
                var r,
                  i,
                  a = arguments
                return f.wrap(
                  function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (r =
                              2 < a.length && void 0 !== a[2]
                                ? a[2]
                                : 'application/json'),
                            (i = {
                              method: 'POST',
                              headers: {
                                'Content-Type': r,
                                'Content-Length': Buffer.byteLength(n)
                              },
                              redirect: 'follow',
                              body: p(n)
                            }),
                            (e.next = 4),
                            fetch(t, i).catch(function(e) {
                              reject('Failed to post to url')
                            })
                          )
                        case 4:
                        case 'end':
                          return e.stop()
                      }
                  },
                  e,
                  this
                )
              })
            )),
            function(e, t) {
              return o.apply(this, arguments)
            })
          },
          {
            key: '_getGatingInfo',
            value: ((s = d(
              f.mark(function e() {
                var t
                return f.wrap(
                  function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (e.next = 2),
                            this.getContent(
                              ''
                                .concat(this.primaryServerUrl)
                                .concat('/v2/gating-info', '/')
                                .concat(this.envKey, '?casing=camel')
                            )
                          )
                        case 2:
                          return (t = e.sent), e.abrupt('return', t)
                        case 4:
                        case 'end':
                          return e.stop()
                      }
                  },
                  e,
                  this
                )
              })
            )),
            function() {
              return s.apply(this, arguments)
            })
          },
          {
            key: '_getBackupGatingInfo',
            value: ((a = d(
              f.mark(function e() {
                var t
                return f.wrap(
                  function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (e.next = 2),
                            this.getContent(
                              ''.concat(oe, '/').concat(this.envKey, '-camel')
                            )
                          )
                        case 2:
                          return (t = e.sent), e.abrupt('return', t)
                        case 4:
                        case 'end':
                          return e.stop()
                      }
                  },
                  e,
                  this
                )
              })
            )),
            function() {
              return a.apply(this, arguments)
            })
          },
          {
            key: 'updateSDK',
            value: function() {
              this.router.getIngestionMaxItem()
              var e = this.router.getBrowserIngestionMaxItems(),
                t = (this.router.getIngestionInterval(),
                this.router.getBrowserIngestionInterval()),
                n = this.router.getShouldIngestObjects(),
                r = this.router.getShouldIngestStats(),
                i = this.router.getShouldIngestExposures(),
                a = this.router.getShouldIngestFlags()
              'number' == typeof e &&
                0 < e &&
                ((this.ingestionMaxItems = e), this.restartIngestionWorker()),
                'number' == typeof t &&
                  0 < t &&
                  t != this.ingestionInterval &&
                  ((this.ingestionInterval = t), this.restartIngestionWorker()),
                'boolean' == typeof n && (this.shouldIngestObjects = n),
                'boolean' == typeof r && (this.shouldIngestStats = r),
                'boolean' == typeof i && (this.shouldIngestExposures = i),
                'boolean' == typeof a && (this.shouldIngestFlags = a)
            }
          },
          {
            key: 'updateGatingInfo',
            value: ((i = d(
              f.mark(function e(t, n) {
                var r, i, a
                return f.wrap(
                  function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            (e.prev = 0),
                            (r = new ee(t, ee.TYPE_DURATION)).start(),
                            (e.next = 5),
                            n()
                          )
                        case 5:
                          ;(i = e.sent),
                            (a = i),
                            (this.router = new se(a)),
                            this.updateSDK(),
                            this.gatingInfoListener &&
                              this.gatingInfoListener(a),
                            r.stop(),
                            this._saveStat(r),
                            (e.next = 19)
                          break
                        case 14:
                          return (
                            (e.prev = 14),
                            (e.t0 = e.catch(0)),
                            console.log(e.t0),
                            P(e.t0),
                            e.abrupt('return', !1)
                          )
                        case 19:
                          return e.abrupt('return', !0)
                        case 20:
                        case 'end':
                          return e.stop()
                      }
                  },
                  e,
                  this,
                  [[0, 14]]
                )
              })
            )),
            function(e, t) {
              return i.apply(this, arguments)
            })
          },
          {
            key: 'configure',
            value: ((r = d(
              f.mark(function e(t) {
                var n,
                  r,
                  i,
                  a = arguments
                return f.wrap(
                  function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (
                            ((n = !(1 < a.length && void 0 !== a[1]) || a[1]),
                            (r =
                              2 < a.length && void 0 !== a[2]
                                ? a[2]
                                : 'airshiphq.com'),
                            (i = /^[a-z0-9]{16}$/),
                            t.match(i))
                          ) {
                            e.next = 5
                            break
                          }
                          throw 'options["envKey"] should be a string of lowercase characters and digits. Double check on the Airship web app.'
                        case 5:
                          return (
                            (this.envKey = t),
                            (this.subscribeToUpdates = n),
                            (this.primaryServerUrl = 'https://api.'.concat(r)),
                            (this.sseServerUrl = 'https://sse.'.concat(r)),
                            this.init(),
                            (this.failed = !1),
                            (e.next = 13),
                            this.updateGatingInfo(
                              'duration__gating_info',
                              this._getGatingInfo.bind(this)
                            )
                          )
                        case 13:
                          if (e.sent) {
                            e.next = 17
                            break
                          }
                          return (
                            (e.next = 16),
                            this.updateGatingInfo(
                              'duration__cloudfront_gating_info',
                              this._getBackupGatingInfo.bind(this)
                            )
                          )
                        case 16:
                          this.failed = !e.sent
                        case 17:
                          if (this.failed)
                            throw 'Failed to retrieve initial gating information'
                          e.next = 19
                          break
                        case 19:
                          n && (this._subscribeToUpdates(), this._policeSSE())
                        case 20:
                        case 'end':
                          return e.stop()
                      }
                  },
                  e,
                  this
                )
              })
            )),
            function(e) {
              return r.apply(this, arguments)
            })
          },
          {
            key: 'shutdown',
            value: ((t = d(
              f.mark(function e() {
                return f.wrap(
                  function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (
                            this.ingestionWorker &&
                              clearInterval(this.ingestionWorker),
                            this._unpoliceSSE(),
                            this._unsubscribeFromUpdates(),
                            (e.next = 5),
                            this.maybeIngest(!0)
                          )
                        case 5:
                        case 'end':
                          return e.stop()
                      }
                  },
                  e,
                  this
                )
              })
            )),
            function() {
              return t.apply(this, arguments)
            })
          },
          {
            key: 'flag',
            value: function(e) {
              var t = re.prototype.flag.call(this, e)
              return (
                t.isWild() &&
                  (this.oldFlags.has(e) ||
                    (this.flags.add(e), this.maybeIngest())),
                t
              )
            }
          },
          {
            key: '_policeSSE',
            value: function() {
              var e = this
              this._unpoliceSSE(),
                (this.policeSSEInterval = setInterval(function() {
                  30 < (h() - (e.lastSSEConnectTimestamp || 0)) / 1e3 &&
                    (P(
                      'Did not receive a keepalive for more than 30 seconds. Reconnecting.'
                    ),
                    e._subscribeToUpdates())
                }, 5e3)),
                (this.pollGatingInfoInterval = setInterval(function() {
                  60 < (h() - (e.lastSSEConnectTimestamp || 0)) / 1e3 &&
                    (P(
                      'Did not receive a keepalive for more than 30 seconds. Polling gating info.'
                    ),
                    e
                      .updateGatingInfo(
                        'duration__cloudfront_gating_info',
                        e._getBackupGatingInfo.bind(e)
                      )
                      .then(
                        function() {
                          return P('Polled gating info from CloudFront')
                        },
                        function() {
                          return P('Failed polling gating info from CloudFront')
                        }
                      ))
                }, 6e4))
            }
          },
          {
            key: '_unpoliceSSE',
            value: function() {
              this.policeSSEInterval &&
                (clearInterval(this.policeSSEInterval),
                delete this.policeSSEInterval,
                this.lastSSEConnectTimestamp &&
                  delete this.lastSSEConnectTimestamp),
                this.pollGatingInfoInterval &&
                  (clearInterval(this.pollGatingInfoInterval),
                  delete this.pollGatingInfoInterval)
            }
          },
          {
            key: '_subscribeToUpdates',
            value: function() {
              var n = this
              this._unsubscribeFromUpdates(),
                (this.eventSource = new v(
                  ''
                    .concat(this.sseServerUrl)
                    .concat('/v2/sse-events', '?envkey=')
                    .concat(this.envKey, '&casing=camel')
                )),
                this.eventSource.addEventListener('gatingInfoUpdate', function(
                  e
                ) {
                  var t = JSON.parse(e.data)
                  ;(n.router = new se(t)),
                    n.updateSDK(),
                    n.gatingInfoListener && n.gatingInfoListener(t),
                    (n.lastSSEConnectTimestamp = h())
                }),
                this.eventSource.addEventListener('keepalive', function() {
                  n.lastSSEConnectTimestamp = h()
                })
            }
          },
          {
            key: '_unsubscribeFromUpdates',
            value: function() {
              this.eventSource &&
                (this.eventSource.close(), delete this.eventSource)
            }
          }
        ]),
        n
      )
    })(),
    le = (S((te = {}), A, new I([M, F, z, q])),
    S(te, 'int', new I([M, F, z, q, V, W, B, H])),
    S(te, L, new I([M, F, z, q, V, W, B, H])),
    S(te, C, new I([M, F])),
    S(te, K, new I([M, F, z, q, Y, $, J, X])),
    S(te, R, new I([M, F, z, q, Y, $, J, X])),
    te),
    ce = function(v) {
      for (
        var d = [],
          y = u(v),
          e = function(e) {
            var t = y[e],
              n = v[t],
              r = {
                flagType: 'basic',
                hashKey: t,
                isPaused: !(void 0 === n.active || n.active),
                isWebAccessible: !0,
                codename: t,
                flagStatus: 'operational'
              },
              i = n.whitelist || [],
              a = n.blacklist || [],
              s = new I(a),
              o = i.filter(function(e) {
                return !s.has(e)
              })
            if (
              ((r.treatments = [
                {
                  treatmentId: 'off-treatment',
                  codename: 'off',
                  isControl: !1,
                  isOffTreatment: !0
                },
                {
                  treatmentId: 'on-treatment',
                  codename: 'on',
                  isControl: !1,
                  isOffTreatment: !1
                }
              ]),
              (r.overrides = []),
              (r.overrides = r.overrides.concat(
                o.map(function(e) {
                  return {
                    treatmentId: 'on-treatment',
                    entityType: 'User',
                    entityId: e.toString()
                  }
                })
              )),
              (r.overrides = r.overrides.concat(
                a.map(function(e) {
                  return {
                    treatmentId: 'off-treatment',
                    entityType: 'User',
                    entityId: e.toString()
                  }
                })
              )),
              (r.splits = [{treatmentId: 'on-treatment', percentage: 1}]),
              n.population)
            ) {
              for (
                var u = n.population || [], l = [], c = 0;
                c < u.length;
                c++
              ) {
                var f = u[c],
                  h = void 0
                if (m(f.value)) {
                  var p = new I(
                    f.value.map(function(e) {
                      return Q.categorizeValueType(e)
                    })
                  )
                  if (1 != p.size)
                    return (
                      P(
                        "Population's filter criteria each should have a singular value type. In other words, do not mix strings with numbers in the same array, for example."
                      ),
                      {v: null}
                    )
                  h = b(p)[0]
                } else h = Q.categorizeValueType(f.value)
                var g = {
                  attributeName: f.attribute,
                  attributeType: h,
                  operator: f.operator,
                  value: m(f.value) ? null : f.value,
                  valueList: m(f.value) ? f.value : null
                }
                if (!le[h].has(f.operator))
                  return (
                    P(
                      "Population's filter operator `"
                        .concat(
                          f.operator,
                          '` is not allowed for filter type `'
                        )
                        .concat(h, '`')
                    ),
                    {v: null}
                  )
                if (g.valueList) {
                  if (g.operator !== z && g.operator !== q)
                    return (
                      P(
                        "Population's filter operator must be `in` or `not_in` if the value is an array."
                      ),
                      {v: null}
                    )
                } else if (g.operator === z && g.operator === q)
                  return (
                    P(
                      "Population's filter operator must not be `in` or `not_in` if the value is a number, boolean or string."
                    ),
                    {v: null}
                  )
                l.push(g)
              }
              r.populations = [
                {
                  hashKey: 'population-1',
                  entityType: 'User',
                  percentage: n.sample || 0,
                  rules: l,
                  universes: []
                }
              ]
            } else
              r.populations = [
                {
                  hashKey: 'population-1',
                  entityType: 'User',
                  percentage: n.sample || 0,
                  rules: [],
                  universes: []
                }
              ]
            d.push(r)
          },
          t = 0;
        t < y.length;
        t++
      ) {
        var n = e(t)
        if ('object' === l(n)) return n.v
      }
      return {flags: d, env: {hashKey: 'env-1', envKey: null}}
    },
    fe = (function(e) {
      function t() {
        return y(this, t), D(this, x(t).apply(this, arguments))
      }
      var n
      return (
        O(t, re),
        w(t, [
          {
            key: 'configure',
            value: ((n = d(
              f.mark(function e(t) {
                var n
                return f.wrap(
                  function(e) {
                    for (;;)
                      switch ((e.prev = e.next)) {
                        case 0:
                          if (null === (n = ce(t)))
                            throw 'Failed to transform flagConfig into initial gating information'
                          e.next = 3
                          break
                        case 3:
                          this.router = new se(n)
                        case 4:
                        case 'end':
                          return e.stop()
                      }
                  },
                  e,
                  this
                )
              })
            )),
            function(e) {
              return n.apply(this, arguments)
            })
          }
        ]),
        t
      )
    })(),
    he = new fe()
  he.configure({})
  var pe = (function() {
      function s() {
        y(this, s), (this.gatingInfoListeners = [])
      }
      var e, t, n
      return (
        w(
          s,
          [
            {
              key: 'publish',
              value: ((n = d(
                f.mark(function e(t) {
                  return f.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (this.environment)
                              return (e.next = 3), this.environment.publish(t)
                            e.next = 5
                            break
                          case 3:
                            e.next = 6
                            break
                          case 5:
                            throw 'Airship must be configured first before `publish` can be called'
                          case 6:
                          case 'end':
                            return e.stop()
                        }
                    },
                    e,
                    this
                  )
                })
              )),
              function(e) {
                return n.apply(this, arguments)
              })
            },
            {
              key: 'configure',
              value: ((t = d(
                f.mark(function e(t) {
                  var n, r, i, a
                  return f.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (s._isDict(t)) {
                              e.next = 2
                              break
                            }
                            throw '<options> must be dictionary'
                          case 2:
                            if (((n = t.envKey), (r = t.flagConfig), n || r)) {
                              e.next = 6
                              break
                            }
                            throw '<options> must contain envKey corresponding to an environment key or a flagConfig dictionary to configure locally'
                          case 6:
                            if (((i = !1 !== t.subscribeToUpdates), !n)) {
                              e.next = 23
                              break
                            }
                            if (
                              this.environment &&
                              this.environment.envKey === n &&
                              this.environment.subscribeToUpdates === i &&
                              this.environment.environmentPromise &&
                              !this.environment.failed
                            )
                              return (
                                (e.next = 11),
                                this.environment.environmentPromise
                              )
                            e.next = 13
                            break
                          case 11:
                            e.next = 21
                            break
                          case 13:
                            if (this.environment)
                              return (e.next = 16), this.environment.shutdown()
                            e.next = 16
                            break
                          case 16:
                            return (
                              (this.environment = new ue(
                                this.handleGatingInfoUpdate.bind(this)
                              )),
                              (a = this.environment.configure(
                                n,
                                t.subscribeToUpdates,
                                t.apiDomain
                              )),
                              (this.environment.environmentPromise = a),
                              (e.next = 21),
                              a
                            )
                          case 21:
                            e.next = 29
                            break
                          case 23:
                            if (this.environment)
                              return (e.next = 26), this.environment.shutdown()
                            e.next = 26
                            break
                          case 26:
                            return (
                              (this.environment = new fe()),
                              (e.next = 29),
                              this.environment.configure(r)
                            )
                          case 29:
                          case 'end':
                            return e.stop()
                        }
                    },
                    e,
                    this
                  )
                })
              )),
              function(e) {
                return t.apply(this, arguments)
              })
            },
            {
              key: 'shutdown',
              value: ((e = d(
                f.mark(function e() {
                  return f.wrap(
                    function(e) {
                      for (;;)
                        switch ((e.prev = e.next)) {
                          case 0:
                            if (this.environment)
                              return (e.next = 3), this.environment.shutdown()
                            e.next = 6
                            break
                          case 3:
                            delete this.environment, (e.next = 7)
                            break
                          case 6:
                            throw 'Airship must be configured first before `shutdown` can be called'
                          case 7:
                          case 'end':
                            return e.stop()
                        }
                    },
                    e,
                    this
                  )
                })
              )),
              function() {
                return e.apply(this, arguments)
              })
            },
            {
              key: 'flag',
              value: function(e) {
                return (this.environment || he).flag(e)
              }
            },
            {
              key: 'setErrorListener',
              value: function(e) {
                P = e
              }
            },
            {
              key: 'handleGatingInfoUpdate',
              value: function(t) {
                this.gatingInfoListeners.forEach(function(e) {
                  return e(t)
                })
              }
            },
            {
              key: 'addGatingInfoListener',
              value: function(e) {
                this.gatingInfoListeners.push(e)
              }
            },
            {
              key: 'removeGatingInfoListener',
              value: function(t) {
                this.gatingInfoListeners = this.gatingInfoListeners.filter(
                  function(e) {
                    return e !== t
                  }
                )
              }
            },
            {
              key: 'identify',
              value: function(e) {
                if (!this.environment)
                  throw 'Airship must be configured first before `identify` can be called'
                this.environment.identify(e),
                  this.environment._identifyObject(e),
                  this.environment.maybeIngest(!0)
              }
            }
          ],
          [
            {
              key: '_isDict',
              value: function(e) {
                return null != e && e.constructor === Object
              }
            }
          ]
        ),
        s
      )
    })(),
    ge = new pe()
  return g(ge, {FlaggerBase: pe}), ge
})
//# sourceMappingURL=flagger.js.map
