import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const API = 'http://localhost:4000/restaurantadmin/item/additem';

class additem extends React.Component {

    constructor(props) {
        super(props);
        this.additem = this.additem.bind(this);
        this.refresh=this.refresh.bind(this);
        this.initialState = {
            name:'',
            price:'',
            decription:'',
            image:'',
            counter:0
        }
    }

    refresh=()=>{
        this.setState({counter:this.state.counter++});
    };

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    additem(e) {
        e.preventDefault();
    
        let { name, price, description, image } = this.state;
    
        let data = {
          name,
          price,
          description,
          image
        };
        fetch(API, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
            "Content-Type": "application/json"
        }}).then(function(response) {
          if (response.ok) {
            alert('Item Added Successfully')    
          } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
          }
        })
      this.refresh();
    }

    render() {
        return (
            <div class="container mt-5">
                <center><h2>Add New Item</h2></center>
                <form name="addform" action="/additem" enctype="multipart/form-data">
                    <div class = "form-group">
                        <label for="name">Item Name</label>
                        <input class="form-control" type="text" ref="name" name="name" placeholder="Enter name" onChange={this.onChange} id="name"/>
                    </div>

                    <div class = "form-group">
                        <label for="price">Item Price</label>
                        <input class="form-control" type="text" ref="price" name="price" placeholder="Enter price" onChange={this.onChange} id="price"/>
                    </div>
                    <div class = "form-group">
                        <label for="description">Item Description</label>
                        <input class="form-control" type="text" ref="description" name="description" placeholder="Enter description" onChange={this.onChange} id="description"/>
                    </div>
                    <br/>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" ref="image" name="image" id="customFile"/>
                        <label class="custom-file-label" for="customFile">Choose file</label>
                    </div>
                    <br/> <br/> 
                    
                    <div class = "form-group">
                    <button type="submit" class="btn btn-dark" onClick={this.additem}>Submit</button>
                    </div>
                    {/* <input type="hidden" ref="hid" value={this.state.counter}></input> */}
                </form>
            </div>
        );
    }
}

export default additem;