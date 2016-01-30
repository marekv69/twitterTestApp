import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Input} from 'react-bootstrap';

export default class FilterInput extends Component {

  static propTypes = {
    onChangeFilteringString: PropTypes.func
  };

  constructor(props) {
    super(props);
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  _handleKeyPress(event) {
    if(event.charCode==13){
      this.props.onChangeFilteringString(event.target.value);
    }
  }

  render() {
    return (
        <Input
          bsSize="small"
          placeholder="Write some text and press Enter to filter in Tweets by this text"
          type="text"
          onKeyPress={this._handleKeyPress}
        />

    );
  }
}
