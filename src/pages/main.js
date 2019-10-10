/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { Menu, Icon, Layout, Dropdown } from 'antd';
import { Route, Link  } from 'react-router-dom';
import './main.scss';
import Routes from '../routers/index';
import menus from '../menu/index';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

const rootSubmenuKeys = menus.map(item=>item.key);

class Main extends React.Component {

    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
        let menuObj = window.sessionStorage.getItem('menuObj');
        let menuKeys = menuObj? JSON.parse(menuObj): null;

        // this.setState({
        //     openKeys: menuKeys? menuKeys.openKeys: [rootSubmenuKeys.shift()],
        //     selectKeys:  menuKeys? menuKeys.selectKeys: [rootSubmenuKeys.shift() ]
        // })

        this.state = {
            collapsed: false,
            openKeys: menuKeys? menuKeys.openKeys: [rootSubmenuKeys.shift()],
            selectKeys: menuKeys? menuKeys.selectKeys: [rootSubmenuKeys.shift() ]
        }
    }

    rootSubmenuKeys = rootSubmenuKeys

    /**
     * 在第一次渲染后调用，只在客户端。之后组件已经生成了对应的DOM结构，可以通过this.getDOMNode()来进行访问。
     */
    componentDidMount() {
        
    }

    getCurrentMenu({ item, key, keyPath, domEvent }){
        console.log(this.openKeys)
        window.sessionStorage.setItem("menuObj", JSON.stringify({
            openKeys: this.openKeys,
            selectKeys: [key]
        }));
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
            <Menu.Item key={subItem.key}>
                <Link to={subItem.index}>
                    {subItem.name}
                </Link>
            </Menu.Item>
        ))
    }

    outLogin = () => {
        this.props.history.push("/login");
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
                        defaultSelectedKeys={this.state.selectKeys}
                        defaultOpenKeys={this.state.openKeys}
                        openKeys={this.state.openKeys}
                        onOpenChange={this.onOpenChange}
                        mode="inline"
                        theme="dark"
                        onClick={this.getCurrentMenu}
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
                                <Menu.Item key={item.key}>
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
                    <Header style={{ background: '#fff', padding: '0 0 0 16px' }}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        { this.state.openKeys }
                        <div className="header-box">
                            <div className='header-left'>
                                <img src="https://gc.xksquare.com/default_icon.png" alt=""/>
                                <span>欢迎您，</span>
                            </div>
                            <div className='header-right'>
                                <Dropdown overlay={(
                                    <Menu>
                                        <Menu.Item key="0" onClick={this.outLogin}>退出</Menu.Item>
                                    </Menu>
                                )} trigger={['click']}>
                                    <a className="ant-dropdown-link" href="#"> Admin&nbsp;&nbsp;<Icon type="down" /></a>
                                </Dropdown>
                            </div>
                        </div>
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