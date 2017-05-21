var React = require('react'); 
var ReactDOM = require('react-dom'); 

import CountTo from 'react-count-to';
var Counter = React.createClass({
  render: function() {
    return (
      <div id="statistic">
        <div className="row">
          <div className="col-sm-3 col-xs-6 odd">
            <img src="images/work.fw.png"/><br/><br/>
            <h3 id='works'><CountTo to={4609} speed={3000}/></h3>
            <span>Works</span>
          </div>
          <div className="col-sm-3 col-xs-6 even">
            <img src="images/cust.fw.png"/><br/><br/>
            <h3 id='customers'><CountTo to={3470} speed={3000}/></h3>
            <span>Customers</span>
          </div>
          <div className="col-sm-3 col-xs-6 odd">
            <img src="images/purch.fw.png"/><br/><br/>
            <h3 id='purchase'><CountTo to={2908} speed={3000}/></h3>
            <span>Purchase</span>
          </div>
          <div className="col-sm-3 col-xs-6 even">
            <img src="images/office.fw.png"/><br/><br/>
            <h3 id='office'><CountTo to={1908} speed={3000}/></h3>
            <span>Office</span>
          </div>
        </div>
      </div>
    )
  }
});

var container = document.getElementById('statistics');
ReactDOM.render(<Counter/>, container);
