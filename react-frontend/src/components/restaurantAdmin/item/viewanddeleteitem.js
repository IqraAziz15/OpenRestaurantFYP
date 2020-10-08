import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {EditItem} from './edititem'; 
import 'material-design-icons/iconfont/material-icons.css';
import { ResponsiveEmbed } from 'react-bootstrap';
import PropTypes from 'prop-types';
const API = 'http://localhost:4000/restaurantadmin/menu/viewmenu';
const API1 = 'http://localhost:4000/restaurantadmin/item/removeitem/';


class ViewItems extends React.Component
{
  
    state = {
        rest: this.props.rest,
        submenu: [],
        items: [],
        editItemModalShow: false
      };


  componentDidMount = () => {
    console.log(this.state.rest);

  }

  deleteitem(id)
  {
    if(window.confirm('are you sure?')){
      fetch(API1+ id, {
        method:'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      }
      ).then(function(response) {
        if (response.ok) {
          alert('Record Deleted Successfully')
          window.location.reload(false);
          return true;
              } else {
          var error = new Error(response.statusText)
          error.response = response
          throw error
        }
      })
    }
  }

  render()
  {
    const {  item_name, item_price, item_description, item_id } = this.state;
    let editItemModalClose=()=> this.setState({editItemModalShow:false});
    return(
      <div class="container mt-3">
        <div class = "d-flex w-50">
          <h2 class="mb-1">ITEMS MENU</h2>
          {/* <a href = "#" class="mb-1 ml-auto"><i class="material-icons">add</i></a> */}
        </div>
        <hr></hr>
        <div class="list-group">
        {this.state.rest.menu.submenus.map(submenu =>
        
              <a href="#" class="list-group-item list-group-item-action">
                <h4 key={submenu.name}>{submenu.name}</h4>
                {submenu.items.map(item =>
                <div style={{alignContent: 'space-between' }} class="d-flex w-55 ">
                <img src = {item.image} style={{marginRight: '40px' }} width="100" height="100" />
                <div>
                    <h5 class="mb-1" key={item.name}>{item.name}</h5>
                    <p class="mb-1" key={item.price}>{item.price}</p>
                    <small key={item.description}>{item.description}</small>
                </div>
                <div class="ml-auto justify-content-between" style={{ display: 'inline', alignContent: 'space-between'}}>
                  <i class="material-icons" style={{marginRight: '40px' }} onClick={()=>this.setState({editItemModalShow: true, item_name:item.name, item_price:item.price, item_description:item.description, item_id: item._id})}>edit</i>
                  
                  <i class="material-icons" onClick={()=>this.deleteitem(item._id)} >delete</i>
                </div>
                
                <EditItem
                 show={this.state.editItemModalShow}
                 onHide={editItemModalClose}
                 item_name={ item_name }
                 item_price = { item_price }
                 item_description = { item_description }
                 item_id={item_id}>
                </EditItem>
                </div>
                )}
              </a>   
        )}

        
        </div>
      </div>
    );
  }
}

export default ViewItems;


