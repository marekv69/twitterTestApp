import './TweetList.styl';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import Tweet from 'react-tweet';
import TweetListButtonGroup from './TweetListButtonGroup.react';
import TweetListFilterBar from './TweetListFilterBar.react.js';
import ModalInfo from './ModalInfo.react';
import {Input, Button, Label} from 'react-bootstrap';
import {createSortedTweets} from '../lib/tweetsHelper';



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
    this.changeFilteringString = this.changeFilteringString.bind(this);
    this.showModalInfo = this.showModalInfo.bind(this);
    this._hideModalInfo = this._hideModalInfo.bind(this);
  }

  changeSorting(currentSortingProperty, currentSortingType) {
    this.setState({
      currentSortingProperty,
      currentSortingType
    });
  }

  changeFilteringString(newFilterString) {
    this.setState({
      filterString : newFilterString
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

  render() {
    const filterRegex = this.state.filterString !== "" ? new RegExp(this.state.filterString, "i") : null;

    var sortedTweets = createSortedTweets(this.props.tweets, this.state.currentSortingProperty, this.state.currentSortingType);

    let filteredTweets = sortedTweets
      .reduce((arrayWithTweets, currentTweet) => {
        if (filterRegex === null || filterRegex.test(currentTweet.text)) {
          arrayWithTweets.push(<Tweet data={currentTweet} key={currentTweet.id}/>);
        }
        return arrayWithTweets;
      }, []);

    let filteringInfoOutput =
      this.state.filterString !== "" ? <span>Only tweets containing <Label
        bsStyle="warning">{this.state.filterString}</Label> are shown. </span> : null;

    let sortingInfoOutput =
      <span>Sorted by <Label bsStyle="info">
      {this.state.currentSortingProperty} {this.state.currentSortingType}</Label> :</span>;

    let tweetsOutput =
      filteredTweets.length > 0 ? filteredTweets :
        <div>There are no tweets containing <Label bsStyle="warning">{this.state.filterString}</Label></div>;

    return (
      <div className="tweet-list">
        <TweetListButtonGroup onChangeSorting={this.changeSorting} showModalInfo={this.showModalInfo}/>
        <TweetListFilterBar onChangeFilteringString={this.changeFilteringString} filterString={this.state.filterString}/>
        <div>
          {filteringInfoOutput}
          {sortingInfoOutput}
        </div>
        {tweetsOutput}
        <ModalInfo tweets={this.props.tweets} showModalInfo={this.state.showModalInfo}
                   closeModalInfoHandler={this._hideModalInfo}/>
      </div>
    );
  }
}
