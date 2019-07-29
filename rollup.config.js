// rollup.config.js
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import {uglify} from 'rollup-plugin-uglify'

export default [
  {
    input: 'src/index.js',
    output: {
      file: 'esm.js',
      format: 'esm',
      sourcemap: true
    },
    plugins: [
      babel({
        envName: 'node'
      }),
      json(),
      replace({
        __SDK_NAME__: 'nodejs'
      })
    ]
  },
  {
    input: 'src/index-umd.js',
    output: {
      file: 'cjs.js',
      format: 'cjs',
      exports: 'default',
      sourcemap: true
    },
    plugins: [
      babel({
        envName: 'node'
      }),
      json(),
      replace({
        __SDK_NAME__: 'nodejs'
      })
    ]
  },
  {
    input: 'src/index-umd.js',
    output: {
      file: 'flagger.js',
      name: 'Flagger',
      format: 'umd',
      exports: 'default',
      sourcemap: true
    },
    plugins: [
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
      builtins(),
      uglify({compress: {reduce_funcs: false}})
    ]
  },
  {
    input: 'src/react.js',
    output: {
      file: 'react.js',
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
  {
    input: 'src/react.js',
    output: {
      file: 'flagger-react.js',
      name: 'FlaggerReact',
      format: 'umd',
      sourcemap: true
    },
    external: ['react'],
    plugins: [
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
      builtins(),
      uglify({compress: {reduce_funcs: false}})
    ]
  },

  // v1 compat
  {
    input: 'src/compat.js',
    output: {
      file: 'compat.js',
      format: 'cjs',
      sourcemap: true
    },
    plugins: [
      babel({
        envName: 'node'
      }),
      json(),
      replace({
        __SDK_NAME__: 'nodejs-v1'
      })
    ]
  },
  {
    input: 'src/compat.js',
    output: {
      file: 'compat-browser.js',
      name: 'Airship',
      format: 'umd',
      sourcemap: true
    },
    plugins: [
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
        __SDK_NAME__: 'js-v1'
      }),
      globals(),
      builtins(),
      uglify({compress: {reduce_funcs: false}})
    ]
  }
]
