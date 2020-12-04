import React from 'react';
import {Card} from 'antd';
import "antd/dist/antd.css";

export default class EmptyCart extends React.Component
{
    render()
    {
        return(
            <div>
                <br/><br/>
                <Card>
                    <h4>YOUR CART IS EMPTY!</h4>
                </Card>
            </div>
        )
    }
    
}

