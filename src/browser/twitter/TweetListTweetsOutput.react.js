import './TweetListTweetsOutput.styl';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import Tweet from 'react-tweet';
import {Label} from 'react-bootstrap';
import {createSortedTweets} from '../lib/tweetsHelper';


/**
 * This component shows (sorted/filtered) tweets using <Tweet> component for each of them. If filtering is turned on
 * and no tweets exist for the filter string the appropriate message is shown instead of tweets
 */
export default class TweetListTweetsOutput extends Component {

  static propTypes = {
    currentSortingProperty : PropTypes.string,
    currentSortingType  : PropTypes.string,
    filterString : PropTypes.string,
    tweets: PropTypes.array
  };

  constructor(props) {
    super(props);
  }


  render() {
    const filterRegex = this.props.filterString !== "" ? new RegExp(this.props.filterString, "i") : null;

    var sortedTweets = createSortedTweets(this.props.tweets, this.props.currentSortingProperty, this.props.currentSortingType);

    let filteredTweets = sortedTweets
      .reduce((arrayWithTweets, currentTweet) => {
        if (filterRegex === null || filterRegex.test(currentTweet.text)) {
          arrayWithTweets.push(<Tweet data={currentTweet} key={currentTweet.id}/>);
        }
        return arrayWithTweets;
      }, []);

    let tweetsOutput =
      filteredTweets.length > 0 ? filteredTweets :
        <span className="noTweetsMessage">There are no tweets containing <Label bsStyle="warning">{this.props.filterString}</Label></span>;

    return (
      <div className="tweets-output">
        {tweetsOutput}
      </div>
    );
  }
}

