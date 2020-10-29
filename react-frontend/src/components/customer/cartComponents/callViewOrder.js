import React from 'react';
import {useParams} from "react-router-dom";
import Orderhistory from './vieworder';

function ViewOrder() {

    const { random } = useParams();
    console.log(random);

    return (
        <div>
            <Orderhistory random={random} />
        </div>
    );
}

export default ViewOrder;