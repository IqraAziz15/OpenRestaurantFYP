import React from 'react';
import 'antd/dist/antd.css';
import { Card, Col, Row, Divider, Input } from 'antd';

const { Meta } = Card;
const { Search } = Input;

class CLayout extends React.Component
{
    render()
    {
        return(
            <div>
                <div className="site-card-wrapper">
                    <br/><br/>
                    <Search placeholder="input search text" onSearch={value => console.log(value)} enterButton />
                    <Divider orientation = 'left'>All Restaurants</Divider>
                    <Row justify="space-between">
                        <Col span={4}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title="Europe Street beat1" description="www.instagram.com" />
                        </Card>
                        </Col>
                        <Col span={4}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title="Europe Street beat2" description="www.instagram.com" />
                        </Card>
                        </Col>
                        <Col span={4}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title="Europe Street beat3" description="www.instagram.com" />
                        </Card>
                        </Col>
                        <Col span={4}>
                        <Card
                            hoverable
                            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                        >
                            <Meta title="Europe Street beat4" description="www.instagram.com" />
                        </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default CLayout;