/**
Rollup configuration for Flagger

Following targets:

Node / Server Side (CommonJS):


**/
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import {uglify} from 'rollup-plugin-uglify'
import {terser} from 'rollup-plugin-terser'
import {eslint} from 'rollup-plugin-eslint'

import path from 'path'

// Source directory (input directory)
const SRC_DIR = path.resolve(__dirname, 'lib')

// Build directory (output directory)
const BUILD_DIR = path.resolve(__dirname, 'dist')

export default [
  // ESM Target for Nodejs
  {
    input: 'src/index.js',
    output: {
      file: path.resolve(BUILD_DIR, 'flagger.esm.js'),
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      eslint({}),
      babel({
        envName: 'node'
      }),
      json(),
      replace({
        __SDK_NAME__: 'nodejs'
      })
    ]
  },

  // CJS Target for Nodejs
  {
    input: 'src/index.js',
    output: {
      file: path.resolve(BUILD_DIR, 'flagger.cjs.js'),
      format: 'cjs',
      exports: 'default',
      sourcemap: true
    },
    plugins: [
      eslint({}),
      babel({
        envName: 'node'
      }),
      json(),
      replace({
        __SDK_NAME__: 'nodejs'
      })
    ]
  },

  // UMD Target for Browsers (replaces the CJS / main entrypoint)
  {
    input: 'src/index.js',
    output: {
      file: path.resolve(BUILD_DIR, 'flagger.umd.browser.js'),
      name: 'Flagger',
      format: 'umd',
      exports: 'default',
      sourcemap: true
    },
    plugins: [
      eslint({}),
      resolve({
        browser: true
      }),
      commonjs(),
      babel({
        envName: 'browser',
        exclude: [
          'node_modules/@babel/runtime-corejs2/core-js/**',
          'node_modules/rollup-plugin-commonjs/**',
          'node_modules/core-js/**'
        ]
      }),
      json(),
      replace({
        __SDK_NAME__: 'js'
      }),
      globals(),
      builtins()
      // terser({compress: {reduce_funcs: false}})
    ]
  },

  // ESM Target for Browsers
  {
    input: 'src/index.js',
    output: {
      file: path.resolve(BUILD_DIR, 'flagger.esm.browser.js'),
      format: 'esm',
      exports: 'default',
      sourcemap: true
    },
    plugins: [
      eslint({}),
      resolve({
        browser: true
      }),
      commonjs(),
      babel({
        envName: 'browser',
        exclude: [
          'node_modules/@babel/runtime-corejs2/core-js/**',
          'node_modules/rollup-plugin-commonjs/**',
          'node_modules/core-js/**'
        ]
      }),
      json(),
      replace({
        __SDK_NAME__: 'js'
      }),
      globals(),
      builtins()
      // terser({compress: {reduce_funcs: false}})
    ]
  },

  // CJS target for React components
  {
    input: 'src/react.js',
    output: {
      file: path.resolve(BUILD_DIR, 'flagger.react.cjs.browser.js'),
      format: 'cjs',
      sourcemap: true
    },
    external: ['react'],
    plugins: [
      babel({
        envName: 'node'
      }),
      json(),
      replace({
        __SDK_NAME__: 'react-ssr'
      })
    ]
  },

  // ESM Target for React components
  {
    input: 'src/react.js',
    output: {
      file: path.resolve(BUILD_DIR, 'flagger.react.esm.browser.js'),
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      eslint({}),
      resolve({
        browser: true
      }),
      commonjs({
        exclude: 'src/**'
      }),
      babel({
        envName: 'browser',
        exclude: [
          'node_modules/@babel/runtime-corejs2/core-js/**',
          'node_modules/rollup-plugin-commonjs/**',
          'node_modules/core-js/**'
        ]
      }),
      json(),
      replace({
        __SDK_NAME__: 'react'
      }),
      globals(),
      builtins()
      // terser({compress: {reduce_funcs: false}})
    ]
  }
]

