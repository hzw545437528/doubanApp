import vue from "../main"
const key: string = '0b2bdeda43b5688921839c8ecb20399b'
const service = {
    getService(url: string, params: any) {
        return new Promise(resolve => {
            console.log(url);
            params = params || {}
            params.apikey = key;
            (vue as any).$axios.get(url, { params }).then((res: any) => {
                resolve(res)
            })
        })
    }
}

export default service