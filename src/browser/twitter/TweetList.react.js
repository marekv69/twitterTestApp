import './TweetList.styl';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import TweetListButtonGroup from './TweetListButtonGroup.react';
import TweetListFilterBar from './TweetListFilterBar.react';
import TweetListFilteringAndSortingInfo from './TweetListFilteringAndSortingInfo.react';
import TweetListTweetsOutput from './TweetListTweetsOutput.react';
import TweetListModalInfo from './TweetListModalInfo.react.js';


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

    return (
      <div className="tweet-list">
        <TweetListButtonGroup onChangeSorting={this.changeSorting} showModalInfo={this.showModalInfo}/>
        <TweetListFilterBar onChangeFilteringString={this.changeFilteringString} filterString={this.state.filterString}/>
        <TweetListFilteringAndSortingInfo filterString={this.state.filterString} currentSortingProperty=
          {this.state.currentSortingProperty} currentSortingType={this.state.currentSortingType}/>
        <TweetListTweetsOutput currentSortingProperty={this.state.currentSortingProperty} currentSortingType=
          {this.state.currentSortingType} filterString={this.state.filterString} tweets={this.props.tweets}/>
        <TweetListModalInfo tweets={this.props.tweets} showModalInfo={this.state.showModalInfo}
                   closeModalInfoHandler={this._hideModalInfo}/>
      </div>
    );
  }
}
