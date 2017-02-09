import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from '../css/components/video';
import Video from './Video';
import $ from 'jquery';
import Slider from 'react-slick';
import { Modal, Button } from 'react-bootstrap';

const cx = classNames.bind(styles);

class Videos extends Component {
	constructor() {
    super();

    this.state = {
      showModal: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(video) {
    this.setState({
      showModal: true,
      video: video
    });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
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
      slidesToShow: 5,
      slidesToScroll: 5,
      lazyload: true,
      arrows: true,
      className: 'center',
      centerMode: true,
      centerPadding: '20px',
    	currentSlide: 1,
    	slideCount: this.props.videos.totalCount,
      responsive: [ 
        { breakpoint: 480, settings: { slidesToShow: 1 } },
        { breakpoint: 768, settings: { slidesToShow: 3 } }, 
        { breakpoint: 1024, settings: { slidesToShow: 4 } },
        { breakpoint: 1224, settings: { slidesToShow: 6 } }
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
              <Modal show={this.state.showModal} onHide={this.closeModal}>
                <Modal.Header closeButton>
                  <Modal.Title>{this.state.video && this.state.video.title}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <video width="100%" controls autoplay>
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

export default Videos;
