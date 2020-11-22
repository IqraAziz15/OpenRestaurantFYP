import React from 'react';
import { Result, Button } from 'antd';
import {useParams} from "react-router-dom";

import "antd/dist/antd.css";

export default function Successmsg()
{
    const { orderId } = useParams();
    return(
            <div>
                <Result
                    status="success"
                    title="You have successfully placed your order!"
                    subTitle={`Order Id ${orderId}`}
                    
                    extra={[
                        <a href={`/pending/order/${orderId}`}>
                    <Button type="primary" key="console">
                        View Order
                        
                    </Button></a>,
                    <a href={`/home`}>
                    <Button key="buy">Continue Shopping</Button></a>,
                    ]}
                    // subTitle={this.state.random}
                />,
            </div>
    )
    
}

