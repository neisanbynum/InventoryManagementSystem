export default class pages {
    static readonly home = '/'

    // Authentication Pages
    static readonly authenication = '/authentication'
    static readonly signin = `${this.authenication}/sign-in`
    static readonly register = `${this.authenication}/register`
    static readonly verification = `${this.register}/verification`

    // Auth Pages
    static readonly authenticated = '/auth'
    static readonly authTest = `${this.authenticated}/test`
}