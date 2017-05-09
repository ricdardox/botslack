import BaseAction from './BaseAction';

class Decision extends BaseAction {

  constructor(slack) {
    super(slack);
  }


  async init() {
    let res = await this.sendText(this._action.text);
    console.log(res);
    this._slack.chat.postMessage({
      token: this._token,
      channel: this._action.channel,
      text: res.result.fulfillment.speech
    }, (err, data) => {});

  }

}
export default Decision;
