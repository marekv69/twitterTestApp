import './TweetList.styl';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import Tweet from 'react-tweet'
import ModalInfo from './ModalInfo.react'
import {Input,ButtonGroup, DropdownButton, Button, MenuItem, Label} from 'react-bootstrap';

export default class TweetList extends Component {

  static propTypes = {
    tweets: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      currentSorting : "date",
      currentSortingType : "descending",
      sortedTweets : props.tweets,
      filterString : "",
      showModalInfo : false
    };
    this._sortByDate = this._sortByDate.bind(this);
    this._sortByLikes = this._sortByLikes.bind(this);
    this._showModalInfo = this._showModalInfo.bind(this);
    this._hideModalInfo = this._hideModalInfo.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
  }

  _sortByDate(e, sortingType) {
    if(this.state.currentSorting !== "date" || this.state.currentSortingType !== sortingType) {
      let reSortedTweets;

      if(sortingType == "descending") {
        reSortedTweets= this.state.sortedTweets.sort((a,b)=>(
          new Date(b.created_at) - new Date(a.created_at)
        ));
      }else{
        reSortedTweets = this.state.sortedTweets.sort((a,b)=>(
          new Date(a.created_at) - new Date(b.created_at)
        ));
      }
      this.setState(
        {
          currentSorting : "date",
          currentSortingType : sortingType,
          sortedTweets : reSortedTweets
        }
      );
    }
  }

  _sortByLikes(e, sortingType) {
    if(this.state.currentSorting !== "likes" || this.state.currentSortingType !== sortingType) {
      let reSortedTweets;

      if(sortingType == "descending") {
        reSortedTweets= this.state.sortedTweets.sort((a,b)=>{
          let aFavorite_count = a.hasOwnProperty("retweeted_status") ? a.retweeted_status.favorite_count :
            a.favorite_count;
          let bFavorite_count = b.hasOwnProperty("retweeted_status") ? b.retweeted_status.favorite_count :
            b.favorite_count;

          return bFavorite_count - aFavorite_count;
        });
      }else{
        reSortedTweets = this.state.sortedTweets.sort((a,b)=> {
          let aFavorite_count = a.hasOwnProperty("retweeted_status") ? a.retweeted_status.favorite_count :
            a.favorite_count;
          let bFavorite_count = b.hasOwnProperty("retweeted_status") ? b.retweeted_status.favorite_count :
            b.favorite_count;

          return aFavorite_count - bFavorite_count;
        });
      }
      this.setState(
        {
          currentSorting : "likes",
          currentSortingType : sortingType,
          sortedTweets : reSortedTweets
        }
      );
    }
  }

  _showModalInfo() {
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
    var tweets, filterRegex;
    var filterRegex = this.state.filterString !== "" ? new RegExp(this.state.filterString, "i") : null;

    tweets = this.state.sortedTweets
      .reduce((arrayWithTweets, currentTweet) => {
        if (filterRegex === null || filterRegex.test(currentTweet.text)) {
          arrayWithTweets.push(<Tweet data={currentTweet} key={currentTweet.id}/>);
        }
        return arrayWithTweets;
      }, []);


    return (
      <div className="tweet-list">
        <ButtonGroup>
          <DropdownButton title="Sort by date" bsStyle="info" bsSize="xsmall" id="dropdown1" onSelect={this._sortByDate}>
            <MenuItem eventKey="ascending">Ascending</MenuItem>
            <MenuItem eventKey="descending">Descending</MenuItem>
          </DropdownButton>
          <DropdownButton title="Sort by likes" bsStyle="info" bsSize="xsmall" id="dropdown2" onSelect={this._sortByLikes}>
            <MenuItem eventKey="ascending">Ascending</MenuItem>
            <MenuItem eventKey="descending">Descending</MenuItem>
          </DropdownButton>
          <Button
            bsStyle="success"
            bsSize="xsmall"
            onClick={this._showModalInfo}
          >
            Show modal info
          </Button>
        </ButtonGroup>
        <Input
          bsSize="small"
          placeholder="Write some text and press Enter to filter in Tweets by this text"
          type="text"
          onKeyPress={this._handleKeyPress}
        />
        <div>
          {this.state.filterString !== "" ?
         <span>Only tweets containing <Label bsStyle="warning">{this.state.filterString}</Label> are shown. </span> : null}
          Sorted by <Label bsStyle="info">{this.state.currentSorting} {this.state.currentSortingType}</Label> :
        </div>
        {tweets.length > 0 ? tweets :
          <div>There are no tweets containing <Label bsStyle="warning">{this.state.currentSorting}</Label></div>}
        <ModalInfo tweets={this.state.sortedTweets} showModalInfo={this.state.showModalInfo}
                   closeModalInfoHandler = {this._hideModalInfo}/>
      </div>
    );
  }
}

