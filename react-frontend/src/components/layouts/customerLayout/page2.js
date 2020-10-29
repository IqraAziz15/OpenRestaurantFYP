import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'material-design-icons/iconfont/material-icons.css';


class P2Layout extends React.Component
{
    state = {
        // user: this.props.user,
        // rest_id: '5f774deb541bc15338ba36e3',
        rest_id:'',
        rest: '',
        loading: true,
      };

    componentDidMount = async () => {
        var body = JSON.stringify({id : this.props.rest.id});
        const pointerToThis = this;
        await fetch("http://localhost:4000/restaurantadmin/restaurant/getrestaurant/",  {
        method:'POST',
        body,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => pointerToThis.setState({ rest: data, rest_id: data._id, loading: false}));
        console.log(this.state.rest)
        console.log(this.state.rest.menu.submenus)
        console.log(this.state.rest.name)
    }

    render()
    {
        return(
            <div style={{padding: '1.5em 1.5em'}}>
                {this.state.loading ? '' :
                <div>
                    <div href="#" class="list-group-item list-group-item-action">
                        <div style={{alignContent: 'space-between' }} class="d-flex w-55 ">
                            <img src = 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' style={{ margin:'0.75em' }} width="350" height="350" class="rounded-circle"/>
                            <div class="justify-content-between" style={{ display: 'inline', alignContent: 'space-between', marginTop:'7em '}}>
                                <h2  key={this.state.rest.name}>{this.state.rest.name}</h2>
                                <p key={this.state.rest.location}>{this.state.rest.location}</p>
                                <p  class="mb-1" style={{ display: 'block'}}> 
                                    KFC is a leading international fast food brand that specializes in 
                                    the crispy fried chicken and is well known for its zinger burgers.
                                </p>
                            </div>
                            
                        </div>
                    </div>
                <br/>
                <h2>MENU</h2>
                <hr/>
                <div class="list-group">
                    {this.state.rest.menu.submenus.map(submenu =>
                    <div>
                        <div>
                            <h4 key={submenu.name}>{submenu.name}</h4>
                                <hr/>
                        </div>
                        <a href="#" class="list-group-item list-group-item-action">
                            {submenu.items.map(item =>
                            <div>
                                <div style={{alignContent: 'space-between' }} class="d-flex w-55 ">
                                    <img src = {`http://localhost:4000/restaurantadmin/item/image/${item._id}`} style={{marginRight: '40px'}} width="110" height="110" class="rounded-circle"/>
                                    <div>
                                        <h5 class="mb-1" key={item.name}>{item.name}</h5>
                                        <p class="mb-1" key={item.price}>{item.price}</p>
                                        <small key={item.description}>{item.description}</small>
                                    </div>
                                    <div class="ml-auto justify-content-between" style={{ display: 'inline', alignContent: 'space-between'}}>
                                        <i class="material-icons">add_shopping_cart</i>
                                    </div>
                                </div>
                                <hr/>
                            </div> 
                            )}
                        </a>
                        <br/>
                    </div>
                    )} 
                </div>
                </div> 
                }
            </div> 
        )
    }
}

export default P2Layout;