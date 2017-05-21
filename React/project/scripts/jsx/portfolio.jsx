import React from 'react';
import ReactDOM from 'react-dom';

class Portfolio extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'All',
      z_index : -1
    };
    this.tick = this.tick.bind(this);
    this.hideMask = this.hideMask.bind(this);
    this.showMask = this.showMask.bind(this);
  } 

  hideMask(e) {
    e.target.style.visibility = 'hidden';
  }

  showMask(e){
    e.target.previousElementSibling.style.visibility = 'visible';
  }
     
  tick(e) { 
    if(e.target.id) {
        switch(e.target.id) {
            case '0':
              this.setState({ category: "All"})
              break;
            case '1':
              this.setState({ category: "Graphic Design"})
              break;
            case '2':
              this.setState({ category: "Web Designign"})
              break;
            case '3':
              this.setState({ category: "Landing pages"})
              break;
            case '4':
              this.setState({ category: "Wordpress"})
              break;
      }
    }
  }

  render() {
    var items = [];
    for (var i = 0; i < 12; i++) {
      var path = `images/portfolio/${this.state.category}/${i}.png`;
      items.push(
        <div className="col-xs-3" key={i}>
          <div onMouseLeave={this.hideMask} className='mask'>
            <span>{this.state.category}</span>
          </div>
          <img onMouseOver={this.showMask} className="img-responsive" src={path}/>
        </div>);
    }

    return (
      <div className='services'>
        <div className="row"><br/>
          <div className="col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1">
            <h2>Our Amazing Work</h2>
            <img src="images/underline.fw.png" />
          </div>
        </div>
        <div className="row horiz_menu" onClick={this.tick}>
          <span className="col-xs-4 col-sm-2 col-sm-offset-1"><div id='0'><span id='0'>All</span></div></span>
          <div className="col-xs-4 col-sm-2" id='1'><span id='1'>Graphic Design</span></div>
          <div className="col-xs-4 col-sm-2" id='2'><span id='2'>Web Designign</span></div>
          <div className="col-xs-6 col-sm-2" id='3'><span id='3'>Landing pages</span></div>
          <div className="col-xs-6 col-sm-2" id='4'><span id='4'>Wordpress</span></div>
        </div>
        <div className="row">
          <div className=" col-xs-12 col-sm-8 col-sm-offset-2" id='gallery'>
            {items}
          </div>
        </div>
      </div>)
  }
} 

ReactDOM.render(<Portfolio/>, document.getElementById('portfolio'));
