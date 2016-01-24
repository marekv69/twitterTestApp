import Component from 'react-pure-render/component';
import React  from 'react';
import Helmet from 'react-helmet';
import TweetList from './TweetList.react';
import SearchBar from './SearchBar.react';
import ajaxGet from '../lib/ajaxHelper'

export default class Page extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
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
      tweets: response.tweets,
      areTweetsLoading : false
    });
  }

  onErrorResponse(error)
  {
    console.log(error);
    this.setState({
      tweets: [],
      areTweetsLoading : false
    });
  }

  render() {
    let tweetsOutput;
    if(this.state.tweets.length > 0){
      tweetsOutput = <TweetList tweets={this.state.tweets} />;
    }
    else {
      tweetsOutput = <div>No data</div>;
    }
    console.log(typeof this.getTweets);
    return (

      <div className="twitter-app-page">
        <Helmet title="Twitter app" />
        <h1>Twitter app</h1>
        <SearchBar onSearchBarButtonClick={this.getTweets} isGUIDisabledDueToLoading={this.state.areTweetsLoading}/>
        {tweetsOutput}
      </div>
    );
  }
}
