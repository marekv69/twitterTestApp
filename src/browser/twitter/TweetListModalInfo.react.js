import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Modal,  Button} from 'react-bootstrap';
import {getTweetsInfo} from '../lib/tweetsHelper'


export default class TweetListModalInfo extends Component {

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

    let {numberOfLikes, likesPerTweet, userNamesInTweetsMap} =  getTweetsInfo(this.props.tweets);

    let userNames = null;

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
