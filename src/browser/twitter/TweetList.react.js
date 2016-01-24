import './TweetList.styl';
import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import Tweet from 'react-tweet'
import {Input,ButtonGroup, DropdownButton, Button, MenuItem} from 'react-bootstrap';

export default class TweetList extends Component {

  static propTypes = {
    tweets: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      currentSorting : "date",
      currentSortingType : "desc",
      sortedTweets : props.tweets
    };
    this._sortByDate = this._sortByDate.bind(this);
    this._sortByLikes = this._sortByLikes.bind(this);
  }

  _sortByDate(e, sortingType) {
    if(this.state.currentSorting !== "date" || this.state.currentSortingType !== sortingType) {
      let reSortedTweets;

      if(sortingType == "desc") {
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

      if(sortingType == "desc") {
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

  render() {
    let tweets = this.state.sortedTweets.map(currentTweet =>
      <Tweet data={currentTweet} key={currentTweet.id}/>
    );

    return (
      <div className="tweet-list">
        <ButtonGroup>
          <DropdownButton title="Sort by date" bsStyle="info" bsSize="xsmall" id="dropdown1" onSelect={this._sortByDate}>
            <MenuItem eventKey="asc">Ascending</MenuItem>
            <MenuItem eventKey="desc">Descending</MenuItem>
          </DropdownButton>
          <DropdownButton title="Sort by likes" bsStyle="info" bsSize="xsmall" id="dropdown2" onSelect={this._sortByLikes}>
            <MenuItem eventKey="asc">Ascending</MenuItem>
            <MenuItem eventKey="desc">Descending</MenuItem>
          </DropdownButton>
          <Button
            disabled
            bsStyle="success"
            bsSize="xsmall">
            Show modal info
          </Button>
        </ButtonGroup>
        <Input
          bsSize="small"
          disabled
          placeholder="Search in tweets"
          type="text"

          //TODO: search in tweets
          //onChange={this.handleChange}
        />
        {tweets}
      </div>
    );
  }
}

