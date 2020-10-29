import React, { Component } from "react";
import "antd/dist/antd.css";
import "./cartComponents.css";
import { Card, Space, Button, Tooltip } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

class ItemCounter extends Component {
  state = {
    default: this.props.default,
    min: this.props.min,
    max: this.props.max,
  };

  render() {
    return (
      <div className="input-number">
        <Space direction='Horizontal'>
            <Button icon={<LeftOutlined />} type="primary" size='small' shape="circle"/>
            <p className='input-value'>{this.state.default}</p>
            <Button type="primary" size='small' shape="circle" icon={<RightOutlined />}/>
        </Space>
      </div>
    );
  }
}

export default ItemCounter;
