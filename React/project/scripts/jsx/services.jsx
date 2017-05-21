import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link, IndexRoute, hashHistory, Redirect} from 'react-router';
import Design from './views/design.jsx';
import Graphic from './views/graphic.jsx'; 
import Support from './views/support.jsx';  
import App from './views/app.jsx';
import Market from './views/market.jsx'; 
import Seo from './views/seo.jsx';  

class Services extends React.Component {
  render() {
    return (
      <div className='services'>  
        <div className="row"><br/>
          <div className="col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
            <h2>Our Services</h2>
            <img src="images/underline.fw.png" />
          </div>
        </div>
        <div className="row horiz_menu">
        	<Link to="/design"><div className="col-xs-4 col-md-2"><span>Web Designign</span></div></Link>
        	<Link to="/graphic"><div className="col-xs-4 col-md-2"><span>Graphic Design</span></div></Link>
        	<Link to="/support"><div className="col-xs-4 col-md-2"><span>Online Support</span></div></Link>
        	<Link to="/app"><div className="col-xs-4 col-md-2"><span>App Designign</span></div></Link>
        	<Link to="/market"><div className="col-xs-4 col-md-2"><span>Online Marketign</span></div></Link>
        	<Link to="/seo"><div className="col-xs-4 col-md-2"><span>Seo Servicces</span></div></Link>
        </div>
        <div className="row">{this.props.children}</div>
      </div>
  )}
} 

ReactDOM.render(
  <Router history={hashHistory}>
  	<Route path='/' component={Services}> 
      <IndexRoute component={Design} />
      <Route path="design" component={Design} />
      <Route path="graphic" component={Graphic} />
      <Route path="support" component={Support} />
      <Route path="app" component={App} />
      <Route path="market" component={Market} />
      <Route path="seo" component={Seo} />
      <Redirect from="*" to="/"/>
	  </Route>
  </Router>, document.getElementById('our_serv'));
