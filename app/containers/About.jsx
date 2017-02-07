import React, { Component } from 'react';

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
class About extends Component {
  render() {
    return (
      <div className='about'>
        <h1 className='header'>About Video on Demand</h1>
        <div className='description'>
          <p>Watch videos!!</p>
        </div>
      </div>
    );
  };
};

export default About;
