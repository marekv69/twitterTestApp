import './Message.styl';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';

/**
 * This component is used for showing message if user has no tweets
 * or gathering tweets using Twitter API finished with an error
 */
export default class Message extends Component {

  static propTypes = {
    tweetsResponse: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  render() {
    const tweetResponse = this.props.tweetsResponse;

    let message;
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


