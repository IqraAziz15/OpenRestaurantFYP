import React from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import * as d3 from 'd3';

class Graph extends React.Component
{
    state = {
      items : []
    }

    componentWillMount = () =>
    {
        var body = {
            rest_id: '5f96d3905cb98c2e4816eb33'
          }
          const config = {
            headers: {
              'Content-Type': 'application/json'
            }
          };
          // var pointerToThis = this;
          // axios.post('http://localhost:4000/customer/order/getordersCSV/5f96d3905cb98c2e4816eb33', body, config)
          //   .then(res => {
          //     console.log(res)
              // d3.csv(res.data)
              // .then(function(data) {
              //     // data is now whole data set
              //     console.log(data[0])
              // })
              // .catch(function(error){
              //   // handle error   
              // })
              // var data = d3.csv('http://localhost:4000/customer/order/getordersCSV/5f96d3905cb98c2e4816eb33')
              // console.log(data)
            //   csv(res.data).then(function(data) 
            //   {console.log(this.state.ItemName)}).
            //   pointerToThis.setState({ items: res.data, loading: false })
            // } ,[],console.log(this.state.ItemName))
            // .then(res=>{
            //   csv(res.data).then(function(data) 
            //   {console.log(this.state.ItemName)})
            //   .catch(function(err) {
            //     throw err;
            //   })
            // })
            // .catch(err => console.log(err))
            d3.csv('http://localhost:4000/customer/order/getordersCSV/5f96d3905cb98c2e4816eb33').then((data)=>{
              console.log(data)
              this.setState({ items: data})
            })
           
            
          }

    row = (r)=>
    {
      r=+r
      return r
    }

    

    render()
    {
     
      var iname = outputArray.map(function(d) {return d.ItemName});

      var outputArray = [];  
      var count = 0; 
      var start = false; 
      for (var j = 0; j < this.state.items.length; j++) { 
        for (var k = 0; k < outputArray.length; k++) { 
            if ( this.state.items[j] == outputArray[k] ) { 
                start = true; 
            } 
        } 
        count++; 
        if (count == 1 && start == false) { 
            outputArray.push(this.state.items[j]); 
        } 
        start = false; 
        count = 0; 
    } 

    
      var iprice = this.state.items.map(function(d) {return +d.ItemPrice});
      const data = {
        labels: iname,
        datasets: [
          {
            label: 'Item Price',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 2,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: iprice
          }
        ]
      };
      
      return(
        <div>
            <h2>Bar Example (custom size)</h2>
            <Bar
              data={data}
              width={100}
              height={50}
              options={{
                // maintainAspectRatio: false
              }}
            />
            {/* <Bar
              data={this.state.chartData}
              options={{
                title:{
                  display:this.props.displayTitle,
                  text:'Largest Cities In '+this.props.location,
                  fontSize:25
                },
                legend:{
                  display:this.props.displayLegend,
                  position:this.props.legendPosition
                }
              }}
            /> */}
        </div>
      );
    }
}

export default Graph;