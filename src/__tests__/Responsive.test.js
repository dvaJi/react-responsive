import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { ResponsiveProvider, ResponsiveConsumer } from '../index'

Enzyme.configure({ adapter: new Adapter() })

beforeEach(() => {
  jest.resetModules()
  global.window.resizeTo(1024)
})

it('should render without throwing an error', () => {
  const wrapper = shallow(
    <ResponsiveProvider>
      <div>
        <ResponsiveConsumer>
          {status => (
            <div>
              {status.desktop && <p>This only shows in Desktop</p>}
              <button size={status.mobile ? 'small' : 'large'}>Click me</button>
            </div>
          )}
        </ResponsiveConsumer>
      </div>
    </ResponsiveProvider>
  )
  expect(wrapper).toBeTruthy()
  wrapper.unmount()
})

it('should receive custom ranges without throwing an error', () => {
  const sizes = {
    small: [-Infinity, 500],
    medium: [501, 1000],
    large: [1001, +Infinity]
  }
  const wrapper = mount(
    <ResponsiveProvider sizes={sizes}>
      <div>
        <ResponsiveConsumer>
          {status => (
            <div>
              {status.large && <p>This only shows in Large size</p>}
              <button size={status.small ? 'small' : 'large'}>Click me</button>
            </div>
          )}
        </ResponsiveConsumer>
      </div>
    </ResponsiveProvider>
  )
  expect(wrapper).toBeTruthy()
  wrapper.unmount()
})

it('should render the text according to the window size without throwing an error', () => {
  const wrapper = mount(
    <ResponsiveProvider>
      <div>
        <ResponsiveConsumer>
          {status => (
            <div>
              {status.mobile && <p id="is-mobile">This only shows in Mobile</p>}
              {status.tablet && <p id="is-tablet">This only shows in Tablet</p>}
              {status.desktop && (
                <p id="is-desktop">This only shows in Desktop</p>
              )}
            </div>
          )}
        </ResponsiveConsumer>
      </div>
    </ResponsiveProvider>
  )
  expect(wrapper).toBeTruthy()
  expect(wrapper.find('#is-desktop').render()[0].children[0].data).toEqual(
    'This only shows in Desktop'
  )

  global.window.resizeTo(798)
  wrapper.update()
  expect(wrapper.find('#is-tablet').render()[0].children[0].data).toEqual(
    'This only shows in Tablet'
  )

  global.window.resizeTo(765)
  wrapper.update()
  expect(wrapper.find('#is-mobile').render()[0].children[0].data).toEqual(
    'This only shows in Mobile'
  )

  wrapper.unmount()
})

it('should render the text according to the window size with custom ranges', () => {
  const sizes = {
    small: [-Infinity, 500],
    medium: [501, 1000],
    large: [1001, +Infinity]
  }

  const wrapper = mount(
    <ResponsiveProvider sizes={sizes}>
      <div>
        <ResponsiveConsumer>
          {status => (
            <div>
              {status.small && <p id="is-small">Small</p>}
              {status.medium && <p id="is-medium">Medium</p>}
              {status.large && <p id="is-large">Large</p>}
            </div>
          )}
        </ResponsiveConsumer>
      </div>
    </ResponsiveProvider>
  )

  expect(wrapper).toBeTruthy()
  expect(wrapper.find('#is-large').render()[0].children[0].data).toEqual(
    'Large'
  )

  global.window.resizeTo(798)
  wrapper.update()
  expect(wrapper.find('#is-medium').render()[0].children[0].data).toEqual(
    'Medium'
  )

  global.window.resizeTo(480)
  wrapper.update()
  expect(wrapper.find('#is-small').render()[0].children[0].data).toEqual(
    'Small'
  )

  wrapper.unmount()
})
