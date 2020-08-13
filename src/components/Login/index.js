import React from 'react'
import Icon from '@hi-ui/hiui/es/icon'
import './style/index'

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      open: false
    }

    this.open = this.open.bind(this)
  }

  componentDidMount () {
    document.addEventListener('click', this.open)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.open)
  }

  open () {
    const open = this.state.open
    if (open) {
      this.setState({ open: false })
    }
  }

  render () {
    const open = this.state.open
    const { headUrl = '', name = '', children = '', style, icon } = this.props

    return (
      <div
        className={`hi-login ${open ? 'hi-login--active' : ''} ${children ? '' : 'hi-login--empty'}`}
        style={style}
        onClick={e => {
          e.stopPropagation()
          e.nativeEvent.stopImmediatePropagation()
          this.setState({ open: !open })
        }}
      >
        {headUrl ? (
          <div className='hi-login__img' style={{ backgroundImage: 'url(' + headUrl + ')' }} />
        ) : (
          ''
        )}
        {icon ? (
          <span style={{ marginRight: 5 }}>
            <Icon name={icon} />
          </span>
        ) : (
          ''
        )}
        {name ? <div className='hi-login__name'>{name}</div> : ''}
        {children ? (
          <div
            className='hi-login__info'
            onClick={e => {
              e.stopPropagation()
              e.nativeEvent.stopImmediatePropagation()
            }}
          >
            {children}
          </div>
        ) : (
          ''
        )}
      </div>
    )
  }
}

export default Login
