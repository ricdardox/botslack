import BaseAction from './BaseAction';
import ChangeCase from 'change-case';

class Decision extends BaseAction {

    constructor(slack) {
        super(slack);
        this._slack = slack;
    }

    getActionClass(action) {
        return new Promise((resolve, reject) => {
            try {
                let Class = require(`./${ChangeCase.pascalCase(action)}`).default;
                let actionclass = new Class(this._slack);
                resolve(actionclass);
            } catch (e) {
                console.log(e);
                reject(e);
            }
        });

    }

    init(apiaiRes) {
        return new Promise(async(resolve, reject) => {
            let res = await this.sendText(this._msg.text);
            if (res.result.action !== '' && res.result.action !== undefined && res.result.action !== 'input.unknown') {
                let classAction = await this.getActionClass(res.result.action);
                if (classAction) {
                    classAction.token = this._token;
                    classAction.msg = this._msg;
                    classAction.init(res);
                }
            } else {
              this.sendMsgSlack(res.result.fulfillment.speech);
            }
            resolve(res);
        });

    }

}
export default Decision;
