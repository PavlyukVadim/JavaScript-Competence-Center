﻿var React = require('react');
var ReactDOM = require('react-dom');
var router = require('react-router');
var Router = router.Router;
var Route = router.Route;
var Link = router.Link;
var IndexRoute = router.IndexRoute;
var hashHistory = router.hashHistory;
var View1 = require('./views/view1.jsx');
var View2 = require('./views/view2.jsx');

class App extends React.Component {
  
  render() {
    return (
      <div>
        <div id="container" className="panel well">
          <h1>React Routing Demo!</h1>
          <ul>
            <li>
              <Link to="/view1">
                <button className="btn btn-lg btn-success">View 1</button>
              </Link>
            </li>
            <li>
              <Link to="/view2">
                <button className="btn btn-lg btn-success">View 2</button>
              </Link>
            </li>
          </ul>
        </div>
        <div className="panel">{this.props.children}</div>
      </div>)
  }
}

class Home extends React.Component {
  
  render() {
    return (
      <h3>This is the homepage</h3>
    )
  }
}

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={App}>
      <IndexRoute component={Home}/>
      <Route path="view1" component={View1}/>
      <Route path="view2" component={View2}/>
    </Route>
  </Router>, document.getElementById('app')
);
