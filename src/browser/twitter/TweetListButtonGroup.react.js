import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {ButtonGroup, DropdownButton, Button, MenuItem} from 'react-bootstrap';

/**
 * This component contains GUI elements for sorting and showing modal info window.
 * It allows sorting tweets through date when a tweet was added and likes of each tweets. Both ascending and descending.
 * Two <DropdownButton> components are used for sorting.
 * Showing modal info window can be triggered by <Button> component.
 */
export default class TweetListButtonGroup extends Component {

  static propTypes = {
    onChangeSorting : PropTypes.func,
    showModalInfo : PropTypes.func
  };

  constructor(props) {
    super(props);

    this._sortByDateSelected = this._sortByDateSelected.bind(this);
    this._sortByLikesSelected = this._sortByLikesSelected.bind(this);
    this._showModalInfo = this._showModalInfo.bind(this);
  }

  _sortByDateSelected(e, sortingType) {
    this.props.onChangeSorting("date", sortingType);
  }

  _sortByLikesSelected(e, sortingType) {
    this.props.onChangeSorting("likes", sortingType);
  }

  _showModalInfo() {
    this.props.showModalInfo();
  }

  render() {
    return (
        <ButtonGroup>
          <DropdownButton title="Sort by date" bsStyle="info" bsSize="xsmall" id="dropdown1"
                          onSelect={this._sortByDateSelected}>
            <MenuItem eventKey="ascending">Ascending</MenuItem>
            <MenuItem eventKey="descending">Descending</MenuItem>
          </DropdownButton>
          <DropdownButton title="Sort by likes" bsStyle="info" bsSize="xsmall" id="dropdown2"
                          onSelect={this._sortByLikesSelected}>
            <MenuItem eventKey="ascending">Ascending</MenuItem>
            <MenuItem eventKey="descending">Descending</MenuItem>
          </DropdownButton>
          <Button bsStyle="success" bsSize="xsmall" onClick={this._showModalInfo}>
            Show modal info
          </Button>
        </ButtonGroup>
    );
  }
}

