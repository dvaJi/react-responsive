import {
  ResponsiveContext,
  ResponsiveProviderBase
} from './components/Responsive'

export const ResponsiveConsumer = ResponsiveContext

export class ResponsiveProvider extends ResponsiveProviderBase {
  width() {
    return window.innerWidth
  }

  componentDidMount() {
    window.addEventListener('resize', this.onWindowResize, false)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize)
  }
}
