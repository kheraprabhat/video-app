import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from '../css/components/video';
import Video from './Video';
import $ from 'jquery';
import Slider from 'react-slick';
import Modal from 'react-modal';

const cx = classNames.bind(styles);

class Videos extends Component {
	constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(video) {
    this.setState({
      modalIsOpen: true,
      video: video
    });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      video: {}
    });
  }

  render() {
    const videos = this.props.videos && this.props.videos.entries;

    const customStyles = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : "900px" 
      }
    };
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
    return (
      <div className='col-xs-12'>
      	<div className='video-on-demand'>
      		<Slider {...settings}>
      		{
    	      videos.map((video, i) => <div key={i}><Video video={video} index={i} openModal={this.openModal}/></div>)
    	    }
    	    </Slider>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal">
            <h2 ref="subtitle">{this.state.video && this.state.video.title}</h2>
            <button className='closeBtn' onClick={this.closeModal}>close</button>
            <div className='videoContainer'>
              <video width="600px" controls autoplay>
                <source src={this.state.video && this.state.video.contents && this.state.video.contents[0].url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className='description'>{this.state.video && this.state.video.description}</div>
          </Modal>
      	</div>
      </div>
    )
  }
};

export default Videos;