/*

01 esm.js => Node + ESM

02 cjs.js => Node + CJS

03 flagger.js => Browser + UMD

04 react.js => React-SSR + cjs

05 flagger-react.js => React-Browser + umd

06 compat.js => Node + cjs

07 compat-browser.js => Browser + umd

*/

// export default [
//   {
//     input: 'src/index.js',
//     output: {
//       file: 'esm.js',
//       format: 'esm',
//       sourcemap: true
//     },
//     plugins: [
//       babel({
//         envName: 'node'
//       }),
//       json(),
//       replace({
//         __SDK_NAME__: 'nodejs'
//       })
//     ]
//   },
//   {
//     input: 'src/index-umd.js',
//     output: {
//       file: 'cjs.js',
//       format: 'cjs',
//       exports: 'default',
//       sourcemap: true
//     },
//     plugins: [
//       babel({
//         envName: 'node'
//       }),
//       json(),
//       replace({
//         __SDK_NAME__: 'nodejs'
//       })
//     ]
//   },
//   {
//     input: 'src/index-umd.js',
//     output: {
//       file: 'flagger.js',
//       name: 'Flagger',
//       format: 'umd',
//       exports: 'default',
//       sourcemap: true
//     },
//     plugins: [
//       resolve({
//         browser: true
//       }),
//       commonjs(),
//       babel({
//         envName: 'browser',
//         exclude: [
//           'node_modules/@babel/runtime-corejs2/core-js/**',
//           'node_modules/rollup-plugin-commonjs/**',
//           'node_modules/core-js/**'
//         ]
//       }),
//       json(),
//       replace({
//         __SDK_NAME__: 'js'
//       }),
//       globals(),
//       builtins(),
//       uglify({compress: {reduce_funcs: false}})
//     ]
//   },
//   {
//     input: 'src/react.js',
//     output: {
//       file: 'react.js',
//       format: 'cjs',
//       sourcemap: true
//     },
//     external: ['react'],
//     plugins: [
//       babel({
//         envName: 'node'
//       }),
//       json(),
//       replace({
//         __SDK_NAME__: 'react-ssr'
//       })
//     ]
//   },
//   {
//     input: 'src/react.js',
//     output: {
//       file: 'flagger-react.js',
//       name: 'FlaggerReact',
//       format: 'umd',
//       sourcemap: true
//     },
//     external: ['react'],
//     plugins: [
//       resolve({
//         browser: true
//       }),
//       commonjs({
//         exclude: 'src/**'
//       }),
//       babel({
//         envName: 'browser',
//         exclude: [
//           'node_modules/@babel/runtime-corejs2/core-js/**',
//           'node_modules/rollup-plugin-commonjs/**',
//           'node_modules/core-js/**'
//         ]
//       }),
//       json(),
//       replace({
//         __SDK_NAME__: 'react'
//       }),
//       globals(),
//       builtins(),
//       uglify({compress: {reduce_funcs: false}})
//     ]
//   },

//   // v1 compat
//   {
//     input: 'src/compat.js',
//     output: {
//       file: 'compat.js',
//       format: 'cjs',
//       sourcemap: true
//     },
//     plugins: [
//       babel({
//         envName: 'node'
//       }),
//       json(),
//       replace({
//         __SDK_NAME__: 'nodejs-v1'
//       })
//     ]
//   },
//   {
//     input: 'src/compat.js',
//     output: {
//       file: 'compat-browser.js',
//       name: 'Airship',
//       format: 'umd',
//       sourcemap: true
//     },
//     plugins: [
//       resolve({
//         browser: true
//       }),
//       commonjs({
//         exclude: 'src/**'
//       }),
//       babel({
//         envName: 'browser',
//         exclude: [
//           'node_modules/@babel/runtime-corejs2/core-js/**',
//           'node_modules/rollup-plugin-commonjs/**',
//           'node_modules/core-js/**'
//         ]
//       }),
//       json(),
//       replace({
//         __SDK_NAME__: 'js-v1'
//       }),
//       globals(),
//       builtins(),
//       uglify({compress: {reduce_funcs: false}})
//     ]
//   }
// ]
