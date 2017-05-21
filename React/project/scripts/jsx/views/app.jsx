import React from 'react';
import {Link} from 'react-router';

class App extends React.Component {

	constructor(props) {
    super(props) 
  }

  render() {
    return (
      <div>
      	<div className='col-xs-2'>
        	<img className='img-responsive' src='images/services/0.png'/>
        </div>
        <div className='col-xs-10 text_left'>
          <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac diam feugiat, blandit nisl sit amet, fringilla enim. Integer consectetur ligula in sagittis accumsan. In ullamcorper volutpat maximus. Praesent facilisis tortor eu sapien sagittis eleifend. Curabitur vulputate, lorem in fringilla porta, odio odio posuere velit, condimentum consequat ligula sapien ut ex. Maecenas commodo ex sed odio ultrices porta.</span>
        </div>
      </div>
    );
  }
}

export default App;
