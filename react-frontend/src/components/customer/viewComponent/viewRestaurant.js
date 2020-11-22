import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Link, Redirect, BrowserRouter as Router, Switch, NavLink, Route, useRouteMatch } from "react-router-dom";
//     import { withRouter } from "react-router";
// import {useParams } from 'react-router';
import img from '../../../assets/icons/rest.png';
class P2Layout extends React.Component {
  state = {
    // user: this.props.user,
    rest_id: this.props.id,
    rest: "",
    loading: true,
  };
    
  componentDidMount = () => {
    var body = JSON.stringify({ id: this.state.rest_id });
    const pointerToThis = this;
    fetch("http://localhost:4000/restaurantadmin/restaurant/getrestaurant/", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => pointerToThis.setState({ rest: data, loading: false }));
  };

  addItemToCart(itemId){
    const pointerToThis = this;
    const body = JSON.stringify({ 
      cid: '5fa039f90cc3292850361335',
      id: itemId,
      quantity: 1
    })
    fetch("http://localhost:4000/customer/cart/additemtocart/", {
      method: "POST",
      body,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
  }

  render() {
    return (
      <div style={{ padding: "1.5em 1.5em" }}>
        {this.state.loading ? (
          ""
        ) : (
          <div>
            <div href="#" class="list-group-item list-group-item-action">
              <div
                style={{ alignContent: "space-between" }}
                class="d-flex w-55 "
              >
                <img
                  src={img}
                  style={{ margin: "0.75em" }}
                  width="350"
                  height="350"
                  class="rounded-circle"
                />
                <div
                  class="justify-content-between"
                  style={{
                    display: "inline",
                    alignContent: "space-between",
                    marginTop: "7em ",
                  }}
                >
                  <h2 key={this.state.rest.name}>{this.state.rest.name}</h2>
                  <p key={this.state.rest.location}>
                    {this.state.rest.location}
                  </p>
                  <p class="mb-1" style={{ display: "block" }}>
                    It is a leading international fast food brand that
                    specializes in the crispy fried chicken and is well known
                    for its zinger burgers.
                  </p>
                </div>
              </div>
            </div>
            <br />
            <h2>MENU</h2>
            <hr/>
            {this.state.rest.menu ? 
            <div class="list-group">
              
              <h4>ITEMS MENU</h4>
              <div>
              {this.state.rest.menu.submenus.map((submenu) => (
                <div>
                  <a href="#" class="list-group-item list-group-item-action">
                    <div>
                      <h4 key={submenu.name}>{submenu.name}</h4>
                      <hr />
                    </div>
                    {submenu.items.map((item) => (
                      <div>
                        <div
                          style={{ alignContent: "space-between" }}
                          class="d-flex w-55 "
                        >
                        <a style={{ cursor:"pointer" }} href={`/view/${item._id}`} key={item._id}>
                          <img
                            src={`http://localhost:4000/restaurantadmin/item/image/${item._id}`}
                            style={{ marginRight: "40px" }}
                            width="110"
                            height="110"
                            class="rounded-circle"
                          />
                          <div
                            class="justify-content-between"
                            style={{
                              display: "inline",
                              alignContent: "space-between",
                            }}
                          >
                            <h5 class="mb-1" key={item.name}>
                              {item.name}
                            </h5>
                            <p class="mb-1" key={item.price}>
                              Rs. {item.price}
                            </p>
                            <small key={item.description}>
                              {item.description}
                            </small>
                            
                          </div>
                          </a>
                          <div class="ml-auto justify-content-between" style={{ display: 'inline', alignContent: 'space-between'}}>
                          <i onClick={()=>this.addItemToCart(item._id)} class="material-icons">shopping_cart</i>
                        </div>
                        </div>
                        <hr />
                      </div>
                    ))}
                  </a>
                  <br />
                </div>
              ))}
              </div>

              <div>
                <div class="list-group">
                <h4>DEALS MENU</h4>
                    {this.state.rest.menu.deals.map(deal =>
                      <div class="list-group-item list-group-item-action">
                        <a style={{ cursor:"pointer" }} href={`/viewdeal/${deal._id}`} key={deal._id}>
                          <div style={{alignContent: 'space-between' }} class="d-flex w-55">
                          <img src = {`http://localhost:4000/restaurantadmin/deal/image/${deal._id}`} style={{marginRight: '40px' }} width="100" height="100" />
                          <div>
                              <h5 class="mb-1" key={deal.name}>{deal.name}</h5>
                              <p class="mb-1" key={deal.total_bill}>{deal.total_bill}</p>
                              <small key={deal.description}>{deal.description}</small>
                          </div>
                          <div class="ml-auto justify-content-between" style={{ display: 'inline', alignContent: 'space-between'}}>
                            <a href=''><i onClick={()=>alert('added')} class="material-icons">shopping_cart</i></a>
                          </div>
                          </div>
                        </a>  
                    </div>
                )}
                </div>      
              </div>
            </div>
            : ''}
          </div>
        )}
      </div>
    );
  }
}

export default (P2Layout);
