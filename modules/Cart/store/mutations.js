const SET_CARTMODAL = (state, obj) => {
    state.cartDialog = obj
}

const SET_CARTDATA = (state, obj) => {
    state.cartData = obj
}

const SET_CLOSINGORDER = (state, obj) => {
    state.closingOrder = obj
}

const SET_PAYMENT_RULES_DATA = (state, obj) => {
    state.paymentRules = obj
}

export default {
    SET_CARTMODAL,
    SET_CARTDATA,
    SET_CLOSINGORDER,
    SET_PAYMENT_RULES_DATA
}