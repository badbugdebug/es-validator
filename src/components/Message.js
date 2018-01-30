/**
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 9. 8.
 */
import PropTypes from 'prop-types';
import shortid from 'shortid';

const propTypes = {
  render: PropTypes.func.isRequired,
  valid: PropTypes.shape().isRequired,
  once: PropTypes.bool,
};

const defaultProps = {
  tagName: 'div',
  once: false,
};

const Message = (props) => {
  const valid = props.valid;
  const render = props.render;
  const { error, ...assert } = valid;
  const message = Object.keys(assert).map(key => assert[key]).filter(f => f.error);

  const Compnent = props.once ?
    render({ ...message[0], key: shortid.generate() }) :
    message.map(data => render({ ...data, key: shortid.generate() }));

  return error ? Compnent : null;
};

Message.defaultProps = defaultProps;
Message.propTypes = propTypes;

export default Message;
