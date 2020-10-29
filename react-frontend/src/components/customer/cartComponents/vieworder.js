import React from 'react';
import { Card } from 'antd';
import "antd/dist/antd.css";

export default class Orderhistory extends React.Component
{
    constructor()
    {
        super();
    }
    state = {
        random : null
    }
    render()
    {
        return(
            <div>
                <Card style={{ width: '75%', marginTop:'3em', marginLeft:'12em'}}>
                    <h4>
                        ORDER HISTORY
                    </h4>
                    <hr/>
                    <p style={{overflow: "hidden"}}>
                        <span style={{float: 'left'}}>Order Number</span>
                        <span className='price' style={{float: 'right'}}>{this.props.random}</span>
                    </p>
                    <hr/>
                    <p style={{overflow: "hidden"}}>
                        <span style={{float: 'left'}}>Status</span>
                        <span className='price' style={{float: 'right'}}>Pending</span>
                    </p>

                </Card>
            </div>
        )
    }
}