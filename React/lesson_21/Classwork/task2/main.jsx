var React = require('react');
var ReactDOM = require('react-dom');

var Timer = React.createClass({

  getInitialState: function() {
    return {
      time: 0
    }
  },
  
  componentDidMount: function() {
    setInterval(this.timer, 1000);
  },

  timer: function() {
    this.setState({time: this.state.time + 1});
  },

  render: function() {
    return (
      <h2>{this.state.time}</h2>
    )
  }
})

var container = document.getElementById('example');
ReactDOM.render(<Timer/>, container);