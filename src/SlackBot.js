import Slack from 'slack';

import Decision from './actions/Decision';

import Lodash from 'lodash';


class BotSlack {



  constructor() {
    this._decision = new Decision(Slack);
    this._controlAction = {};
  }


  init() {
    let bot = Slack.rtm.client()
    let token = "xoxb-181031518647-JElpgCNrWWTbsXcZ15sqzWiB"
    this._decision.token = token;
    console.log('Iniciando Jarvis');
    bot.message((msg) => {
      if (!msg.hasOwnProperty('username') || (msg.hasOwnProperty('username') && msg.username !== 'bot')) {
        this._decision.action = msg;
        this._decision.init();
      }
    });
    bot.listen({
      token
    })
  }

}

export default BotSlack;
