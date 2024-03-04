const defaultPath = '/ecommerce/layout'
import { baseApiUrl, catchError, storeId } from "@/Settings/global";
import axios from 'axios'

const showLayout = function ({ commit }) {

    axios.post(`${baseApiUrl + defaultPath}/index`, { "id": storeId })
        .then(res => {
            let navbar = res.data.navbar;
            showNavbar({ commit }, navbar);

            let convertFrameRate = convertFrameRateFunction(res.data.banner);
            let banners = convertFrameRate;
            setBanners({ commit }, banners)

            let marketing_settings = res.data.marketing_settings
            if (marketing_settings) {
                setMarketing({ commit }, marketing_settings);
            }

            let payment_settings = res.data.payment_settings
            if (payment_settings) {
                setPaymentSettings({ commit }, payment_settings);
            }
        })
        .catch(e => {
            return e;
        })

}

const setBanners = function ({ commit }, items) {
    let banners = items[0].data;
    commit('Layouts/SET_BANNER', banners, { root: true });
}

const setPaymentSettings = function ({ commit }, items) {
    let pix_keys = JSON.parse(items.extra_receive_info);
    commit('Layouts/SET_PIX', pix_keys.pix, { root: true });
}

const setMarketing = function ({ commit }, items) {
    let facebookArray = items[0].facebook;
    let googleArray = items[0].google;

    if (facebookArray) {
        setFacebookValue(facebookArray)
    }
    if (googleArray) {
        setGoogleValue(googleArray)
    }

};

const setFacebookValue = function ({ commit }, facebookArray) {
    facebookArray.forEach(facebookObject => {

        if (facebookObject.name === "facebook_pixel_token") {
            commit('Layouts/SET_FACEBOOK_PIXEL', facebookObject.value, { root: true });
        }

        if (facebookObject.name === "conversion_api_facebook") {
            const { name, value: conversion_api_facebook } = facebookObject;
            commit('Layouts/SET_CONVERSION_API', { name, value: conversion_api_facebook }, { root: true });
        }
    });
}

const setGoogleValue = function ({ commit }, googleArray) {
    googleArray.forEach(googleObject => {

        if (googleObject.name === "google_analytics_4_token") {
            commit('Layouts/SET_GOOGLE_ANALYTICS_4', googleObject.value, { root: true });
        }
    });
}

const convertFrameRateFunction = function (items) {
    let frameRate = items[0].data.frameRate;
    let value1 = frameRate.split('/')[0];
    let value2 = frameRate.split('/')[1];
    let result = value1 / value2;
    items[0].data.frameRate = result;
    return items;
}



// Função para processar os dados dos itens e gerar a lista de navegação
const generateNavbarList = function (items) {
    const navbarList = [];
    items.sort((a, b) => a.data.ordenate - b.data.ordenate);
    items.forEach((item) => {
        const { data, childrens, ...rest } = item;

        const name = data?.name;
        const route = data?.route;

        if (name && route) {
            const children = childrens?.map((child) => ({ name: child.data.name, route: child.data.route }));

            navbarList.push({ name, route, children });
        }
    });

    return navbarList;
}

// Função para processar os dados dos itens e gerar a lista de configuração
const generateConfigList = function (items) {
    const configList = [];

    items.forEach((item) => {
        const { data, childrens, ...rest } = item;

        const name = data?.name;
        const route = data?.route;
        const params = generateParams(data.params);

        configList.push({ name, route, params });

        if (childrens?.length > 0) {
            childrens.forEach(child => {
                const childParams = generateParams(child.data.params);

                const mergedParams = { ...params, ...childParams };

                configList.push({
                    name: child.data.name,
                    route: child.data.route,
                    params: mergedParams
                });
            })
        }
    });

    return configList;
}

// Função para gerar os parâmetros de um item
const generateParams = function (params) {
    return Object.entries(params)
        .filter(([key, value]) => value || typeof value === 'boolean')
        .reduce((acc, [key, value]) => {
            if (key === 'many_subcategories' && Array.isArray(value) && value.length === 0) {
                // Ignora a chave se o valor for um array vazio
                return acc;
            }

            acc[key] = value;
            return acc;
        }, {});
}

// Função principal para exibir a barra de navegação
const showNavbar = function ({ commit }, items) {
    const navbarList = generateNavbarList(items);
    const configList = generateConfigList(items);

    commit('SET_NAVBAR', navbarList);
    commit('SET_CONFIGNAVBAR', configList);
}
export default {
    showLayout
}