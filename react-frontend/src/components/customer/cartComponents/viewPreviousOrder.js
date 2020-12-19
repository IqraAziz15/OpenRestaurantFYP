import React, { useEffect, useState } from 'react';
import { Rate, Button, message, Card, Spin } from 'antd';
import "antd/dist/antd.css";
import { useParams } from "react-router-dom";
import NoOrder from './noorder';
import axios from "axios";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import ReviewRateModal from "../reviewRatingComponents/reviewRateModal";

class ViewPreviousOrder extends React.Component {

    state = {
        orderId: this.props.id,
        user: '',
        order: '',
        item_id: '',
        review: null,
        rating: 0,
        ConfirmLoading: false,
        bloading: false,
        visible: false,
        loading: true,
        itemsDetails: [],
        Total: 0,
        redirect: false,
        redirect1: false,
        showTotal: false,
        orders: [],
        updated: false,
    }

    
   static propTypes = {
    auth : PropTypes.object.isRequired,
    isAuthenticated : PropTypes.bool,
    // error : PropTypes.object.isRequired
}
    // const { orderId } = '804779893';


    componentDidMount = async () => {
        while (this.props.auth.isLoading){}
        await this.setState({user: this.props.auth.user, isauth: this.props.auth.isAuthenticated, redirect: true})
        if(this.props.auth.isAuthenticated) await this.getOrderCustomer();
    };

    date = (ordertime) => {
        // const a = Date.now();
        // console.log(a)
        var today = new Date(ordertime);
        return today.toString()
        // const today = this.state.order.ordertime;

        return (new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(today));
    }

    cartDisplay = async () => {
        var pointerToThis = this;
        let cartItems = [];
        let userCart = [];
        // message.info('we are inside')
        this.state.orders.forEach(rest => {
            // console.log('c')
            rest.ordered_food.forEach(item => {
                cartItems.push(item.id);
                userCart.push({ id: item.id, quantity: item.quantity })
            })

        });
        // console.log('d')
        await this.getItems(cartItems, userCart)
        // console.log('e')
        if (this.state.itemsDetails) {
            // console.log('f')
            console.log(this.state.itemsDetails)
            if (this.state.itemsDetails.length > 0) {
                // console.log('g')
                pointerToThis.calculateTotal(this.state.itemsDetails)
                // console.log('h')
            }
        }

        // message.success('wooooohoooooo, we are out')
    }

    getItems = async (cartItems, userCart) => {
        const pointerToThis = this;
        const body1 = {
            type: 'array',
            id: cartItems,
            cid: this.props.auth.user._id
        }
        const request = await axios.post(`http://localhost:4000/api/ratings/get-item-ratings-reviews-customer-order`, body1)
            .then(response => {
                console.log(response.data)
                console.log(response)

                //Make CartDetail inside Redux Store 
                // We need to add quantity data to Product Information that come from Product Collection. 

                userCart.forEach(cartItem => {
                    response.data.items.forEach((productDetail, i) => {
                        if (cartItem.id === productDetail._id) {
                            response.data.items[i].quantity = cartItem.quantity;
                        }
                    })
                })
                console.log(response.data)
                pointerToThis.setState({ itemsDetails: response.data.items,  loading: false  });
                return response.data.items;
            });
        console.log(request)
        return request;


    }

    calculateTotal = (cartDetail) => {
        let total = 0;
        console.log(cartDetail)
        cartDetail.map(item => {
            var itemprice = item.price ? item.price : item.total_bill
            total += parseInt(itemprice, 10) * item.quantity
            console.log('totalllll ' + total)
        });

        this.setState({ Total: total })
        this.setState({ showTotal: true })
    }

