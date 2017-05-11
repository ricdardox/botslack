import BaseAction from './BaseAction';
import Fs from 'fs';

class Repository extends BaseAction {

    constructor(slack) {
        super(slack);
        this.env = JSON.parse(process.env.config);

    }

    sortDirs() {
        let dirs = Fs.readdirSync(this.env.PATH_REPOS);
        let text = "Escoge el nombre del repositorio a actualizar\n";
        dirs.forEach((elem, index) => {
            text += `${index++}) ${elem}\n`;
        });
        return text;
    }


    async init() {
        return new Promise((resolve, reject) => {
            console.log('Nice you can show the repositories');
            let dirs = this.sortDirs();
            this.sendMsgSlack(dirs);
            var simpleGit = require('simple-git')("/home/programador/proyectos/botslack");
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
        });
    }

}
export default Repository;
