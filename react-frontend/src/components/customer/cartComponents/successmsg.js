import React from 'react';
import { Result, Button } from 'antd';
import "antd/dist/antd.css";

export default class Successmsg extends React.Component
{
    constructor()
    {
        super();
    }
    state = {
        random : null
    }
    randomnumbergenerator = () => {
        const min = 1000000;
        const max = 1000000000;
        const rand = Math.round(min + Math.random() * (max - min));
        this.setState({ random: this.state.random + rand });
    }
    render()
    {
        return(
            <div>
                <Result
                    status="success"
                    title="You have successfully placed your order!"
                    
                    extra={[
                        <a href={`/pending/order/${this.state.random}`}>
                    <Button type="primary" key="console" onClick={this.randomnumbergenerator}>
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
}

