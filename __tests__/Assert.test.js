import moment from 'moment';
import * as Assert from '../src/Assert';

const defaultProps = {
  not: false,
  max: undefined,
  min: undefined,
  lenght: undefined,
  value: undefined,
  exec: undefined,
  date: undefined,
};

const getDefault = props => Object.assign({}, defaultProps, props);

test('Validator Test True', () => {
  expect(Assert.isJSON('{ "good": "good" }', getDefault())).toBeTruthy();
  expect(Assert.isJSON('{}', getDefault())).toBeTruthy();
  expect(Assert.isJSON('[]', getDefault())).toBeTruthy();
  expect(Assert.isJSON('{ good: "good" }', getDefault())).not.toBeTruthy();
  expect(Assert.isJSON('', getDefault())).not.toBeTruthy();
  // expect(Assert.isJSON(null, getDefault())).not.toBeTruthy();
  // expect(Assert.isJSON(undefined, getDefault())).not.toBeTruthy();

  expect(Assert.isURL('syaku.tistory.com', getDefault())).toBeTruthy();
  expect(Assert.isURL('http://syaku.tistory.com', getDefault())).toBeTruthy();

  expect(Assert.isEmail('aaa@gamil.com', getDefault())).toBeTruthy();

  expect(Assert.isIP('192.167.0.1', getDefault({ version: [4] }))).toBeTruthy();
  expect(Assert.isIP('192.167.0.1', getDefault({ version: [4, 6] }))).toBeTruthy();

  expect(Assert.isAlpha('good', getDefault())).toBeTruthy();
  expect(Assert.isAlphanumeric('good1234', getDefault())).toBeTruthy();

  expect(Assert.isDate('20170915', getDefault())).toBeTruthy();
  expect(Assert.isDate('2017-09-15', getDefault())).toBeTruthy();

  expect(Assert.isAfterDate('20170914', getDefault({ date: '20170913' }))).toBeTruthy();
  expect(Assert.isAfterDate(moment().add(1, 'd').format('YYYYMMDD'), getDefault())).toBeTruthy();

  expect(Assert.isBeforeDate('20170913', getDefault({ date: '20170914' }))).toBeTruthy();
  expect(Assert.isBeforeDate(moment().add(-1, 'd').format('YYYYMMDD'), getDefault())).toBeTruthy();

  expect(Assert.isNotEmpty('good', getDefault())).toBeTruthy();
  expect(Assert.isNotEmpty(12345, getDefault())).toBeTruthy();

  expect(Assert.isEquals('good', getDefault({ value: 'good' }))).toBeTruthy();
  expect(Assert.isEquals(true, getDefault({ value: true }))).toBeTruthy();

  expect(Assert.isArrayLength(
    [1, 2], getDefault({ min: 1, max: 2 }),
  )).toBeTruthy();

  expect(Assert.isArrayMinLength(
    [1, 2], getDefault({ min: 1 }),
  )).toBeTruthy();

  expect(Assert.isArrayMaxLength(
    [1, 2], getDefault({ max: 2 }),
  )).toBeTruthy();

  expect(Assert.isInt('2', getDefault())).toBeTruthy();
  expect(Assert.isInt(2, getDefault())).toBeTruthy();
  expect(Assert.isRangeInt('2', getDefault({ min: 1, max: 2 }))).toBeTruthy();
  expect(Assert.isRangeInt(2, getDefault({ min: 1, max: 2 }))).toBeTruthy();

  expect(Assert.isLength('good', getDefault({ min: 1, max: 4 }))).toBeTruthy();
  expect(Assert.isMinLength('good', getDefault({ min: 1 }))).toBeTruthy();
  expect(Assert.isMaxLength('good', getDefault({ max: 4 }))).toBeTruthy();

  expect(Assert.isTrue(true, getDefault())).toBeTruthy();
  expect(Assert.isMakeFunc('good', getDefault({ func: value => value === 'good' }))).toBeTruthy();
});


// test('Validator Test False', () => {
//   expect(Assert.isJSON(null, getDefault())).not.toBeTruthy();
//   expect(Assert.isJSON(undefined, getDefault())).not.toBeTruthy();
// });
