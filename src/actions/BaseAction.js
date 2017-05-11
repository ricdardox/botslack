import ApiAI from 'apiai';


class BaseAction {

  constructor(slack) {
    this._slack = slack;
    this._msg = "";
    this._token = "";
    this.env=  JSON.parse(process.env.config) ;
    this._apiAIToken = this.env.APIAI_TOKEN;
    this._apiAI = ApiAI(this._apiAIToken);
  }

  sendText(text) {
    return new Promise((resolve, reject) => {
      var request = this._apiAI.textRequest(text, {
        sessionId: '123'
      });
      request.on('response', (response) => {
        return resolve(response);
      });
      request.on('error', (error) => {
        console.log(error);
        reject(error)
      });
      request.end();
    });
  }


  sendMsgSlack(text) {
    return new Promise((resolve, reject) => {
      this._slack.chat.meMessage({
        token: this._token,
        channel: this._msg.channel,
        text: text
      }, (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data);
        };
      });
    });
  }

  set token(token) {
    this._token = token;
  }
  set msg(action) {
    this._msg = action;
  }

  init(apiaiRes) {}

}
export default BaseAction;
