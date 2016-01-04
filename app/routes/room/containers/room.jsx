import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediaPlayer from '../../../components/mediaPlayer';
import * as MediaSources from '../../../components/mediaPlayer/constants';

import { } from 'material-ui';

class Room extends Component {
  static propTypes = {
  }

  render() {
    const { } = this.props;
    return (
      <MediaPlayer mediaSource={MediaSources.YOUTUBE} url="cVYvozAWPtc"/>
    );
  }
}

export default connect(state => ({
  room: state.room,
}))(Room);
