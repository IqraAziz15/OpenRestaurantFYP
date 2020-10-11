import React,{Component} from 'react';
import RestaurantStatistics from './restaurantstatistics';



function Statistics() {
    return (
      <div className="App">
        <center>

       <div className="chart">
           <RestaurantStatistics/>
       </div>
       </center>
      </div>
    );
  }
  
  export default Statistics;