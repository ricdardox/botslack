import BotSlack from './SlackBot';

class App {
  constructor() {
    this._slackBot=new BotSlack();
    this._slackBot.init();
  }
}

new App();
