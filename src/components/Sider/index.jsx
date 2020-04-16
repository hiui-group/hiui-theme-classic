import React, { Component } from 'react'
import { Menu } from '@hi-ui/hiui/es'
import ClassNames from 'classnames'
import './style/index.scss'

class Sider extends Component {
  render () {
    const {
      siderMenu,
      siderTopRender,
      siderBottomRender,
      activeSiderMenu,
      logo,
      setSiderMenu,
      history,
      getInitNav,
      mini,
      miniToggle,
      color,
      accordion
    } = this.props
    return (
      <div className={ClassNames('hi-theme__sider', color)}>
        {logo && <div className={ClassNames('sider__logo', { mini: mini })}>{logo}</div>}
        {siderTopRender && siderTopRender(mini)}
        {siderMenu.length > 0 && (
          <Menu
            placement='vertical'
            accordion={accordion}
            collapsed={mini}
            activeId={activeSiderMenu}
            onClick={(id) => {
              setSiderMenu(id)
              const navTo = getInitNav(siderMenu, id)
              history.push(navTo.pathname)
            }}
            data={siderMenu}
          />
        )}
        {siderBottomRender && siderBottomRender(mini)}
        <div className='sider__footer'>
          <span
            className={ClassNames('sider__footer__toggle', {
              'sider__footer__toggle--light': color === 'dark'
            })}
            onClick={miniToggle}
          />
        </div>
      </div>
    )
  }
}

export default Sider
