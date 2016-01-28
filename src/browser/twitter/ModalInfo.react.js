import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Modal,  Button} from 'react-bootstrap';


export default class ModalInfo extends Component {

  static propTypes = {
    tweets : PropTypes.array,
    showModalInfo : PropTypes.bool,
    closeModalInfoHandler : PropTypes.func
  };

  constructor(props) {
    super(props);

    this._closeModalInfo = this._closeModalInfo.bind(this);
  }

  _closeModalInfo() {
    this.props.closeModalInfoHandler();
  }

  render() {
    //This line is here because of bug https://phabricator.babeljs.io/T6662
    const {Header: ModalHeader, Body: ModalBody, Footer: ModalFooter, Title : ModalTitle} = Modal;

    var {numberOfLikes, likesPerTweet, userNamesInTweetsMap} =  getTweetsInfo(this.props.tweets);

    var userNames = null;
    if(userNamesInTweetsMap.size > 0) {
      userNames = [];
      userNamesInTweetsMap.forEach( (value, key) => {
        let url = "http://www.twitter.com/"+value.replace('@','');
        userNames.push(<a key={key} href={url} target="_blank">{value}  </a>);
      });

    }

    return (
      <Modal backdrop='static' show={this.props.showModalInfo} onHide={this._closeModalInfo}>
        <ModalHeader closeButton>
          <ModalTitle>Statistics for shown tweets</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div>Number of likes: {numberOfLikes}</div>
          <div>Likes per tweet: {likesPerTweet}</div>
          {userNames !==null ? <div>User names: {userNames}</div> : null}
        </ModalBody>
        <ModalFooter>
          <Button onClick={this._closeModalInfo}>Close</Button>
        </ModalFooter>
      </Modal>
    );
  }
}

function getTweetsInfo(tweets) {
  var numberOfLikes = 0, allTweetsText= "", likesPerTweet;

  tweets.forEach(currentTweet =>{
    numberOfLikes += currentTweet.hasOwnProperty("retweeted_status") ? currentTweet.retweeted_status.favorite_count :
      currentTweet.favorite_count;

    allTweetsText += currentTweet.text;
  });

  likesPerTweet = numberOfLikes / tweets.length;

  return {numberOfLikes, likesPerTweet, userNamesInTweetsMap : getUserNamesInTweetsMapFromTweetsText(allTweetsText)};
}

function getUserNamesInTweetsMapFromTweetsText(allTweetsText) {
  const userNameRegex = /@([\w_]){1,15}/g;
  var userNamesInTweetsMap = new Map();

  for (let actualUser = userNameRegex.exec(allTweetsText); actualUser !== null; actualUser = userNameRegex.exec(allTweetsText)) {

    if (!userNamesInTweetsMap.has(actualUser[0].toLowerCase())) {

      userNamesInTweetsMap.set(actualUser[0].toLowerCase(), actualUser[0]);
    }
  }
  return userNamesInTweetsMap;
}
