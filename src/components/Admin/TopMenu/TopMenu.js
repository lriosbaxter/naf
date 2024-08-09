import React from 'react'
import { Icon, Menu } from 'semantic-ui-react'
import { useAuth } from '../../../hooks'
import "./TopMenu.scss"

export function TopMenu() {
  const { auth, logout } = useAuth();
  console.log(auth)

  const renderName = () => {
    if(auth.userData?.first_name && auth.userData?.last_name){
      return `${auth.userData.first_name} ${auth.userData.last_name}`
    }
    return auth.userData?.email

  }
  return (
    <Menu fixed='top' className='top_menu_admin'>
      <Menu.Item className='top_menu_admin_logo'>
        <p>NAM Site</p>
      </Menu.Item>
      <Menu.Menu position='right'>
        <Menu.Item>Hola, {renderName()}</Menu.Item>
        <Menu.Item onClick={logout}>
          <Icon name='sign-out'/>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
}
