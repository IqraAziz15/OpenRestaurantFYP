import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
const API = 'http://localhost:4000/restaurantadmindeal/adddeal';

class adddeal extends React.Component {

    constructor(props) {
        super(props);
        this.adddeal = this.adddeal.bind(this);
        this.refresh=this.refresh.bind(this);
        this.initialState = {
            name:'',
            total_bill:'',
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

    adddeal(e) {
        e.preventDefault();
    
        let { name, total_bill, description, image } = this.state;
    
        let data = {
          name,
          total_bill,
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
            alert('Deal Added Successfully')    
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
                <center><h2>Add New Deal</h2></center>
                <form name="addform" action="/adddeal" enctype="multipart/form-data">
                    <div class = "form-group">
                        <label for="name">Deal Name</label>
                        <input class="form-control" type="text" ref="name" name="name" placeholder="Enter name" onChange={this.onChange} id="name"/>
                    </div>

                    <div class = "form-group">
                        <label for="total_bill">Deal total_bill</label>
                        <input class="form-control" type="text" ref="total_bill" name="total_bill" placeholder="Enter total_bill" onChange={this.onChange} id="total_bill"/>
                    </div>
                    <div class = "form-group">
                        <label for="description">Deal Description</label>
                        <input class="form-control" type="text" ref="description" name="description" placeholder="Enter description" onChange={this.onChange} id="description"/>
                    </div>
                    <br/>
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" ref="image" name="image" id="customFile"/>
                        <label class="custom-file-label" for="customFile">Choose file</label>
                    </div>
                    <br/> <br/> 
                    
                    <div class = "form-group">
                    <button type="submit" class="btn btn-dark" onClick={this.adddeal}>Submit</button>
                    </div>
                    {/* <input type="hidden" ref="hid" value={this.state.counter}></input> */}
                </form>
            </div>
        );
    }
}

export default adddeal;