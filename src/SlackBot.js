import Slack from 'slack';

import Greet from './actions/Greet';


class BotSlack {

    constructor() {
        this._greet = new Greet(Slack);
    }


    init() {
        let bot = Slack.rtm.client()
        let token = "xoxb-179164934112-0D7IFJ2rAUW5pEGUHMG9DAiV"
        this._greet.token = token;
        console.log('Iniciando Jarvis');
        bot.message((msg) => {
            console.log(msg)
            if (!msg.hasOwnProperty('username') || (msg.hasOwnProperty('username') && msg.username !== 'bot')) {
                this._greet.action = msg;
                this._greet.init();
            }
        });

        bot.listen({
            token
        })
    }

}

export default BotSlack;
