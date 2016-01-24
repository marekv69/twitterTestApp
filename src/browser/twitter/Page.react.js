import Component from 'react-pure-render/component';
import React  from 'react';
import Helmet from 'react-helmet';
import TweetList from './TweetList.react';
import SearchBar from './SearchBar.react';
import Message from './Message.react';
import ajaxGet from '../lib/ajaxHelper'

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
    this.setState({areTweetsLoading : true});
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
    var tweetsSearchOutput = null;
    var tweetsResponse = this.state.tweetsResponse;

    if(tweetsResponse !== null && tweetsResponse.hasOwnProperty("tweets") ){
      tweetsSearchOutput = <TweetList tweets={tweetsResponse.tweets} />;
    } else if (tweetsResponse !== null &&
      (tweetsResponse.hasOwnProperty("errorMessage") || tweetsResponse.hasOwnProperty("standardMessage"))){
      tweetsSearchOutput = <Message tweetsResponse = {tweetsResponse} />;
    }

    return (
      <div className="twitter-app-page">
        <Helmet title="Twitter app" />
        <h1>Twitter app</h1>
        <SearchBar onSearchBarButtonClick={this.getTweets} isGUIDisabledDueToLoading={this.state.areTweetsLoading}/>
        {tweetsSearchOutput}
      </div>
    );
  }
}
