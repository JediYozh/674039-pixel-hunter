import stateHandler from './StateHandler';
import nextScreen from './nextScreen';
import {QuestionTypes} from '../data/config';

const CLEAR_ANSWERS = `clear`;
const MINUTE = 60;

const convertTime = (time) => {
  const [minutes, seconds] = time.split(`:`);
  return parseInt(minutes, 10) * MINUTE + parseInt(seconds, 10);
};

export default function handleAnswer(e, elements, limit, state, startTime) {
  (() => {

    let element = e.target.parentNode;
    let identificator = e.target.name;

    if (state.stages[state.currentScreen].screen === QuestionTypes.ONE_OF_THREE) {
      element = e.target;
      identificator = e.target.id;
    }

    if (identificator) {

      existCheck(e.target.name);

      if (e.target.tagName !== `SPAN` || e.target.id) {

        const answer = elements.indexOf(element);
        const match = state.stages[state.currentScreen].content.answers.includes(answer);
        const resArr = resultCount(match);

        if (resArr.length === limit) {

          const levelTime = convertTime(state.time) - convertTime(startTime);

          const finalRes = {
            correct: !resArr.includes(false),
            time: levelTime,
          };
          const nextState = Object.assign(state, {});

          if (!finalRes.correct) {
            let lives = nextState.lives;
            lives--;
            nextState.lives = lives;
          }

          existCheck(CLEAR_ANSWERS);
          resultCount(CLEAR_ANSWERS);
          nextState[`results`].push(finalRes);

          stateHandler.state = nextState;

          nextScreen();
        }
        return;
      }
    }
  })();
}

const resultCount = (function () {
  let results = [];
  return (answer) => {
    if (answer === CLEAR_ANSWERS) {
      results = [];
      return results;
    } else if (answer) {
      results.push(true);
    } else {
      results.push(false);
    }
    return results;
  };
}());

const existCheck = (function () {
  const elArr = new Set();
  return (el) => {
    if (el === CLEAR_ANSWERS) {
      return elArr.clear();
    } else if (elArr.has(el)) {
      return resultCount(CLEAR_ANSWERS);
    }
    return elArr.add(el);
  };
})();
