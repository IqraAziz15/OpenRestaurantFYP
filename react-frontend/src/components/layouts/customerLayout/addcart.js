import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'material-design-icons/iconfont/material-icons.css';
import Counter from './counter';

class CartLayout extends React.Component
{
    render()
    {
        return(
                <div style={{padding: '1.5em 1.5em'}}>
                    <h2>FOOD CART</h2>
                    <hr/>
                    <div class="list-group">
                        <a href="#" class="list-group-item list-group-item-action">
                            <div style={{alignContent: 'space-between' }} class="d-flex w-55 ">
                                <img src = 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' style={{ margin:'0.75em' }} width="100" height="100"/>
                                <div>
                                    <h5 class="mb-1 mt-2">Club Sandwich</h5>
                                    <small class="mb-2">Grilled chicken with mushroom sauce</small>
                                    <p class="mb-2 mt-1">Ratings</p>
                                    <p  >PKR 570</p>
                                </div>
                                <div class="ml-auto justify-content-between" style={{ display: 'inline'}}>
                                    {/* <i class="material-icons" style={{marginRight: '40px', display:'inline' }} >add_circle_outline</i>
                                    <p style={{display:'inline'}}>4</p>
                                    <i class="material-icons" style={{display:'inline'}}>remove_circle_outline</i> */}
                                    <p>Quantity:</p>
                                    <Counter/>
                                </div>
                            </div>
                        </a>
                    </div>
                    <br/>
                    {/* <div class="form-group">
                        <h6 for="promoarea">Discount Promo(if any)</h6>
                        <textarea class="form-control" rows="3" id="promoarea"></textarea>
                    </div> */}
                    <div><p>Total : Rs.3250</p></div>
                    <button type="button" class="btn btn-success">Continue Shopping</button>


                    
                </div>
        )
    }
}

export default CartLayout;