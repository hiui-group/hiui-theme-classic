import React, { useCallback, useState, useEffect, useRef } from 'react'
// import Menu from './menu'
import classNames from 'classnames'
import './style/index.scss'
import { Icon, Tooltip } from '@hi-ui/hiui'
import Popper from '../popper'
import NormalMenu from './NormalMenu'
import PopperMenu from './PopperMenu'
import { getScrollBarSize } from '../../util/common'

const Sider = ({ siderMenu, siderTopRender, siderBottomRender, selectedMenus, logo, login, onSelectMenu }) => {
  const [mini, toggleMini] = useState(false)
  const [expandedId, setExpandedId] = useState([])
  const [popperVisible, setPopperVisible] = useState(null)
  const [tooltipVisible, setTooltipVisible] = useState(null)

  const [loginVisible, setLoginVisible] = useState(false)
  const siderRef = useRef(null)
  const popperRef = useRef(null)
  const loginRef = useRef(null)

  const scrollBarSize = useRef(getScrollBarSize())

  useEffect(() => {
    setExpandedId(selectedMenus.map((sm) => sm.id))
  }, [])

  const renderMiniChildren = useCallback(
    (menu, selectedMenus) => {
      return menu.map((m) => {
        return (
          <div
            className={'sider__menu-item'}
            key={m.id}
            onMouseEnter={() => {
              setTooltipVisible(m.id)
            }}
            onMouseLeave={() => {
              setTooltipVisible(null)
            }}
            onClick={() => {
              if (popperVisible !== m.id) {
                setTooltipVisible(null)
                setPopperVisible(m.id)
              } else {
                setTooltipVisible(m.id)
                setPopperVisible(null)
              }
            }}
          >
            <Tooltip title={m.name} placement='right' visible={tooltipVisible === m.id && popperVisible !== m.id}>
              <PopperMenu
                menu={m}
                selectedMenus={selectedMenus}
                visible={popperVisible === m.id}
                setPopperVisible={setPopperVisible}
                onSelectMenu={onSelectMenu}
                siderRef={siderRef}
              />
            </Tooltip>
          </div>
        )
      })
    },
    [tooltipVisible, popperVisible, siderRef]
  )
  const renderChildren = useCallback((menu, selectedMenus, level = 1, expandedId) => {
    return menu.map((m) => {
      return (
        <NormalMenu
          key={m.id}
          menu={m}
          setExpandedId={setExpandedId}
          expandedId={expandedId}
          level={level}
          selectedMenus={selectedMenus}
          renderChildren={renderChildren}
          onSelectMenu={onSelectMenu}
        />
      )
    })
  }, [])

  return (
    <div className={classNames('hi-theme__sider', { 'hi-theme__sider--mini': mini })} ref={siderRef}>
      {logo && <div className={classNames('sider__logo', { mini: mini })}>{logo}</div>}
      {siderTopRender && siderTopRender(mini)}
      {siderMenu.length > 0 && (
        <div className='sider__menu'>
          <div style={{ height: '100%', overflowY: 'scroll', width: `calc(100% + ${scrollBarSize.current}px)` }}>
            {mini
              ? renderMiniChildren(siderMenu, selectedMenus)
              : renderChildren(siderMenu, selectedMenus, 1, expandedId)}
          </div>
        </div>
      )}
      {siderBottomRender && siderBottomRender(mini)}
      <div className='sider__footer'>
        <Icon
          name='list'
          onClick={() => {
            const _mini = !mini
            toggleMini(_mini)
          }}
        />
        {login && (
          <React.Fragment>
            <div
              className={'login__wrapper'}
              ref={loginRef}
              onClick={(e) => {
                setLoginVisible(!loginVisible)
              }}
            >
              <Icon name={login.icon} />
              {login.name}
              <Icon name={'packup'} />
            </div>
            <Popper
              show={loginVisible}
              attachEle={loginRef.current}
              zIndex={1050}
              placement='right-end'
              onClickOutside={() => setLoginVisible(false)}
              width={'auto'}
            >
              <div ref={popperRef} className='login__menu--top'>
                {login.children}
              </div>
            </Popper>
          </React.Fragment>
        )}
      </div>
    </div>
  )
}

export default Sider
