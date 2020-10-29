import React, { Component } from "react";
import "antd/dist/antd.css";
import "./review.css";
import { Card, Button,Tooltip } from "antd";
import { DislikeOutlined, LikeOutlined } from "@ant-design/icons";

class ReviewComponent extends Component {
  state = {
    likes: this.props.likes,
    dislikes: this.props.dislikes,
    review: this.props.review,
  };

  render() {
    return (
      <div className="review-card">
        <Card className="card-review">
          <h4>
            <Tooltip title="Like">
              <Button shape="omitted" icon={<LikeOutlined />}> {this.state.likes}</Button>
            </Tooltip>
            <Tooltip title="Dislike">
              <Button shape="omitted" icon={<DislikeOutlined />}> {this.state.dislikes} </Button>
            </Tooltip>
          </h4>
          <p className="content">
            {this.state.review}
            </p>
        </Card>
      </div>
    );
  }
}

export default ReviewComponent;
