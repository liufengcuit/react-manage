import React from 'react';
import { Menu, Icon, Button, Layout } from 'antd';
import { Route, Switch, Link  } from 'react-router-dom';
import './main.scss';
import Routes from '../routers/index';
import menus from '../menu/index';
import notFound from './notFound';
import welcome from './welcome';
import table from './basic/table';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

console.log(Link)
class Main extends React.Component {
    rootSubmenuKeys = ['sub1', 'sub2'];

    state = {
        collapsed: false,
        openKeys: ["dashboard"],
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
          console.log(this.state.openKeys)
        //   this.props.history.push(item.key)
      }
      renderSubItem = (item, index) => {
        return item.sub && item.sub.map(subItem =>(
            <Menu.Item key={subItem.index}>
                <Link to={subItem.index}>
                    {subItem.name}
                </Link>
            </Menu.Item>
            
        ))
      }
      render() {
        return (
            <Layout className="main-system">
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className="logo">后台管理系统</div>
                    <Menu
                        defaultSelectedKeys={['dashboard']}
                        defaultOpenKeys={['dashboard']}
                        openKeys={this.state.openKeys}
                        onSelect={this.onSelect}
                        onOpenChange={this.onOpenChange}
                        mode="inline"
                        theme="dark"
                    >
                        {
                            menus.map((item, index) => (
                                item.sub&&item.sub.length
                                ? <SubMenu title={
                                    <span>
                                        <Icon type={item.icon} />
                                        <span>{item.name}</span>
                                    </span>
                                }>
                                    {this.renderSubItem(item, index)}
                                  </SubMenu>
                                : 
                                <Menu.Item key={item.index}>
                                        <Link to={item.index}>
                                            <Icon type={item.icon} />
                                            <span>{item.name}</span>
                                        </Link>
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
                        <Route exact path="/dashboard/404" component={notFound}></Route>
                        <Route exact path="/basic/table" component={table}></Route>
                    </Content>
                </Layout>
            </Layout>
        );
      }
}

export default Main;