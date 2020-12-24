import axios from 'axios'
import config from './config'
import service from '../services/index'
import {des3Decrypt, assembleParams} from '../utils/publicMethods'

const http = {
    /**
     * axios Post请求
     * @param service  服务器API
     * @param params  对象参数
     * @param isEncrypt  data是否加密
     * @param timeout  请求超时时间
     * @returns {Promise}
     * @constructor
     */
    post(service, params, isEncrypt = false, timeout) {
        return new Promise((resolve, reject) => {
            params = assembleParams(service, params, isEncrypt);
            if (timeout) {
                config.timeout = timeout;
            }
            config.params = "";
            axios.post(service, params, config)
                .then(res => {
                    httpCallback(res, "post", resolve, reject);
                })
                .catch(err => {
                    reject(err)
                })
        })
    },
    /**
     * axios  Get请求
     * @param service  服务器api
     * @param params  路径参数
     * @param isEncrypt  data是否加密
     * @returns {Promise}
     * @constructor
     */
    get(service, params, isEncrypt = false) {
        return new Promise((resolve, reject) => {
            params = assembleParams(service, params, isEncrypt);
            config.params = params;
            axios.get(service, config)
                .then(res => {
                    httpCallback(res, "get", resolve, reject);
                })
                .catch(err => {
                    reject(err);
                })

        })
    }
};

/**
 * http返回处理
 */
function httpCallback(res, type, resolve, reject) {
    //请求成功回调
    if (res.data.code === 200) {
        resolve(res.data.body);
    }//服务器错误
    else if (res.data.code === 500) {
        reject(res.data.message ? res.data : {code: 500, message: "服务器异常，错误码：500"});
    } else if (res.data.code === 409) {
        //查询结果为空
        resolve("");
    } else if (res.data.code === 415) {
        //415  该接口为缓存接口   服务端未更新数据缓存  前端不更新数据缓存
        resolve("");
    }
    //其它异常
    else {
        reject(res.data);
    }
}

/***
 * 不需要验证resultCode 的API
 * @param api
 * @returns {boolean}
 */


export function getTemp() {
    let temp = localStorage.getItem("timestamp");
    if (!temp || !temp.temp) {
        http.get(service.timestamp, {})
            .then(res => {
                const obj = {
                    temp: res.timestamp,
                    currentTemp: Date.parse(new Date())
                };
                localStorage.setItem("timestamp", JSON.stringify(obj));
            })
            .catch(err => {
                console.log(err)
            })
    }
}

axios.interceptors.response.use(response => {
    // IE 8-9
    if (response.data) {
        response.data = responseSet(response.data);
        return response;
    }
    if (response.data == null && response.config.responseType === 'json' && response.request.responseText != null) {
        try {
            let data = JSON.parse(response.request.responseText);
            response.data = responseSet(data);
        } catch (e) {
        }
    }
    return response;
})


function responseSet(data) {
    // http 500
    if (!data) {
        return "";
    }
    //单独处理文件上传到七牛云时判断
    if(!data.body && data.hash) {
        return data;
    }
    //判断是否需要解密
    data.body = data.key ? JSON.parse(des3Decrypt(data.body, data.key)) : data.body ? typeof data.body === "object" ? data.body : JSON.parse(data.body) : data.body;
    switch (data.code) {
        case 400:
            console.log('服务器错误异常抛出位置');
            break;
        default:
            break;
    }
    return data;
}

export default http;