import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';
import TweetList from './TweetList.react';
import ajaxGet from '../lib/ajaxHelper'

export default class Page extends Component {

  static propTypes = {
    msg: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.state = {
      tweets: []
    };
  }


  componentDidMount() {

    ajaxGet("/test?screen_name=sdsadasd&count=50")
      .then(JSON.parse)
      .then((response) => {this.onCorrectResponse(response); })
      .catch((error)=> { this.onErrorResponse(error); });
  }

  onCorrectResponse(response)
  {
    this.setState({tweets: response.tweets});
  }

  onErrorResponse(error)
  {
    console.log(error);
    this.setState({tweets: []});
  }

  render() {
    let tweetsOutput;
    if(this.state.tweets.length > 0){
      tweetsOutput = <TweetList tweets={this.state.tweets} />;
    }
    else {
      tweetsOutput = <div>No data</div>;
    }

    return (
      <div className="twitter-app-page">
        <Helmet title="Twitter app" />
        <h1>Twitter app</h1>
        {tweetsOutput}
      </div>
    );
  }
}
