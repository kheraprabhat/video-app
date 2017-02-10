import React, { Component } from 'react';

class Video extends Component {
  clickHandler(index) {
    const video = this.props.video;
    this.props.openModal(video);
  }
  render() {
    const video = this.props.video;
    return (
      <div className="image-container" onClick={() => this.clickHandler(this.props.index)}>
        <img src={video.images[0].url} />
        <h3>{video.title}</h3>
      </div>
    );
  }
};

export default Video;
