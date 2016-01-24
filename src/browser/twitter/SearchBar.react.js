import './SearchBar.styl';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Input, Button} from 'react-bootstrap';

export default class SearchBar extends Component {

  static propTypes = {
    //tweets: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      isButtonDisabled : true,
      currentInputValue: ""
    }
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
  }

  handleInputValueChange(event) {
    if(event.target.value === "") {
      this.setState({isButtonDisabled : true});
    } else {
      this.setState({isButtonDisabled : false});
    }
    console.log(this.state.isButtonDisabled);
    this.setState({currentInputValue : event.target.value})
  }

  render() {
    let input = <Input
      className="input"
      onChange={this.handleInputValueChange}
      placeholder="Type twitter username"
      standalone
      type="text"
      value={this.state.currentInputValue}/>;

    let confirmationButton = <Button
      disabled={this.state.isButtonDisabled}
      bsStyle="primary"
      standalone>
      Show tweets
    </Button>;


    return (
      <div className="search-bar">
        <form>
          {input}
          {confirmationButton}
        </form>
      </div>
    );
  }
}
