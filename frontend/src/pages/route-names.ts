export default class Paths {
    static readonly home = '/'
    static readonly auth = '/auth'
    static readonly register = `${this.auth}/register`
    static readonly registerVerification = `${this.register}/verification`
}