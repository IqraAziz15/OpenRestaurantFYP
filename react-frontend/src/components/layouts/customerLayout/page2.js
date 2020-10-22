import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


class P2Layout extends React.Component
{
    state = {
        // user: this.props.user,
        rest_id: '5f440be730c1d32db0b96172',
        rest: '',
      };

    componentDidMount = async () => {
        // var body = JSON.stringify({rid : this.state.user.id});
        const pointerToThis = this;
        await fetch("http://localhost:4000/restaurantadmin/restaurant/findrestaurant/",  {
        method:'POST',
        // body,
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => pointerToThis.setState({ rest_id: '5f440be730c1d32db0b96172'}));
        console.log(this.state.rest_id)
    }

    render()
    {
        return(
            <div style={{padding: '1.5em 1.5em'}}>
                <div href="#" class="list-group-item list-group-item-action">
                    <div style={{alignContent: 'space-between' }} class="d-flex w-55 ">
                        <img src = 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' style={{marginRight: '40px' }} width="400" height="500" />
                        <div class="justify-content-between" style={{ display: 'inline', alignContent: 'space-between', marginTop:'12em '}}>
                            <h2  class="mb-1" >KFC</h2>
                            <p  class="mb-1" style={{ display: 'block'}}> 
                                KFC is a leading international fast food brand that specializes in 
                                the crispy fried chicken and is well known for its zinger burgers.
                            </p>
                        </div>
                    </div>
                </div>
                <br/>
                <div href="#" class="list-group-item list-group-item-action">
                    <h2>MENU</h2>
                    <hr/>
                    <div>
                        <h4>SUBMENU NAME</h4>
                        <hr/>
                    </div>
                    <div style={{alignContent: 'space-between' }} class="d-flex w-55 ">
                        <img src = 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' style={{marginRight: '40px' }} width="250" height="350" />
                        <div class="justify-content-between" style={{ display: 'inline', alignContent: 'space-between'}}>
                            <h2  class="mb-1" >ITEM 1 NAME</h2>
                            <p  class="mb-1" style={{ display: 'block'}}>
                                ITEM DESCRIPTION 
                                KFC is a leading international fast food brand that specializes in 
                                the crispy fried chicken and is well known for its zinger burgers.
                            </p>
                            <p class="mb-1">
                                ITEM PRICE
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default P2Layout;