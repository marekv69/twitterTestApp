import './SearchBar.styl';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Input, Button} from 'react-bootstrap';

/**
 * This component is used for searching tweets using Twitter API for a Twitter user
 * It contains <Input> for entering the username and <Button> for confirmation and starting the search
 */
export default class SearchBar extends Component {

  static propTypes = {
    onSearchBarButtonClick : PropTypes.func,
    isGUIDisabledDueToLoading : PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = {
      currentInputValue : ""
    };
    this._handleInputValueChange = this._handleInputValueChange.bind(this);
    this._onButtonClick = this._onButtonClick.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  _handleInputValueChange(event) {
    this.setState({currentInputValue : event.target.value})
  }

  _handleKeyPress(event) {
    if(event.charCode==13){
      event.preventDefault();
      this._onButtonClick();
    }
  }

  _onButtonClick()
  {
    const currentInputValue = this.state.currentInputValue;
    this.props.onSearchBarButtonClick(currentInputValue);
  }

  render() {
    const innerButton =
      <Button
        disabled={this.state.currentInputValue === "" || this.props.isGUIDisabledDueToLoading}
        bsStyle="primary"
        onClick={this._onButtonClick}
        standalone>
        { this.props.isGUIDisabledDueToLoading ? "Loading..." : "Show tweets" }
      </Button>;


    return (
      <div className="search-bar">
        <form>
          <Input
            buttonAfter={innerButton}
            className="searchInput"
            disabled= {this.props.isGUIDisabledDueToLoading}
            onChange={this._handleInputValueChange}
            onKeyPress={this._handleKeyPress}
            placeholder="Type twitter username"
            standalone
            type="text"
            value={this.state.currentInputValue}
          />
        </form>
      </div>
    );
  }
}
