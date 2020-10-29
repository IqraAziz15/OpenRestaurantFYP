import React, { Component } from "react";
import "antd/dist/antd.css";
import {Rate, Card, Button,Tooltip } from "antd";

class RatingComponent extends Component {
  state = {
    ratings: this.props.ratings,
    count: 102,
    type: this.props.type
  };

  render() {
    return (
      // <div className="rating-card">
        <Card className="rating-unit" size="small"  style={{width: '180px', alignItem: 'left'}}  type={this.state.type} >
          <Rate className="rate"  disabled allowHalf style={{color: '#bb8c63'}}  defaultValue={this.state.ratings} />
           ({this.state.count})
        </Card>
      // </div>
    );
  }
}

export default RatingComponent;

// count: this.props.count,