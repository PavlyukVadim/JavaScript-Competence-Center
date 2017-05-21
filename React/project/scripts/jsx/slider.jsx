var React = require('react');
var ReactDOM = require('react-dom'); 
var Slider = require('react-slick');

var MySlider = React.createClass({

  render: function() {
    var settings = {
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: true,
      infinite: true,
      speed: 500,
      pauseOnHover: false,
      prevArrow: <LeftNavButton />,
      nextArrow: <RightNavButton />
    };

    return (
      <div className='slider'>
        <Slider {...settings}>
          <div><img src='images/1.JPG' className='img-responsive'/></div>
          <div><img src='images/2.JPG' className='img-responsive'/></div>
          <div><img src='images/3.JPG' className='img-responsive'/></div>
        </Slider>
        <div id="inslide">
          <div className="row">
            <div className="col-sm-4 col-xs-2 arr" >
            </div>
            <div id="slide_caption" className="col-sm-4 col-xs-8">
              <h4>The hum is<span> a psd template</span></h4>
              <h1 id="slogan">We are creative</h1>
              <a href="#work_anch" ><div className="btn butt">EXPLORE  NOW</div></a>
              <a href="#cont_anch" ><div className="btn butt">PURCHASE NOW</div></a>
            </div>
            <div className="col-sm-4 col-xs-2 arr" >
            </div>
          </div>
        </div>
      </div>
    );
  }
});

class LeftNavButton extends React.Component {
  render() {
    return <button {...this.props} className='btn' id='l_butt'><img src='images/l_arr.fw.png'/></button>  
  }
}

class RightNavButton extends React.Component{
  render() {
    return <button {...this.props} className='btn' id='r_butt'><img src='images/r_arr.fw.png'/></button>  
  }
}

ReactDOM.render(
  <MySlider />, document.getElementById('slider')
);
