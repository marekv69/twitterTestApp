import './TwitterListFilterBar.styl';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Input, Button} from 'react-bootstrap';

export default class TweetListFilterBar extends Component {

  static propTypes = {
    onChangeFilteringString : PropTypes.func,
    filterString : PropTypes.string
  };

  constructor(props) {
    super(props);
    this._onButtonClick = this._onButtonClick.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._onInputValueChange = this._onInputValueChange.bind(this);

    this.state = {
      inputValue : ""
    };
  }

  _onButtonClick() {
    this.props.onChangeFilteringString(this.state.inputValue);
    this.setState({
      inputValue : ""
    });
  }

  _handleKeyPress(event) {
    if(event.charCode==13 && this.state.inputValue !== ""){
      this._onButtonClick();
    }
  }

  _onInputValueChange(event){
    this.setState({
      inputValue : event.target.value
    });
  }

  render() {
    const innerButton =
      <Button title="Filter" bsSize="small" bsStyle="info" onClick={this._onButtonClick}>
        {this.props.filterString === "" ? "Use Filter" : "Clear Filter"}
      </Button>;

    return (
      <div className="filter-bar">
        <Input bsSize="small" placeholder={this.props.filterString === "" ? "Write some text and press Enter or use " +
         "Filter button to filter tweets" : "Filter is on. Click Clear Filter button to clear filter"}
          type="text"
          buttonAfter={innerButton}
          disabled = {this.props.filterString !== ""}
          onKeyPress={this._handleKeyPress}
          onChange={this._onInputValueChange}
          value={this.state.inputValue}
        />
      </div>
    );
  }
}
