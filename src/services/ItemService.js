import axios from "../axios";

class ItemService {
    postItem = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.post('item', data)    // 20s
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        });

        return await promise;
    }

    fetchItem = async () => {
        const promise = new Promise((resolve, reject) => {
            axios.get('item')
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;
    }

    putItem = async (data) => {
        const promise = new Promise((resolve, reject) => {
            axios.put('item', data)
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;
    };

    deleteItem = async (params) => {
        const promise = new Promise((resolve, reject) => {
            axios.delete('item', {params: params})
                .then((res) => {
                    return resolve(res)
                })
                .catch((err) => {
                    return resolve(err)
                })
        })
        return await promise;
    };
}
export default new ItemService();