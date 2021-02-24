import React, { useState } from 'react';
import { Button, Dropdown, Input, Menu } from "antd";
import {
TagsTwoTone
  } from '@ant-design/icons';
export default () => {
    const [visible, setVisible] = useState(false)
    const menu = (
        <Menu>
          <Menu.Item key="0">
            <Input/>
          </Menu.Item>
        </Menu>)
    return (
    
    <Dropdown overlay={menu}  trigger={['click']} visible={visible}>
    <Button onClick={e => setVisible(!visible)}>
        <TagsTwoTone />
</Button>
</Dropdown>
)}