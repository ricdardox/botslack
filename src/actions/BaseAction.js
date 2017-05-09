import ApiAI from 'apiai';


class BaseAction {

  constructor(slack) {
    this._slack = slack;
    this._action = "";
    this._token = "";
    this._apiAIToken = "d4e1d57af43648fab7b12c1fbece62ac";
    this._apiAI = ApiAI(this._apiAIToken);
  }

  sendText(text) {
    return new Promise((resolve,reject) => {
      var request =   this._apiAI.textRequest(text, {
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

  set token(token) {
    this._token = token;
  }
  set action(action) {
    this._action = action;
  }

  init() {}

}
export default BaseAction;
