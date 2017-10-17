/**
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 9. 8.
 */

import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  tagName: PropTypes.string,
  errorClassName: PropTypes.string,
  isValid: PropTypes.bool,
};

const defaultProps = {
  children: null,
  className: 'form-group',
  tagName: 'div',
  errorClassName: 'has-error',
  isValid: false,
};

const Validation = (props) => {
  const { children, className, tagName, errorClassName, isValid, ...attr } = props;
  return React.createElement(
    props.tagName,
    {
      ...attr,
      className: `${className} ${isValid ? errorClassName : ''}`,
    },
    children,
  );
};

Validation.propTypes = propTypes;
Validation.defaultProps = defaultProps;

export default Validation;
