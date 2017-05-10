import BaseAction from './BaseAction';

class ToGreet extends BaseAction {

  constructor(slack) {
    super(slack);
  }



  async init() {
    return new Promise((resolve, reject) => {
      try {
        let result = this.sendMsgSlack('Hola terricolas');
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  }

}
export default ToGreet;
