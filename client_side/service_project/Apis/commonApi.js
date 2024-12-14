import axios from 'axios'

const commonapi=(reqMethod,reqUrl,reqHeaders,reqBody)=>{
    const config={
        url:reqUrl,
        headers:reqHeaders?reqHeaders:{"Content-Type":'application/json'},
        method:reqMethod,
        data:reqBody
    }
    return axios(config)
}
export default commonapi
