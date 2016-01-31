import Component from 'react-pure-render/component';
import React  from 'react';
import Helmet from 'react-helmet';
import TweetList from './TweetList.react';
import SearchBar from './SearchBar.react';
import Message from './Message.react';
import ajaxGet from '../lib/ajaxHelper'


/**
 * This class represents the whole component for showing 50 latest tweets of a Twitter user with specified username.
 * It contains <SearchBar> component for searching the username of the Twitter user for
 * who the tweets are shown.
 * It also contains <TweetList> component for showing Tweets of the user or <Message> component
 * if user has no tweets or gathering tweets using Twitter API finished with an error
 */
export default class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tweetsResponse: null,
      areTweetsLoading : false,
      currentUserName : ""
    };

    this.getTweets = this.getTweets.bind(this);
  }

  getTweets(text) {
    this.setState({
      tweetsResponse: null,
      areTweetsLoading : true
    });
    ajaxGet("/user_timeline?screen_name="+text)
      .then(JSON.parse)
      .then((response) => {this.onCorrectResponse(response); })
      .catch((error)=> { this.onErrorResponse(error); });
  }

  onCorrectResponse(response)
  {
    this.setState({
      tweetsResponse: response,
      areTweetsLoading : false
    });
  }

  onErrorResponse(error)
  {
    this.setState({
      tweetsResponse: {errorMessage: error.message},
      areTweetsLoading : false
    });
  }

  render() {
    const tweetsResponse = this.state.tweetsResponse;

    let tweetsSearchOutput = null;
    if(tweetsResponse !== null && tweetsResponse.hasOwnProperty("tweets") ){
      tweetsSearchOutput = <TweetList tweets={tweetsResponse.tweets} />;
    } else if (tweetsResponse !== null &&
      (tweetsResponse.hasOwnProperty("errorMessage") || tweetsResponse.hasOwnProperty("standardMessage"))){
      tweetsSearchOutput = <Message tweetsResponse = {tweetsResponse} />;
    }

    return (
      <div className="twitter-app-page">
        <Helmet title="Twitter app" />
        <h2>Show 50 latest tweets by user name</h2>
        <SearchBar onSearchBarButtonClick={this.getTweets} isGUIDisabledDueToLoading={this.state.areTweetsLoading}/>
        {tweetsSearchOutput}
      </div>
    );
  }
}
