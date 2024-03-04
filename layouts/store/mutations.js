const SET_BANNER = (state, obj) => {
    state.layout.index.carousel = obj
}

const SET_PIX = (state, obj) => {
    state.config.pixKeys.keys = obj
}

const SET_FACEBOOK_PIXEL = (state, obj) => {
    state.config.pixel = true
    state.config.pixel_id = obj
}

const SET_CONVERSION_API = (state, obj) => {
    state.config.api_conversion = true
    state.config.api_conversion_access_token = obj.value
}

const SET_GOOGLE_ANALYTICS_4 = (state, obj) => {
    state.config.google_analytics_4 = obj

}



export default {
    SET_BANNER,
    SET_PIX,
    SET_FACEBOOK_PIXEL,
    SET_CONVERSION_API,
    SET_GOOGLE_ANALYTICS_4
}