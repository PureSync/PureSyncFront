import QnaBaseService from './QnaBaseService'

const QnaApiService = {
    fetchData(param) {
        return new Promise((resolve, reject) => {
            QnaBaseService(param)
                .then((response) => {
                    resolve(response)
                })
                .catch((errors) => {
                    reject(errors)
                })
        })
    },
}

export default QnaApiService
