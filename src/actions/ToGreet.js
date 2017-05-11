import BaseAction from './BaseAction';

class ToGreet extends BaseAction {

  constructor(slack) {
    super(slack);
  }



  async init(res) {
    return new Promise((resolve, reject) => {
      try {
        let result = this.sendMsgSlack(res.result.fulfillment.speech);
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }

}
export default ToGreet;
