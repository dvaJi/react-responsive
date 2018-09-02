import React, { PureComponent } from 'react'

const providerMap = (object, func) =>
  Object.assign(
    {},
    ...Object.keys(object).map(key => ({ [key]: func(object[key]) }))
  )

const defaultSizes = {
  mobile: [-Infinity, 767],
  tablet: [768, 1023],
  desktop: [1024, +Infinity]
}

export const ResponsiveContext = React.createContext({})

export class ResponsiveProviderBase extends PureComponent {
  constructor(props) {
    super(props)
    this.state = this.actualResponsiveState()
  }

  actualResponsiveState() {
    const actualWidth = this.width()
    const detectSize = size => actualWidth >= size[0] && actualWidth <= size[1]
    return providerMap(this.props.sizes, detectSize)
  }

  render() {
    return (
      <ResponsiveContext.Provider value={this.state}>
        {this.props.children}
      </ResponsiveContext.Provider>
    )
  }

  onWindowResize = () => this.setState(this.actualResponsiveState())
}

ResponsiveProviderBase.defaultProps = {
  sizes: defaultSizes
}
