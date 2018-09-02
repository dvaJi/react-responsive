import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import filesize from 'rollup-plugin-filesize'

const name = 'react-responsive'
const globals = {
  react: 'React',
  'prop-types': 'PropTypes'
}

export default {
  input: 'src/index.js',
  output: [
    {
      name,
      globals,
      format: 'umd',
      file: 'index.js'
    },
    {
      name,
      globals,
      format: 'es',
      file: 'index.es.js'
    }
  ],
  external: ['prop-types', 'react'],
  plugins: [
    resolve({
      jsnext: true,
      main: true
    }),
    babel({
      babelrc: false,
      presets: [
        [
          'env',
          {
            debug: true,
            targets: { browsers: ['> 1%', 'last 2 versions', 'ie > 9'] },
            modules: false
          }
        ],
        'stage-1',
        'react'
      ],
      plugins: ['external-helpers'],
      exclude: 'node_modules/**'
    }),
    commonjs(),
    filesize()
  ]
}
