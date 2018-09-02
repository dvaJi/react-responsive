# React Responsive

[![Build Status](https://travis-ci.org/dvaJi/react-responsive.svg?branch=master)](https://travis-ci.org/dvaJi/react-responsive) [![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

A simple React library to react to responsive events using the new context api.

### Example

Include the provider for giving the context

```jsx
import { ResponsiveProvider } from 'react-responsive'

ReactDOM.render(
  <ResponsiveProvider>
    <App />
  </ResponsiveProvider>,
  document.getElementById('root')
)
```

Use the consumer in your components

```jsx
import { ResponsiveConsumer } from 'react-responsive'
;() => (
  <ResponsiveConsumer>
    {status => (
      <div>
        {status.desktop && <p>This only shows in Desktop</p>}
        <Button size={status.mobile ? 'small' : 'large'}>Click me</Button>
      </div>
    )}
  </ResponsiveConsumer>
)
```

### Default sizes and configuration

Default sizes:

- **mobile**: up to 767px
- **tablet**: from 768px to 1023px
- **desktop**: from 1024px

you can set any ranges you want like this

```jsx
import { ResponsiveProvider } from 'react-responsive'

// An object with your custom ranges
const sizes = {
  small: [-Infinity, 500],
  medium: [501, 1000],
  large: [1001, +Infinity]
}

ReactDOM.render(
  <ResponsiveProvider sizes={sizes}>
    <App />
  </ResponsiveProvider>,
  document.getElementById('root')
)
```
