var React = require('react'); 
var ReactDOM = require('react-dom'); 

var MyForm = React.createClass({
  getInitialState: function () {
    return {
      name_cls: 'valid',
      email_cls: 'valid',
      message_cls: 'valid' 
    }
  },

  render: function() {
    return (
      <div className='row map-row'>
        <div className='col-md-7 col-xs-12'></div>
        <div className='col-md-5 col-xs-12'>
            <div className='center'>
              <h2>Keep In Touch</h2>
              <img src="images/underline.fw.png" />
            </div>
            <form>
              <br></br>
              <div className="form-group">
                <input onInput={this.nameChange} type="text" className="form-control" placeholder="Name"></input>
                <p className={this.state.name_cls}>Only letters allowed!</p>
                <input onInput={this.emailChange} type="text" className="form-control" placeholder="Email"></input>
                <p className={this.state.email_cls}>Letters, numbers, @, _, ., are allowed!</p>
                <textarea rows="4" onInput={this.messageChange} className="form-control" placeholder="Message"></textarea>
                <p className={this.state.message_cls}>Minimal length of message 20 symbols!</p>
                 <button className="btn butt" id='submitt'>SEND REQUEST</button>
              </div>
            </form>
        </div>
      </div>
  )},

  nameChange: function(e) { 
    var testVal = /^[a-zA-Z ]+$/;
    if (e.target.value.search(testVal) == -1) {
      this.setState({name_cls: 'error'}); 
    } else {
      this.setState({name_cls: 'valid'});
    }
  },

  emailChange: function(e) { 
    var testVal = /^[a-zA-Z0-9_@.]+$/;
    if (e.target.value.search(testVal) == -1) {
      this.setState({email_cls: 'error'}); 
    } else {
      this.setState({email_cls: 'valid'});
    }
  },

  messageChange: function(e) { 
    var testVal = /^.{0,19}$/;
    if (e.target.value.search(testVal) != -1) {
      this.setState({message_cls: 'error'}); 
    } else {
      this.setState({message_cls: 'valid'});
    }
  }
})

var container = document.getElementById('my_form');
ReactDOM.render(<MyForm/>, container);
