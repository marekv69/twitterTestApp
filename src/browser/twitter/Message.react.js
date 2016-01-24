import './Message.styl';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';


export default class Message extends Component {

  static propTypes = {
    tweetsResponse: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    var message;
    var tweetResponse = this.props.tweetsResponse;

    if(tweetResponse.hasOwnProperty("standardMessage")) {
      message = <span>{tweetResponse.standardMessage}</span>
    } else {
      message = <span className="error">{tweetResponse.errorMessage}</span>
    }

    return (
      <div className="message">{message}</div>
    );
  }
}

