import './TweetList.styl';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import Tweet from 'react-tweet'
import TweetListButtonGroup from './TweetListButtonGroup.react';
import ModalInfo from './ModalInfo.react'
import {Input, Button, Label} from 'react-bootstrap';
import {createSortedTweets} from '../lib/tweetsHelper'

export default class TweetList extends Component {

  static propTypes = {
    tweets: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      currentSortingProperty : "date",
      currentSortingType : "descending",
      filterString : "",
      showModalInfo : false
    };
    this.changeSorting = this.changeSorting.bind(this);
    this.showModalInfo = this.showModalInfo.bind(this);
    this._hideModalInfo = this._hideModalInfo.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  changeSorting(currentSortingProperty, currentSortingType) {
    this.setState({
      currentSortingProperty,
      currentSortingType
    });
  }

  showModalInfo() {
    this.setState({
      showModalInfo : true
    });
  }

  _hideModalInfo() {
    this.setState({
      showModalInfo : false
    });
  }

  _handleKeyPress(event) {
    if(event.charCode==13){
      event.preventDefault();
      this.setState({
        filterString : event.target.value
      });
    }
  }

  render() {
    console.log("render");

    const filterRegex = this.state.filterString !== "" ? new RegExp(this.state.filterString, "i") : null;

    var sortedTweets = createSortedTweets(this.props.tweets, this.state.currentSortingProperty, this.state.currentSortingType);

    let filteredTweets = sortedTweets
      .reduce((arrayWithTweets, currentTweet) => {
        if (filterRegex === null || filterRegex.test(currentTweet.text)) {
          arrayWithTweets.push(<Tweet data={currentTweet} key={currentTweet.id}/>);
        }
        return arrayWithTweets;
      }, []);

    return (
      <div className="tweet-list">
        <TweetListButtonGroup onChangeSorting={this.changeSorting} showModalInfo={this.showModalInfo}/>
        <Input
          bsSize="small"
          placeholder="Write some text and press Enter to filter in Tweets by this text"
          type="text"
          onKeyPress={this._handleKeyPress}
        />
        <div>
          {this.state.filterString !== "" ?
            <span>Only tweets containing <Label
              bsStyle="warning">{this.state.filterString}</Label> are shown. </span> : null}
          Sorted by <Label bsStyle="info">{this.state.currentSortingProperty} {this.state.currentSortingType}</Label> :
        </div>
        {filteredTweets.length > 0 ? filteredTweets :
          <div>There are no tweets containing <Label bsStyle="warning">{this.state.filterString}</Label>
          </div>}
        <ModalInfo tweets={this.props.tweets} showModalInfo={this.state.showModalInfo}
                   closeModalInfoHandler={this._hideModalInfo}/>
      </div>
    );
  }
}
