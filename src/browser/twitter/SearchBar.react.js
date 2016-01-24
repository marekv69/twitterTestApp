import './SearchBar.styl';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Input, Button} from 'react-bootstrap';

export default class SearchBar extends Component {

  static propTypes = {
    onSearchBarButtonClick : PropTypes.func,
    isGUIDisabledDueToLoading : PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      currentInputValue : ""
    }
    this._handleInputValueChange = this._handleInputValueChange.bind(this);
    this._onButtonClick = this._onButtonClick.bind(this);
  }

  _handleInputValueChange(event) {
    this.setState({currentInputValue : event.target.value})
  }

  _onButtonClick()
  {
    var currentInputValue = this.state.currentInputValue;
    this.props.onSearchBarButtonClick(currentInputValue);
  }

  render() {
    return (
      <div className="search-bar">
        <form>
          <Input
            className="input"
            disabled= {this.props.isGUIDisabledDueToLoading}
            onChange={this._handleInputValueChange}
            placeholder="Type twitter username"
            standalone
            type="text"
            value={this.state.currentInputValue}
          />
          <Button
            disabled={this.state.currentInputValue === "" || this.props.isGUIDisabledDueToLoading}
            bsStyle="primary"
            onClick={this._onButtonClick}
            standalone
          >
            { this.props.isGUIDisabledDueToLoading ? "Loading..." : "Show tweets" }
          </Button>
        </form>
      </div>
    );
  }
}
