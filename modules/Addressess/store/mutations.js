const SET_LIST = (state, obj) => {
    state.list = obj
}

const SET_ERRORS = (state, obj) => {
    state.errors = obj
}

const SET_FORMDATA = (state, obj) => {
    state.formData = obj
}

const SET_REGISTERNEWADDRESS = (state, obj) => {
    state.registerNewAddress = obj
}



export default {
    SET_LIST,
    SET_ERRORS,
    SET_FORMDATA,
    SET_REGISTERNEWADDRESS
}