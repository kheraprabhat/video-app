import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from '../css/components/video';
import Video from './Video';
import $ from 'jquery';
import Slider from 'react-slick';

const cx = classNames.bind(styles);

class Videos extends Component {
	componentDidMount() {
		
	}

	nextArrow() {
		return <div className={styles['slick-next']}></div>;
	}

	prevArrow() {
		return <div className={styles['slick-prev']}></div>;
	}

    render() {
      const videos = this.props.videos && this.props.videos.entries;
      const nextArrow = this.nextArrow();
      const prevArrow = this.prevArrow();
      const settings = {
	    speed: 500,
	    slidesToShow: 6,
	    slidesToScroll: 6,
	    lazyload: true,
	    arrows: true,
	    className: 'center',
        centerMode: true,
        centerPadding: '60px',
        nextArrow: nextArrow,
      	prevArrow: prevArrow,
      	currentSlide: 1,
      	slideCount: this.props.videos.totalCount
	  };
      return (
      	<div className={cx('video-on-demand')}>
      		<Slider {...settings}>
      		{
      	      videos.map((video, i) => <div key={i}><Video video={video} index={i}/></div>)
      	    }
      	    </Slider>
      	</div>
      )
    }
};

export default Videos;
