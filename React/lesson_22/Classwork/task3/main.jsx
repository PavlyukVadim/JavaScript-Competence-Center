import React from 'react';
import ReactDOM from 'react-dom';

class Counter extends React.Component {
  
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
  }

  tick() {
    var ul = document.getElementsByTagName('ul')[0];
    for (var prop in this.props) {
      var li = document.createElement('li');
      li.innerHTML = prop +': '+ this.props[prop];
      ul.appendChild(li);
    }
  }

  render() {
    return (
      <div>
        <button className='btn-lg' onClick={this.tick}>Click me to see my properties</button>
        <ul></ul>
      </div>);
  }
}

var container = document.getElementById('example');
ReactDOM.render(<Counter name='react_button' id='my_butt'/>, container);
