import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

const Page = ({ title, link, meta, children }) => {
  return (
    <div className='col-xs-12'>
      <Helmet title={title} link={link} meta={meta} />
      { children }
    </div>
  );
};

Page.propTypes = {
  title: PropTypes.string,
  link: PropTypes.array,
  meta: PropTypes.array
};

export default Page;

