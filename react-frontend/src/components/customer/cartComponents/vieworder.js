import React, { useEffect,useState } from 'react';
import { Card } from 'antd';
import "antd/dist/antd.css";
import {useParams} from "react-router-dom";
import axios from "axios";


export default class Orderhistory extends React.Component
{
    
    state = {
        orderId: this.props.orderId
    }
    // const { orderId } = '804779893';
    componentDidMount = async() =>
    {
        var body = JSON.stringify({ orderId: this.state.orderId });
        const pointerToThis = this;
        fetch("http://localhost:4000/customer/order/viewOrder/",  {
        method: "POST",
        body,
        headers: {
            "Content-Type": "application/json",
        },
        })
        .then((response) => {response.json();
        console.log(response)})
        // setLoading(false);
        // .then((data) => pointerToThis.setState({ rest: data, loading: false }));
    };
    date = () =>{
        const today = Date.now();

        return(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(today));
    }

    render()
    {
    
        return(
            <div>
                
                <Card style={{ width: '75%', marginTop:'3em', marginLeft:'12em'}}>
                    <h4>
                        ORDER SUMMARY
                    </h4>
                    <hr/>
                    <p style={{overflow: "hidden"}}>
                        <span style={{float: 'left'}}>Order Number</span>
                        <span className='price' style={{float: 'right'}}>{this.state.orderId}</span>
                    </p>
                    <hr/>
                    <p style={{overflow: "hidden"}}>
                        <span style={{float: 'left'}}>Status</span>
                        <span className='price' style={{float: 'right'}}>Pending</span>
                    </p>
                    <hr/>
                    <p style={{overflow: "hidden"}}>
                        <span style={{float: 'left'}}>Date</span>
                        <span className='price' style={{float: 'right'}}>{this.date()}</span>
                    </p>

                </Card> 
            </div>
        )
    }
}