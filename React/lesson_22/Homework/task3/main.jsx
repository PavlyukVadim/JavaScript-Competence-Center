import React from 'react';
import ReactDOM from 'react-dom';
import {users} from '../task2/main';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
  }

  tick(e) {
    if(e.target.id) {
      this.props.results[e.target.id].sayHi();
    }
  }

  render() {
    var items = [];
    this.props.results.map(function(result, i) {
      items.push( <tr key={i}>
                    <td id={i}>{result.firstName}</td>
                    <td>{result.lastName}</td>
                    <td>{result.age}</td>
                    <td>{result.gender}</td>
                    <td>{result.signUpDate}</td>
                    <td>{result.id}</td>
                  </tr>);
    })
    return (
      <table onClick={this.tick}>
        <tbody>
          {items}
        </tbody>
      </table>)
  }
}

Counter.defaultProps = {
  results: users
};

var container = document.getElementById('example');
ReactDOM.render(<Counter/>, container);
