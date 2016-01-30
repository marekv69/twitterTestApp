import Component from 'react-pure-render/component';
import React, {PropTypes} from 'react';
import {Label} from 'react-bootstrap';

export default class TweetListFilteringInfo extends Component {

  static propTypes = {
    filteringInfo: PropTypes.string,
    currentSortingProperty : PropTypes.string
  };

  constructor(props) {
    super(props);

  }

  render() {
    let filteringInfoOutput =
      this.props.filterString !== "" ? <span>Only tweets containing <Label
        bsStyle="warning">{this.props.filterString}</Label> are shown. </span> : null;

    let sortingInfoOutput =
      <span>Sorted by <Label bsStyle="info">
        {this.props.currentSortingProperty} {this.props.currentSortingType}</Label> :</span>;


    return (
      <div className="filtering-and-sorting-info">
        {filteringInfoOutput}
        {sortingInfoOutput}
      </div>
    );
  }
}
