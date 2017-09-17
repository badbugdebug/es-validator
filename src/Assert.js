/**
 * @author: Seok Kyun. Choi. 최석균 (Syaku)
 * @site: http://syaku.tistory.com
 * @since: 2017. 9. 8.
 */

import validtor from 'validator';
import validate from 'validate.js';
import moment from 'moment';

/**
 * Parameter 설명
 * value : 입력된 값
 * options : Validator Rule Option
 * ----------------------------------------------
 * value : 비교 대상 값
 * length : 수만큼 배열이 존재해야 한다. value 가 array 인 경우에 사용 된다.
 * min : 최소
 * max : 최대
 * func : 직접 함수를 만든다.
 * date: 날짜 (string : 20101010, 2010-10-10)
 * 그외 옵션은 https://github.com/chriso/validator.js 참고한다.
 */

export const isJSON = value => validtor.isJSON(value);
export const isURL = (value, options) => validtor.isURL(value, options);
export const isEmail = (value, options) => validtor.isEmail(value, options);
export const isIP = (value, { varsion }) => validtor.isIP(value, varsion);
export const isAlpha = (value, { locale }) => validtor.isAlpha(value, locale);
export const isAlphanumeric = (value, { locale }) => validtor.isAlphanumeric(value, locale);
export const isDate = value => moment(value).isValid();
export const isAfterDate = (value, { date }) => {
  const invalid = moment(value);
  if (!invalid.isValid()) return false;
  return invalid.isAfter(date);
};
export const isBeforeDate = (value, { date }) => {
  const invalid = moment(value);
  if (!invalid.isValid()) return false;
  return invalid.isBefore(date);
};

export const isNotEmpty = (value, { not }) => !validate.isEmpty(value) === !not;
export const isEquals = (value, { value: value2, not }) => (value === value2) === !not;
export const isArrayLength = (value, { length, min, max }) => {
  if (!Array.isArray(value)) return false;
  if (length > 0) {
    return value.length === length;
  }
  return value.length >= min && value.length <= max;
};
export const isArrayMinLength = (value, { min }) => {
  if (!Array.isArray(value)) return false;
  return value.length >= min;
};
export const isArrayMaxLength = (value, { max }) => {
  if (!Array.isArray(value)) return false;
  return value.length <= max;
};
export const isInt = (value) => {
  if (typeof value === 'string') return validtor.isNumeric(value);
  return validate.isNumber(value);
};
export const isRangeInt = (value, { min, max, allow_leading_zeroes }) =>
  validtor.isInt(String(value), { min, max, allow_leading_zeroes });
export const isLength = (value, { min, max }) => validtor.isLength(value, { min, max });
export const isMinLength = (value, { min }) => validtor.isLength(value, { min, max: undefined });
export const isMaxLength = (value, { max }) => validtor.isLength(value, { min: undefined, max });
export const isTrue = (value, { not }) => value === !not;
export const isMakeFunc = (value, { func }, state) => {
  if (!validate.isFunction(func)) return false;
  return func(value, state);
};

// const defaultProps = {
//   not: false,
//   max: undefined,
//   min: undefined,
//   lenght: undefined,
// };

// valid = true
const Assert = (assert, value, properties, state) => {
  switch (assert) {
    case '_json': return isJSON(value, properties);
    case '_url': return isURL(value, properties);
    case '_email': return isEmail(value, properties);
    case '_ip': return isIP(value, properties);
    case '_alpha': return isAlpha(value, properties);
    case '_alphaNumber': return isAlphanumeric(value, properties);
    case '_afterDate': return isAfterDate(value, properties);
    case '_date': return isDate(value, properties);
    case '_beforeDate': return isBeforeDate(value, properties);
    case '_hasText': return isNotEmpty(value, properties);
    case '_equals': return isEquals(value, properties);
    case '_check': return isArrayLength(value, properties);
    case '_rangeCheck': return isArrayLength(value, properties);
    case '_maxCheck': return isArrayMinLength(value, properties);
    case '_minCheck': return isArrayMaxLength(value, properties);
    case '_int': return isInt(value, properties);
    case '_rangeInt': return isRangeInt(value, properties);
    case '_length': return isLength(value, properties);
    case '_minLength': return isMinLength(value, properties);
    case '_maxLength': return isMaxLength(value, properties);
    case '_checked': return isTrue(value, properties);
    case '_selected': return isNotEmpty(value, properties);
    case '_makeFunc': return isMakeFunc(value, properties, state);
    default: return false;
  }
};

export default Assert;
