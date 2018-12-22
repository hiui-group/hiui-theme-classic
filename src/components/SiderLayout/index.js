import React from 'react'
import Sider from '../Sider'
import Provider from '../../util/context'
import { Switch, Route, Redirect } from 'react-router-dom'

class SiderLayout extends React.Component {
  getCurrentPath () {
    // const { sider } = this.props.options
    // const mode = sider.isHash

    // let pathname = window.location.pathname
    // let hash = window.location.hash

    // if (hash) {
    //   pathname = hash.replace(/#?(.*)/, (a, b) => {
    //     return b
    //   })
    // }
    // return mode ? pathname : window.location.href.split(window.location.origin)[1]
    return this.props.location.pathname
  }
  render () {
    let r = this.props.options.routeConfig.routes.filter((item) => {
      return item.path === this.props.match.path
    })
    return (
      <React.Fragment>
        <Sider
          accordion={false}
          current={this.getCurrentPath()}
          sider={this.props.options.sider}
          // changeCollapse={this.changeCollapse.bind(this)}
        />
        <div className='layout__main'>
          <div className='layout__content'>
            <div className='layout__sider-content'>
              <Switch>
                <Route
                  key={'root'}
                  path={`${this.props.match.path}`}
                  exact
                  render={() => <Redirect to={`${this.props.match.path}${r[0].routes[0].path}`} />}
                />
                {r.length > 0 && r[0].routes.map((item, index) => {
                  return <Route
                    key={index}
                    path={`${this.props.match.path}${item.path}`}
                    component={item.component}
                  />
                })
                }
              </Switch>
            </div>
          </div>
        </div>

      </React.Fragment>
    )
  }
}
export default Provider(SiderLayout)