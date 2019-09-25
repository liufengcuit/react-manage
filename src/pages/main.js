import React from 'react';
import { Menu, Icon, Button, Layout } from 'antd';
import { Route, Switch, Link  } from 'react-router-dom';
import './main.scss';
import Routes from '../routers/index';
import menus from '../menu/index';
import notFound from './notFound';
import welcome from './welcome';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

console.log(Link)
class Main extends React.Component {
    rootSubmenuKeys = ['sub1', 'sub2'];

    state = {
        collapsed: false,
        openKeys: [menus[0].index],
      };
    
      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };

      onOpenChange = openKeys => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          this.setState({ openKeys });
        } else {
          this.setState({
            openKeys: latestOpenKey ? [latestOpenKey] : [],
          });
        }
      };

      onSelect = item => {
          console.log(item);
          console.log(this.props)
          this.props.history.push(item.key)
      }
    
      render() {
        return (
            <Layout className="main-system">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo">后台管理系统</div>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        openKeys={this.state.openKeys}
                        onSelect={this.onSelect}
                        onOpenChange={this.onOpenChange}
                        mode="inline"
                        theme="dark"
                    >
                        {
                            menus.map(item=>(
                                <Menu.Item key={item.index}>
                                        <Icon type={item.icon} />
                                        <span>{item.name}</span>
                                </Menu.Item>
                            ))
                        }
                        
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            background: '#fff',
                            minHeight: 280,
                        }}
                    >
                        <Route exact path="/dashboard" component={welcome}></Route>
                        <Route path="/dashboard/404" component={notFound}></Route>
                    </Content>
                </Layout>
            </Layout>
        );
      }
}

export default Main;