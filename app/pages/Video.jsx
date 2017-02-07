import React, { Component } from 'react';
import Page from '../pages/Page';
import VideoContainer from '../containers/Videos';
import {connect} from 'react-redux';

class Video extends Component {
  getMetaData() {
    return {
      title: this.pageTitle(),
      meta: this.pageMeta(),
      link: this.pageLink()
    };
  }

  pageTitle() {
    return 'Video | Video on Demand';
  }

  pageMeta() {
    return [
      { name: 'description', content: 'A Video on Demand application' }
    ];
  }

  pageLink() {
    return [];
  }

  render() {
    return (
      <Page {...this.getMetaData()}>
        <VideoContainer {...this.props} />
      </Page>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    videos: state.video.videos
  };
};

export default connect(mapStateToProps, null)(Video);
