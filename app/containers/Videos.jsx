import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from '../css/components/video';
import Video from './Video';
import $ from 'jquery';
import Slider from 'react-slick';
import { Modal, Button } from 'react-bootstrap';
import { createVideo } from '../actions/videos';

const cx = classNames.bind(styles);

class Videos extends Component {
	constructor() {
    super();

    this.state = {
      showModal: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onVideoEnd = this.onVideoEnd.bind(this);
    this.onModalOpen = this.onModalOpen.bind(this);
  }

  openModal(video) {
    this.setState({
      showModal: true,
      video: video
    });
    this.props.createVideo(video);
  }

  onModalOpen() {
    const vid = this.refs.videoPlayer;
    vid.addEventListener('ended', this.onVideoEnd, false);
  }

  onVideoEnd(e) {
    this.closeModal();
  }

  closeModal() {
    this.setState({
      showModal: false,
      video: {}
    });
  }

  render() {
    const videos = this.props.videos && this.props.videos.entries;
    const settings = {
      speed: 500,
      lazyload: true,
      arrows: true,
      className: 'center',
      centerMode: true,
      centerPadding: '20px',
    	currentSlide: 1,
    	slideCount: this.props.videos.totalCount,
      slidesToShow: 5, 
      slidesToScroll: 5,
      responsive: [ 
        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 2 } }, 
        { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
        { breakpoint: 1224, settings: { slidesToShow: 4, slidesToScroll: 4 } }
      ]
    };
    
    if (videos) {
      return (
        <div className='col-xs-12'>
        	<div className='video-on-demand'>
        		<Slider {...settings}>
        		{
      	      videos.map((video, i) => <div key={i}><Video video={video} index={i} openModal={this.openModal}/></div>)
      	    }
      	    </Slider>
            <div className="static-modal">
              <Modal show={this.state.showModal} onHide={this.closeModal} onEntered={this.onModalOpen}>
                <Modal.Header closeButton>
                  <Modal.Title>{this.state.video && this.state.video.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <video width="100%" ref="videoPlayer" controls autoPlay>
                    <source src={this.state.video && this.state.video.contents && this.state.video.contents[0].url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className='description'>{this.state.video && this.state.video.description}</div>
                </Modal.Body>

              </Modal>
            </div>
        	</div>
        </div>);
    } else if (videos && videos.entries && videos.entries.length === 0) {
      return (<div className='col-xs-12'>
          <div className='video-on-demand'>
            <div className='col-xs-12 alert'>No Videos</div>
          </div>
        </div>);
    } else {
      return (<div className='col-xs-12'>
          <div className='video-on-demand'>
            <div className='col-xs-12 alert'>Loading ...</div>
          </div>
        </div>);
    }
  }
};

export default connect(null, { createVideo })(Videos);
