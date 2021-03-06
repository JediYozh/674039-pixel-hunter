
import AbstractView from './abstract-view';
import getFooter from './footer';

import {QuestionTypes} from '../data/config';

const TWO_OPTIONS = 2;
const SINGLE_OPTION = 1;

export default class Game extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.game = state.stages[this.state.currentScreen].screen;
  }

  get template() {
    const stage = this.state.stages[this.state.currentScreen];
    let res = ``;

    switch (this.game) {
      case QuestionTypes.TWO_OF_TWO: res = `<div class="game">
                              <p class="game__task">${stage.content.title}</p>
                              <form class="game__content">
                                <div class="game__option">
                                  <img src="${stage.content.photos[0]}" alt="Option 1" width="468" height="458">
                                  <label class="game__answer game__answer--photo">
                                    <input name="question1" type="radio" value="photo">
                                    <span>Фото</span>
                                  </label>
                                  <label class="game__answer game__answer--paint">
                                    <input name="question1" type="radio" value="paint">
                                    <span>Рисунок</span>
                                  </label>
                                </div>
                                <div class="game__option">
                                  <img src="${stage.content.photos[1]}" alt="Option 2" width="468" height="458">
                                  <label class="game__answer  game__answer--photo">
                                    <input name="question2" type="radio" value="photo">
                                    <span>Фото</span>
                                  </label>
                                  <label class="game__answer  game__answer--paint">
                                    <input name="question2" type="radio" value="paint">
                                    <span>Рисунок</span>
                                  </label>
                                </div>
                              </form>
                              ${getFooter(this.state.results)}
                            </div>`; break;

      case QuestionTypes.TINDER_LIKE: res = `<div class="game" id="game2">
                            <p class="game__task">${stage.content.title}</p>
                            <form class="game__content  game__content--wide">
                              <div class="game__option">
                                <img src="${stage.content.photos[0]}" alt="Option 1" width="705" height="455">
                                <label class="game__answer  game__answer--photo">
                                  <input name="question1" type="radio" value="photo">
                                  <span>Фото</span>
                                </label>
                                <label class="game__answer  game__answer--wide  game__answer--paint">
                                  <input name="question1" type="radio" value="paint">
                                  <span>Рисунок</span>
                                </label>
                              </div>
                            </form>
                            ${getFooter(this.state.results)}
                          </div>`; break;

      case QuestionTypes.ONE_OF_THREE: res = `<div class="game">
                            <p class="game__task">${stage.content.title}</p>
                            <form class="game__content  game__content--triple">
                              <div class="game__option" id="question1">
                                <img src="${stage.content.photos[0]}" alt="Option 1" width="304" height="455">
                              </div>
                              <div class="game__option  game__option--selected" id="question2">
                                <img src="${stage.content.photos[1]}" alt="Option 2" width="304" height="455">
                              </div>
                              <div class="game__option" id="question3">
                                <img src="${stage.content.photos[2]}" alt="Option 3" width="304" height="455">
                              </div>
                            </form>
                            ${getFooter(this.state.results)}
                          </div>`; break;

      default: res = `<h1>Template not found</h1>`;
    }
    return res;
  }

  nextClick() {

  }

  onAnswer() {

  }

  bind() {
    const className = this.game === QuestionTypes.ONE_OF_THREE ? `game__option` : `game__answer`;
    const limit = this.game === QuestionTypes.TWO_OF_TWO ? TWO_OPTIONS : SINGLE_OPTION;
    const answerCollection = this.element.getElementsByClassName(className);
    const answerArr = Array.prototype.slice.call(answerCollection);

    answerArr.forEach((answer) => {
      answer.addEventListener(`click`, (e) => this.onAnswer(e, answerArr, limit, this.state), false);
    });
  }
}
