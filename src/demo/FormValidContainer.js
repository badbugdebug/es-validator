/**
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 9. 8.
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import Toastr from 'modern-toastr';
import 'modern-toastr/dist/modern-toastr.css';

import Validator, { Validation, Message } from '../index';

class FormValidContainer extends Component {
  constructor(props) {
    super(props);

    this.errorPrint = v => <p key={v.key} className="help-block">{v.message}</p>;

    this.onOptionsChange = this.onOptionsChange.bind(this);
    this.onInputTextChange = this.onInputTextChange.bind(this);
    this.onChangeCheckedToBoolean = this.onChangeCheckedToBoolean.bind(this);
    this.onChangeCheckedToArray = this.onChangeCheckedToArray.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // 유효성 검증을 위한 규칙 셋팅
    this.validator = new Validator({
      email: {
        _name: '이메일',
        _hasText: {
          message: '아무값도 없다...',
        },
        _minLength: {
          min: 2,
        },
        _maxLength: {
          max: 20,
        },
        _email: {},
      },
      password: {
        _name: '암호',
        _hasText: {},
        _makeFunc: {
          func: (value, state) => value === state.password2,
          message: '암호가 일치하지 않습니다.',
        },
      },
      isCheck: {
        _name: '체크',
        _checked: {},
      },
      hobby: {
        _name: '취미',
        _check: { length: 2 },
      },
      options: {
        // 배열인 경우 모든 배열에 아래의 규칙이 적용된다.
        _manyType: true,
        name: {
          _name: '옵션명',
          _hasText: {},
          _length: {
            min: 2,
            max: 10,
          },
        },
        value: {
          _name: '옵션값',
          _maxLength: {
            max: 10,
          },
        },
      },
    });

    // validator 규칙과 state 는 object key 와 1:1 매칭된다.
    const state = {
      email: '',
      password: '',
      password2: '',
      isCheck: false,
      hobby: [],
      options: [
        {
          name: '',
          value: '값1',
          comment: '',
        },
        {
          name: '옵션2',
          value: '2222',
          comment: '',
        },
      ],
    };

    this.state = {
      ...state,
      // 유효성 검증 결과를 react state 업데이트한다.
      v: this.validator.prepare(state),
    };
  }

  onOptionsChange(e, index) {
    const options = this.state.options.map((option, i) => {
      if (i !== index) return option;
      return {
        ...option,
        [e.target.name]: e.target.value,
      };
    });

    this.setState({ options });
  }

  onChangeCheckedToBoolean(e) {
    this.setState({
      [e.target.id]: e.target.checked,
    });
  }

  onChangeCheckedToArray(e) {
    if (e.target.checked) {
      this.setState({
        [e.target.name]: [
          ...this.state[e.target.name],
          e.target.value,
        ],
      });
    } else {
      this.setState({
        [e.target.name]: this.state[e.target.name].filter(value => value !== e.target.value),
      });
    }
  }

  onInputTextChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  onSubmit() {
    const { v, ...state } = this.state;
    // 유효성 검증 결과를 react state 업데이트한다.
    this.setState({ v: this.validator.submit(state) });
    if (!this.validator.getError()) {
      Toastr.success('저장되었습니다.');
    }
  }

  render() {
    const { v, ...state } = this.state;
    const { email, isCheck, hobby, options } = v;
    return (
      <div className="container">
        <h1>Form Value Validator</h1>
        <form>
          <Validation isValid={email.error}>
            <label className="control-label" htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={this.onInputTextChange}
              id="email"
              value={this.state.email}
            />
            <Message once valid={email} render={this.errorPrint} />
          </Validation>
          <div className={classNames('form-group', { 'has-error': email.error, 'has-feedback': email.error })}>
            <label className="control-label" htmlFor="exampleInputEmail1">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              onChange={this.onInputTextChange}
              id="email"
              value={this.state.email}
            />
            {
              email.error ? [
                <span className="sr-only">(success)</span>,
                <span className="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true" />,
              ] : null
            }
            <Message once valid={email} render={this.errorPrint} />
          </div>
          <Validation isValid={this.state.v.password.error}>
            <label className="control-label" htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={this.onInputTextChange}
              id="password"
              value={this.state.password}
            />
            <Message once valid={this.state.v.password} render={this.errorPrint} />
          </Validation>
          <div className="form-group">
            <label className="control-label" htmlFor="exampleInputPassword1">Password Confirm</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password Confirm"
              onChange={this.onInputTextChange}
              id="password2"
              value={this.state.password2}
            />
          </div>
          <Validation isValid={isCheck.error}>
            <div className="checkbox">
              <label className="control-label" htmlFor>
                <input
                  type="checkbox"
                  id="isCheck"
                  onChange={this.onChangeCheckedToBoolean}
                  checked={this.state.isCheck}
                /> 동의 (약관에 동의합니다.)
              </label>
            </div>
            <Message valid={isCheck} render={this.errorPrint} />
          </Validation>
          <Validation isValid={hobby.error}>
            <label className="control-label" htmlFor>취미를 선택하세요.</label>
            <div className="checkbox">
              <label className="checkbox-inline" htmlFor>
                <input
                  type="checkbox"
                  value="축구"
                  name="hobby"
                  onChange={this.onChangeCheckedToArray}
                  checked={this.state.hobby.includes('축구')}
                /> 축구
              </label>
              <label className="checkbox-inline" htmlFor>
                <input
                  type="checkbox"
                  value="야구"
                  name="hobby"
                  onChange={this.onChangeCheckedToArray}
                  checked={this.state.hobby.includes('야구')}
                /> 야구
              </label>
              <label className="checkbox-inline" htmlFor>
                <input
                  type="checkbox"
                  value="농구"
                  name="hobby"
                  onChange={this.onChangeCheckedToArray}
                  checked={this.state.hobby.includes('농구')}
                /> 농구
              </label>
              <Message valid={hobby} render={this.errorPrint} />
            </div>
          </Validation>
          <div className="row">
            <div className="col-sm-4">
              <Validation isValid={options[0].name.error}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="옵션명"
                  value={this.state.options[0].name}
                  name="name"
                  onChange={e => this.onOptionsChange(e, 0)}
                />
                <Message valid={options[0].name} render={this.errorPrint} />
              </Validation>
            </div>
            <div className="col-sm-4">
              <Validation isValid={options[0].value.error}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="옵션값"
                  value={this.state.options[0].value}
                  name="value"
                  onChange={e => this.onOptionsChange(e, 0)}
                />
              </Validation>
            </div>
            <div className="col-sm-4">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="옵션설명"
                  value={this.state.options[0].comment}
                  name="comment"
                  onChange={e => this.onOptionsChange(e, 0)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <Validation isValid={options[1].name.error}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="옵션명"
                  value={this.state.options[1].name}
                  name="name"
                  onChange={e => this.onOptionsChange(e, 1)}
                />
                <Message valid={options[1].name} render={this.errorPrint} />
              </Validation>
            </div>
            <div className="col-sm-4">
              <Validation isValid={options[1].value.error}>
                <input
                  type="text"
                  className="form-control"
                  placeholder="옵션값"
                  value={this.state.options[1].value}
                  name="value"
                  onChange={e => this.onOptionsChange(e, 1)}
                />
              </Validation>
            </div>
            <div className="col-sm-4">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="옵션설명"
                  value={this.state.options[1].comment}
                  name="comment"
                  onChange={e => this.onOptionsChange(e, 1)}
                />
              </div>
            </div>
          </div>
          <button type="button" className="btn btn-default" onClick={this.onSubmit}>Submit</button>
        </form>
        <hr />
        <textarea className="form-control" rows="3" readOnly value={JSON.stringify(state, null, 4)} />
      </div>
    );
  }
}

export default FormValidContainer;
