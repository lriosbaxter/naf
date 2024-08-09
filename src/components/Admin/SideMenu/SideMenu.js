import React from 'react'
import "./SideMenu.scss"
import { Menu, Icon } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';

export function SideMenu(props) {
    const { children } = props;
    const { pathname } = useLocation();
  return (
    <div className='side_menu_admin'>
        <MenuLeft pathname={pathname}/>
        <div className='content'>{children}</div>
    </div>
  )
}

function MenuLeft(props) {
    const { pathname } = props;

    return (
        <Menu className='side' fixed='left' borderless vertical >
            <Menu.Item as={Link} to={'/admin'} active={pathname === '/admin'}>
                <Icon name='home'/>Home
            </Menu.Item>
            <Menu.Item as={Link} to={'/admin/users'} active={pathname === '/admin/users'}>
                <Icon name='users'/>Users
            </Menu.Item>
            <Menu.Item as={Link} to={'/admin/sites'} active={pathname === '/admin/sites'}>
                <Icon name='building'/>Sites
            </Menu.Item>
            <Menu.Item as={Link} to={'/admin/routers'} active={pathname === '/admin/routers'}>
                <Icon name='hdd outline'/>Routers
            </Menu.Item>
            <Menu.Item as={Link} to={'/admin/switches'} active={pathname === '/admin/switches'}>
                <Icon name='hdd'/>Switches
            </Menu.Item>
            <Menu.Item as={Link} to={'/admin/search'} active={pathname === '/admin/search'}>
                <Icon name='search'/>Search device
            </Menu.Item>
            <Menu.Item 
                as={Link} 
                to={'/admin/folder-list'} 
                active={pathname === '/admin/folder-list'}
            >
                <Icon name='list'/>Folder list
            </Menu.Item>
            <Menu.Item 
                as={Link} 
                to={'/admin/script-list'} 
                active={pathname === '/admin/script-list'}
            >
                <Icon name='list'/>Script list
            </Menu.Item>
            <Menu.Item 
                as={Link} 
                to={'/admin/bgp'} 
                active={pathname === '/admin/bgp'}
            >
                <Icon name='folder'/>BGP Script
            </Menu.Item>
            <Menu.Item 
                as={Link} 
                to={'/admin/nwa-scripts'} 
                active={pathname === '/admin/nwa-scripts'}
            >
                <Icon name='folder'/>NWA Scripts
            </Menu.Item>
            <Menu.Item 
                as={Link} 
                to={'/admin/sw-scripts'} 
                active={pathname === '/admin/sw-scripts'}
            >
                <Icon name='folder'/>SW Scripts
            </Menu.Item>
        </Menu>
    )
}
