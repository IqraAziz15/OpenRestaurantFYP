import React from 'react';
import { Result, Button } from 'antd';
import {Link} from "react-router-dom";

import "antd/dist/antd.css";

export default function Successmsg(props)
{
    return(
            <div style={{paddingTop:'5em'}}>
                <Result
                    status="success"
                    title="You have successfully placed your order!"
                    subTitle={`Order Id ${props.orderid}`}
                    
                    extra={[
                        <Link to={`/pending/order/${props.orderid}`}>
                    <Button type="primary" key="console">
                        View Order
                        
                    </Button></Link>,
                    <Link to={`/home`}>
                    <Button key="buy">Continue Shopping</Button></Link>,
                    ]}
                    // subTitle={this.state.random}
                />,
            </div>
    )
    
}

