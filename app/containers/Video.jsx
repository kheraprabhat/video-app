import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames/bind';
import styles from '../css/components/video';

const cx = classNames.bind(styles);

class Video extends Component {
    render() {
		const video = this.props.video;
	    return (
	    	<div data-index={this.props.index}>
		    	<img src={video.images[0].url} />
		    	<h3>{video.title}</h3>
	    	</div>
	    );
    }
};

export default Video;
