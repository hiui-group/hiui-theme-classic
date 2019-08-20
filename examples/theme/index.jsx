import React, { Component } from 'react'
import Theme from '../../src/theme'
import routeConfig from './routes-config'

const logoConfig = {
  logoUrl: 'https://xiaomi.github.io/hiui/static/img/logo.png?241e0618fe55d933c280e38954edea05',
  name: 'HIUI Theme',
  url: 'https://xiaomi.github.io/hiui/#/'
}

const loginConfig = {
  name: 'Mi Guest',
  icon: 'user',
  children: [
    <div key="1" style={{ textAlign: 'center', margin: 4, width: '100px' }}>
      <a href="#info">个人信息</a>
    </div>,
    <div key="2" style={{ textAlign: 'center', margin: 4, width: 100 }}>
      <a href="#logout">注销</a>
    </div>
  ]
}
class App extends Component {
  render() {
    return <Theme routes={routeConfig} logo={logoConfig} login={loginConfig} type="genuine" />
  }
}

export default App
