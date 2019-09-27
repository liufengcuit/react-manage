import React from 'react';
import { Menu, Icon, Layout } from 'antd';
import { Route, Link  } from 'react-router-dom';
import './main.scss';
import Routes from '../routers/index';
import menus from '../menu/index';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const rootSubmenuKeys = menus.map(item=>item.key);
console.log()

class Main extends React.Component {
    rootSubmenuKeys = rootSubmenuKeys

    state = {
        collapsed: false,
        openKeys: [rootSubmenuKeys.shift()],
    };

    /**
     * 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。
     */
    componentDidMount() {
        console.log(window.location.href)
    }
    
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
      
    renderSubItem = (item,index) => {
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
                    <div className="logo">
                        {
                            !this.state.collapsed? '后台管理系统': 'Logo'
                        }
                    </div>
                    <Menu
                        defaultSelectedKeys={this.state.openKeys}
                        defaultOpenKeys={this.state.openKeys}
                        openKeys={this.state.openKeys}
                        onOpenChange={this.onOpenChange}
                        mode="inline"
                        theme="dark"
                    >
                        {
                            menus.map((item, index) => (
                                item.sub&&item.sub.length
                                ? <SubMenu key={item.key} title={
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
                        {
                            Routes.map(item=>(
                                <Route key={item.path} exact path={item.path} component={item.component}></Route>
                            ))
                        }
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Main;