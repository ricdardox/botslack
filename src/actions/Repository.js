import BaseAction from './BaseAction';
import Fs from 'fs';

class Repository extends BaseAction {

    constructor(slack) {
        super(slack);
        this.env = JSON.parse(process.env.config);

    }



    async init(res) {

        return new Promise((resolve, reject) => {

            console.log('Nice you can show the repositories', res.result.parameters);
            let path = `${this.env.PATH_REPOS}/${res.result.parameters.actualizar.proyecto}`;
            if (Fs.existsSync(path)) {
                var simpleGit = require('simple-git')(path);
                simpleGit.pull('origin', 'master', {}, (error, result) => {
                    if (error) {
                        return reject(error);
                    }
                    let token = this._token;
                    let content = result;
                    let filetype = "json";
                    let filename = "result.json";
                    let title = "Result";
                    let initial_comment = "Nice!";
                    let channels = this._msg.channel;
                    this._slack.files.upload({
                        token,
                        content,
                        filetype,
                        filename,
                        title,
                        channels
                    }, (err, data) => {})
                    resolve(result)
                });
            } else {
              this.sendMsgSlack("Lo siento! no existe el repositorio que quires actualizar.");
            }


        });
    }

}
export default Repository;
