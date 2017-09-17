/**
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 9. 8.
 */

import Assert from './Assert';
import MessageSource from './MessageSource';

class Validator {
  constructor(rules, assert, message) {
    this.error = false;
    this.rules = rules;
    this.state = null;

    this.assertTest = assert || Assert;
    this.assertMessage = message || MessageSource;
  }

  prepare(state) {
    this.state = state;
    this.error = false;
    return this.collect(this.rules, state);
  }

  submit(state) {
    this.state = state;
    this.error = false;
    return this.collect(this.rules, state, true);
  }

  getError() {
    return this.error;
  }

  collect(rules, state, checking = false) {
    // target : state 데이터 명과 매칭한다.
    return Object.keys(rules).reduce((prevResult, target) => {
      if (!Object.prototype.hasOwnProperty.call(rules, target)) {
        return prevResult;
      }

      const { _manyType, ...rule } = rules[target];

      const data = state && Object.prototype.hasOwnProperty.call(state, target) ?
        state[target] : null;

      const result = _manyType ?
        this.collectMany(target, rule, data, checking) :
        this.collectRule(target, rule, data, checking);

      return {
        ...prevResult,
        ...result,
      };
    }, {});
  }

  collectMany(target, rule, data, checking) {
    if (!data) {
      return {
        [target]: [],
      };
    }
    return {
      [target]: data.map(value => this.collect(rule, value, checking)),
    };
  }

  /**
   * 세부적인 규칙을 정리한다.
   * @author Seok Kyun. Choi. 최석균 (Syaku)
   * @param {any} target 대상
   * @param {any} { name, ...rule } name 대상 명
   * @param {any} value 유효성 검사 대상이 되는 데이터
   * @returns
   * @memberof Validator
   */
  collectRule(target, { _name, ...rule }, value, checking) {
    // 대상에 하나의 오류라도 발생한 경우
    let errorRule = false;

    const result = Object.keys(rule).reduce((prevResult, assert) => {
      if (!Object.prototype.hasOwnProperty.call(rule, assert)) return prevResult;
      const { message, ...properties } = rule[assert];
      const error = checking ? !this.assertTest(assert, value, properties, this.state) : false;
      if (error) {
        errorRule = true;
        this.error = true;
      }

      return {
        ...prevResult,
        [assert]: {
          error,
          message: message || this.assertMessage(assert, _name, properties),
        },
      };
    }, {});

    return {
      [target]: {
        error: errorRule,
        ...result,
      },
    };
  }
}

export default Validator;
