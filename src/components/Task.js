import React from 'react';
import { Button, Input} from "antd";
import {
    DeleteTwoTone,
    CheckCircleTwoTone,
    CloseSquareTwoTone
  } from '@ant-design/icons';
import TagDropdown from './TagDropdown';
export default (props) => 
(
        <div>
            <Input onChange={(e) => props.onEdit(e.target.value)} value={props.dat || ''} 
            disabled={props.checked} 
            onBlur={props.onInputDone}
            bordered={false}
            />
            <Button onClick={props.onCheck} disabled={props.checked} > <CheckCircleTwoTone /> </Button>
            <Button onClick={props.onUnCheck} disabled={!props.checked} > <CloseSquareTwoTone /> </Button>
            <Button onClick={props.onDelete}> <DeleteTwoTone/> </Button>
            <TagDropdown/>
        </div>
)