    getOrderCustomer = async () => {
        if (!this.props.auth.isAuthenticated) return
        var body = {
            cid: this.props.auth.user._id,
            orderid: this.state.orderId
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        var pointerToThis = this; var ordersNotExist = true;
        await axios.post('http://localhost:4000/customer/order/viewordercustomer', body, config)
            .then((res) => {
                if(res.data.length > 0) pointerToThis.setState({ orders: res.data});
                else pointerToThis.setState({redirect1: true});
                // alert(' Order Viewed')
                console.log(res)
                
            })
            .catch(err => console.log(err))
        console.log(this.state.orders)
        this.cartDisplay();
    }

    addReviewRating = async() => {
        if(this.state.review){
            const review_body = {
                customer: this.props.auth.user._id,
                item: this.state.item_id,
                description: this.state.review
            }
            await axios.post('http://localhost:4000/api/reviews/addreview', review_body)
            .then((res) => {
                console.log(res)
                message.success('Your review is saved.')
                this.setState({review: '', updated: true})
            })
            .catch(err => console.log(err))
        }
        if(this.state.rating){
            const rate_body = {
                customer: this.props.auth.user._id,
                item: this.state.item_id,
                stars: this.state.rating
            }
            await axios.post('http://localhost:4000/api/ratings/rate', rate_body)
            .then((res) => {
                console.log(res)
                message.success('Your rating is saved.')
                this.setState({rating: 0, updated: true})
            })
            .catch(err => console.log(err))
        }
        if(this.state.updated) await this.cartDisplay();
    }

    render()
    {
        const handleOk = () => {
            this.setState({ConfirmLoading: true, bloading: true})
            setTimeout(() => {
            this.addReviewRating();
            this.setState({visible: false})
            this.setState({ConfirmLoading: false, bloading: false})
            }, 2000);
        };
        let ModalClose = () => this.setState({visible:false}); 
        const onChangeRating = (value) => {
            this.setState({rating:value})
        }
        const onChangeReview = ({ target: { value } }) => {
            this.setState({review:value})
        }
        const {isAuthenticated, user} = this.props.auth;
        if(!isAuthenticated && this.state.redirect) {
        return (<Redirect push to='/login'/>)
        }
        if(this.state.redirect1 && this.state.orders.length < 1) {
        return (<NoOrder/>)
        }
        return(
            <div>
                {this.state.loading ? (
                <center>
                    <Spin
                    className="spinner"
                    tip="Loading...Please Wait"
                    size="large"
                    />
                </center>
                ) : (
                    <div style={{paddingTop: '2em'}}>
                <Card style={{ width: '75%', marginTop:'3em', marginLeft:'12em'}}>
                    <h4>
                        ORDER SUMMARY
                    </h4>
                    <hr/>
                    <p style={{overflow: "hidden"}}>
                        <span style={{float: 'left'}}>Order Number</span>
                        <span className='price' style={{float: 'right'}}>{this.state.orderId}</span>
                    </p>
                    <p style={{overflow: "hidden"}}>
                        <span style={{float: 'left'}}>Date</span>
                        <span className='price' style={{float: 'right'}}>{this.date(this.state.orders[0].ordertime)}</span>
                    </p>
                    <p style={{overflow: "hidden"}}>
                        <span style={{float: 'left'}}>Email</span>
                        <span className='price' style={{float: 'right'}}>{this.state.user.email}</span>
                    </p>
                    <p style={{overflow: "hidden"}}>
                        <h4 style={{float: 'left'}}>Total</h4>
                        <h4 className='price' style={{float: 'right'}}>PKR. {this.state.Total}</h4>
                    </p>
                </Card>
                <br/>
                <br/>
                    <h4 style={{marginLeft:'8em'}}>
                        CART DETAILS
                    </h4>

                    <div>
                        {this.state.itemsDetails.map(item =>
                        <Card style={{ width: '75%', marginTop:'3em', marginLeft:'12em'}}>
                        <p>
                            <p style={{overflow: "hidden"}}>
                                <div style={{float: 'left'}}>
                                <span className="item-name">{item.name}</span>
                                <br/>
                                <p>{item.description}</p>
                                </div>
                                <div style={{float: 'right'}}>
                                <span className='price'>{item.quantity} x Rs. {item.price ? item.price : item.total_bill}</span>
                                </div>
                            </p> 
                            { (item.rating || item.review) ? 
                            <div style={{overflow: 'hidden', paddingLeft: '2em', paddingRight: '2em'}}>
                            <div style={{float: 'left'}}>
                            {item.rating ? <Rate className="rate"  disabled allowHalf style={{color: '#bb8c63'}}  value={item.rating} /> :
                             <Rate className="rate"  disabled allowHalf style={{color: '#aaa'}}  value={5} />}
                            {item.review ? <p><strong>Review: </strong>{item.review}</p> : '' }
                            </div>
                            {!this.props.disabled ?
                                <Button style={{float: 'right'}} className='button' onClick={async() => await this.setState({visible: true, item_id: item._id, review: item.review, rating:item.rating})}>Edit Rate/Review</Button> 
                            : '' }
                            </div>
                            :
                            <div style={{overflow: 'hidden', paddingLeft: '2em', paddingRight: '2em'}}>
                            {!this.props.disabled ?
                                <Button style={{float: 'right'}} className='button' onClick={async() => await this.setState({visible: true, item_id: item._id, review: item.review, rating:item.rating})}>Rate and Review</Button> 
                            : '' }
                            </div>
                            }
                        </p>
                        </Card> 
                        )}
                        <ReviewRateModal 
                        visible={this.state.visible} 
                        onCancel={ModalClose}
                        review={this.state.review}
                        rating={this.state.rating}
                        onChangeRating={onChangeRating}
                        onChangeReview={onChangeReview}
                        ConfirmLoading={this.state.ConfirmLoading}
                        submitButtonLoading={this.state.bloading}
                        onOk={handleOk}/>
                    </div>
                    <br/>
                </div>
                )}
            </div>
        )
    }

}


const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null) (ViewPreviousOrder)