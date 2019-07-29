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
    input: 'src/index-umd.js',
    output: {
      file: 'flagger.js',
      name: 'Flagger',
      format: 'umd',
      exports: 'default',
      sourcemap: true
    },
    plugins: [
      // resolve({
      //   browser: true
      // }),
      // commonjs(),
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
      // globals(),
      // builtins(),
      uglify({compress: {reduce_funcs: false}})
    ]
  }
]
