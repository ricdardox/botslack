class Greet {

    constructor(slack) {
        this._slack = slack;
        this._action = "";
        this._token = "";
    }


    set token(token) {
        this._token = token;
    }
    set action(action) {
        this._action = action;
    }

    init() {
        switch (this._action.text.toLowerCase()) {
            case 'hi':
              case 'hello':
              case 'hola':
                this._slack.chat.postMessage({
                    token: this._token,
                    channel: this._action.channel,
                    text: "Hola"
                }, (err, data) => {});
                break;
            default:

        }
    }

}
export default Greet;
