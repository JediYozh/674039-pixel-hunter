import {assert, expect} from 'chai';
import pointCounter from './pointCounter';
import generateResults from '../data/generateTestResults';

const {correctAverageAnswers, correctFastAnswers, correctSlowAnswers, wrongAverageAnswers, wrongFastAnswers, wrongSlowAnswers} = generateResults();

describe(`Point Counter`, () => {
  it(`should throw Error if no answers array or remaining lives provided`, () => {
    expect(pointCounter).to.throw();
  });

  it(`should return a number`, () => {
    assert.typeOf(pointCounter(correctSlowAnswers, 3), `number`);
  });

  describe(`points check`, () => {
    it(`should return -1 if there are less than 10 answers`, () => {
      assert.equal(-1, pointCounter([1, 2, 3], 1));
    });

    it(`should return 1150 if 3 lives is remained, all answers are correct, not fast and not slow`, () => {
      assert.equal(1150, pointCounter(correctAverageAnswers, 3));
    });

    it(`should return 1100 if 2 lives is remained, all answers are correct, not fast and not slow`, () => {
      assert.equal(1100, pointCounter(correctAverageAnswers, 2));
    });

    it(`should return 1550 if 1 life is remained, all answers are correct, all fast`, () => {
      assert.equal(1550, pointCounter(correctFastAnswers, 1));
    });

    it(`should return 500 if 0 lives is remained, all answers are correct, all slow`, () => {
      assert.equal(500, pointCounter(correctSlowAnswers, 0));
    });

    it(`should return 500 if 0 lives is remained, half are correct, not slow and not fast`, () => {
      assert.equal(500, pointCounter(wrongAverageAnswers, 0));
    });

    it(`should return 850 if 2 lives is remained, half are correct, all fast`, () => {
      assert.equal(850, pointCounter(wrongFastAnswers, 2));
    });

    it(`should return 300 if 1 lives is remained, half are correct, all slow`, () => {
      assert.equal(300, pointCounter(wrongSlowAnswers, 1));
    });
  });

});
