import { JSDOM } from 'jsdom'

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .reduce(
      (result, prop) => ({
        ...result,
        [prop]: Object.getOwnPropertyDescriptor(src, prop)
      }),
      {}
    )
  Object.defineProperties(target, props)
}

global.window = window
global.window.resizeTo = (width, height) => {
  global.window.innerWidth = width || global.window.innerWidth
  global.window.innerHeight = height || global.window.innerHeight
  global.window.dispatchEvent(new Event('resize')) // eslint-disable-line no-undef
}
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}
copyProps(window, global)
