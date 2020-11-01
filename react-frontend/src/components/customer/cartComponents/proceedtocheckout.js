import React from 'react';
import "antd/dist/antd.css";
import { Input, Radio, Button } from 'antd';
import { Divider, Tabs, Spin, Rate, Space, Card, Tooltip } from "antd";
import Image from "react-bootstrap/Image";
import "../viewComponent/viewItem.css";

export default class Proceedtocheckout extends React.Component 
{
      state = {
        value: 1,
        itemId: '5f96df9e379eb6263093e39d',
        item: "",
        quantity: 2,
        loading: false,
      };
    
      onChange = e => {
        console.log('radio checked', e.target.value);
        this.setState({
          value: e.target.value,
        });
      };

      componentDidMount() {
    
        var pointerToThis = this;
        fetch(
          `http://localhost:4000/restaurantadmin/item/viewitem/${this.state.itemId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => response.json())
          .then((data) => pointerToThis.setState({ item: data }));
      }

    render()
    {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          };

          const gridStyle1 = {
            width: "40%",
            marginTop: "0em",
            marginLeft: '1em',
            textAlign: "center",
            justifyContent: "center",
            borderWidth: 0,
          };
          const gridStyle2 = {
            width: "45%",
            textAlign: "left",
            justifyContent: "center",
            borderWidth: 0,
          };
        return(
                <div style={{overflow: 'hidden'}}>
                    <br/><br/>
                    <h4 style={{marginLeft: '1em', paddingBottom: '0.5em'}}>Order Summary</h4>
                    <Card className="view-card" style={{ float: 'left', marginLeft: '2em' ,height: "200px", width: '45%',  clear: 'left'}}>
                    <Card.Grid hoverable={false} style={gridStyle1}>
                        <Image
                        className="image"
                        width={170}
                        height={150}
                        src= {`http://localhost:4000/restaurantadmin/item/image/${this.state.itemId}`}
                        roundedCircle
                        />
                    </Card.Grid>
                    <Card.Grid hoverable={false} style={gridStyle2}>
                        <Card className="grid-card" style={{marginTop: '0.8em'}}>
                        <p>
                            <span className="item-name">{this.state.item.name}</span>
                            <br/>
                            <p>{this.state.item.description}</p>
                            <hr/>
                            <span className='price'>{this.state.quantity} x Rs. {this.state.item.price}</span><hr/>
                        </p>
                        </Card>
                    </Card.Grid>

                    </Card>

                    <Card style={{ float: 'Left' , marginLeft:'2em', marginTop: '2em', height:"175px", borderRadius: '5px', width: '45%', clear: 'Left'}}>
                                <h5>CART TOTALS</h5>
                                <hr/>
                            <p style={{overflow: "hidden"}}>
                                <span style={{float: 'left'}}>Sub Total</span>
                                <span className='price' style={{float: 'right'}}>Rs. {this.state.quantity * this.state.item.price}</span>
                            </p>
                            <hr/>
                            <p style={{overflow: "hidden"}}>
                                <span style={{float: 'left'}}>Grand Total</span>
                                <span className='price' style={{float: 'right'}}>Rs. {this.state.quantity * this.state.item.price}</span>
                            </p>
                            <hr/>
                    </Card>

                <div style={{ float: 'right', padding:'2em', paddingTop:'0em', marginRight: '4em', width: '35em',  textAlign: 'Left',overflow: 'hidden'}}>
            
                <h6>Name</h6>
                <Input 
                    placeholder="Name"
                    type="text"
                    name="name"
                />
                <br/><br/>
                <h6>Email</h6>
                 <Input 
                    placeholder="Email"
                    type="email"
                    name="email"
                />
                <br/><br/>
                <h6>Phone Number</h6>
                <Input 
                    placeholder="Phonenumber"
                    type="phonenumber"
                    name="phonenumber"
                />
                <br/><br/>
                <h6>Gift Card or Discount Coupon</h6>
                <Input 
                    placeholder="Gift Card or Discount Coupon"
                    type="text"
                    name="giftcard"
                />
                <br/><br/>
                <h6>Payment</h6>
                <Radio.Group onChange={this.onChange} value={this.state.value}>
                    <Radio style={radioStyle} value={1}>
                        Credit Card
                    </Radio>
                    <Radio style={radioStyle} value={2}>
                        Cash on Delivery(COD)
                    </Radio>
                </Radio.Group>
                <br/><br/>
                <span className='button-span'>
                <a href={`/place/order/`}>
                <Button className='button'  color={'#855b36'}>Place Order</Button>
                </a>
                </span>
            </div>
            
                    {/* <br />
                    <div style={{paddingLeft:'2em', marginTop: '2em',  overflow: 'hidden'}}>
                        <Card style={{float: 'Left' ,height:"175px", borderRadius: '5px', width: '46%', clear: 'Left'}}>
                                <h5>CART TOTALS</h5>
                                <hr/>
                            <p style={{overflow: "hidden"}}>
                                <span style={{float: 'left'}}>Sub Total</span>
                                <span className='price' style={{float: 'right'}}>Rs. {this.state.quantity * this.state.item.price}</span>
                            </p>
                            <hr/>
                            <p style={{overflow: "hidden"}}>
                                <span style={{float: 'left'}}>Grand Total</span>
                                <span className='price' style={{float: 'right'}}>Rs. {this.state.quantity * this.state.item.price}</span>
                            </p>
                            <hr/>
                        </Card>
                    </div>      
                                   */}
            
            </div>
            
        )
    }
}