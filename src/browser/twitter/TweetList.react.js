import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import Tweet from 'react-tweet'

export default class TweetList extends Component {

  static propTypes = {
    tweets: PropTypes.array
  };

  constructor(props) {
    super(props);
  }

  render() {
    let tweets = this.props.tweets.map(currentTweet =>
      <Tweet data={currentTweet} key={currentTweet.id}/>
    );

    return (
      <div className="tweet-list">
        {tweets}
      </div>
    );
  }
}

