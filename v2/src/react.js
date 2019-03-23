import PropTypes from 'prop-types'
import React from 'react'

import Airship from './index'
export {Airship}

export class FlagProvider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: !Airship.environment
    }

    if (Airship.environment) {
      this.configure()
    }
  }

  async configure() {
    if (!Airship.environment) {
      await Airship.configure({
        envKey: this.props.envKey,
        flagConfig: this.props.flagConfig,
        subscribeToUpdates: this.props.subscribeToUpdates
      })
    }
    if (this.props.entity) {
      Airship.identify(this.props.entity)
    }
  }

  async componentDidMount() {
    if (Airship.environment) {
      return
    }

    await this.configure()
    this.setState({loading: false})
  }

  render() {
    return this.state.loading ? this.props.loadingView : this.props.children
  }
}

FlagProvider.propTypes = {
  envKey: PropTypes.string,
  entity: PropTypes.object,
  flagConfig: PropTypes.object,
  loadingView: PropTypes.node,
  subscribeToUpdates: PropTypes.bool,
  children: PropTypes.node
}

FlagProvider.defaultProps = {
  children: null,
  loadingView: null,
  subscribeToUpdates: false
}

export function withFlag(WrappedComponent, ...flagNames) {
  return class FlaggedComponent extends React.Component {
    componentDidMount() {
      Airship.addGatingInfoListener(this.handleChange)
    }

    componentWillUnmount() {
      Airship.removeGatingInfoListener(this.handleChange)
    }

    handleChange = () => {
      this.forceUpdate()
    }

    render() {
      if (flagNames.length === 0) {
        // eslint-disable-next-line no-console
        console.warn('withFlag did not receive a valid flag name')
        return <WrappedComponent flags={{}} {...this.props} />
      }

      const flags = flagNames.reduce((flags, flagName) => {
        const flag = Airship.flag(flagName)
        const enabled = flag.isEnabled(this.props.entity)
        const eligible = flag.isEligible(this.props.entity)
        const treatment = flag.getTreatment(this.props.entity)
        const payload = flag.getPayload(this.props.entity)

        return {
          ...flags,
          [flagName]: {
            enabled,
            eligible,
            treatment,
            payload
          }
        }
      }, {})

      return <WrappedComponent flags={flags} {...this.props} />
    }
  }
}

export class FlagSwitch extends React.Component {
  render() {
    return React.Children.map(this.props.children, child => {
      if (child.type.prototype instanceof Flag || child.type === Flag) {
        const props = {}
        if (!child.props.flag) {
          props.flag = this.props.flag
        }
        if (!child.props.entity && this.props.entity) {
          props.entity = this.props.entity
        }
        return React.cloneElement(child, props, child.props.children)
      } else {
        return child
      }
    })
  }
}

FlagSwitch.propTypes = {
  flag: PropTypes.string.isRequired,
  children: PropTypes.node,
  entity: PropTypes.object
}

export class Flag extends React.Component {
  componentDidMount() {
    Airship.addGatingInfoListener(this.handleChange)
  }

  componentWillUnmount() {
    Airship.removeGatingInfoListener(this.handleChange)
  }

  handleChange = () => {
    this.forceUpdate()
  }

  render() {
    if (!this.props.flag) {
      // eslint-disable-next-line no-console
      console.warn('<Flag> component missing flag name')
      return null
    }

    const treatment = Airship.flag(this.props.flag).getTreatment(
      this.props.entity
    )
    if (treatment !== this.props.case) {
      return null
    }

    return this.props.children
  }
}

Flag.propTypes = {
  flag: PropTypes.string,
  case: PropTypes.string.isRequired,
  children: PropTypes.node,
  entity: PropTypes.object
}

Flag.defaultProps = {
  children: null
}
