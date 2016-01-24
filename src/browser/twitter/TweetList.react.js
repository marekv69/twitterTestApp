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
  }

  render() {
    let tweets = this.props.tweets.map(currentTweet =>
      <Tweet data={currentTweet} key={currentTweet.id}/>
    );

    return (
      <div className="tweet-list">
        <ButtonGroup>
          <DropdownButton disabled title="Sort by date" bsStyle="info" bsSize="xsmall" id="dropdown1">
            <MenuItem eventKey="1">Ascending</MenuItem>
            <MenuItem eventKey="2">Descending</MenuItem>
          </DropdownButton>
          <DropdownButton disabled title="Sort by likes" bsStyle="info" bsSize="xsmall" id="dropdown2">
            <MenuItem eventKey="1">Ascending</MenuItem>
            <MenuItem eventKey="2">Descending</MenuItem>
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

