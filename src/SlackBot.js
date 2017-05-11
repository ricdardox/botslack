import Slack from 'slack';

import Decision from './actions/Decision';

import Lodash from 'lodash';


class BotSlack {



    constructor() {
        this._decision = new Decision(Slack);
        this._controlAction = {};
        this.env = JSON.parse(process.env.config);
    }


    init() {
        let bot = Slack.rtm.client()
        let token = this.env.SLACK_BOT_TOKEN;
        this._decision.token = token;
        console.log('Iniciando Jarvis');
        bot.message((msg) => {
            if (!msg.hasOwnProperty('subtype') || (msg.hasOwnProperty('subtype') && msg.subtype !== 'me_message' && msg.subtype !== 'bot_message') && msg.subtype !== 'file_share') {
                this._decision.msg = msg;
                this._decision.init({});
                //console.log("Ricardo",msg);
            } else {
                //console.log("Bot",msg);
            }
        });
        bot.listen({
            token
        })
    }

}

export default BotSlack;
