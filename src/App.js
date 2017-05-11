import BotSlack from './SlackBot';
import Fs from 'fs';

class App {
    constructor() {
        this.loadEnv();
        this._slackBot = new BotSlack();
        this._slackBot.init();
    }

    loadEnv() {
        let env = ".env.json";
        if (Fs.existsSync(env)) {
            process.env.config = Fs.readFileSync('.env.json');
        }else{
          console.log('Error no existe el archivo .evn.json');
        }
    }

}

new App();
