import { baseApiUrl, catchError, storeId } from "@/Settings/global";
import axios from 'axios'

let list = [];
let defaultPath = '/customer-comments/'


const saveComments = function ({ commit }, payload) {

    $nuxt.$nextTick(() => {
        $nuxt.$loading.start();
    });
    let data = {
        ...payload,
        company_id: storeId,

    };

    // console.log(data)
    axios
        .post(`${baseApiUrl + defaultPath}save`, data)
        .then((res) => {
            if (res.data.status == 201) {
                // console.log('PASSOU')
                commit('SET_MODAL', res.data)
            }
        })
        .catch((e) => {
            catchError(e);
        })
        .finally(() => {
            $nuxt.$nextTick(() => {
                $nuxt.$loading.finish();
            });
        });


}

const showComments = function ({ commit }, payload) {

    $nuxt.$nextTick(() => {
        $nuxt.$loading.start();
    });

    let data = {
        ...payload,
        company_id: storeId,
        limit: 20,
    };

    axios.post(`${baseApiUrl + defaultPath}index-ecommerce`, data).then(res => {
        commit('SET_LIST', res.data)
    })
        .catch(e => {
            catchError(e)
        })

        .finally(() => {
            $nuxt.$nextTick(() => {
                $nuxt.$loading.finish()
            })
        });
}

const cleanStateComments = function ({ commit }) {
    commit('SET_LIST', [])

}



export default {
    saveComments,
    showComments,
    cleanStateComments

}