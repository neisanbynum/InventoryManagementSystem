import axios, { AxiosInstance } from 'axios'


class Server {
    private readonly url: string = 'http://10.0.0.252:8000'
    server: AxiosInstance

    constructor() {
        this.server = axios.create({
            baseURL: this.url,
            headers: {
                'Access-Control-Allow-Origin': this.url,
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
                'Access-Control-Allow-Headers': '*'
            },
            withCredentials: true
        })
    }
}

const server = new Server().server
export default server