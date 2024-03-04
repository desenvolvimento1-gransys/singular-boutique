import { s3Url } from "@/Settings/global";

const onlyGridIdAndAmount = function () {
    return 10
}

const productsWithImgUrl = function (state) {
    let response = []
    if (state.cartData.length > 0) {
        for (var i = 0; i < state.cartData.length; i++) {
            let addValue = null;
            if (state.cartData[i].atribute) {

                addValue = {
                    ...state.cartData[i],
                    imgUrl: getCorrectImg(state.cartData[i]),

                    atributesValue: getAtributeProductValue(state.cartData[i].atributes, state.cartData[i].amount)
                }
                response.push(addValue)
            } else {
                addValue = {
                    ...state.cartData[i],
                    imgUrl: getCorrectImg(state.cartData[i]),

                    atributesValue: null
                }
                response.push(addValue)
            }
        }
    }
    return response
}

const calculateProgressiveDiscount = function (state, getters) {
    // console.log(state.paymentRules);
    let discountRate = 0;
    if (state.paymentRules.length > 0) {
        let rules = state.paymentRules.filter(a => a.application_type_rules !== null);
        let payRules = rules[0]
        if (payRules) {
            if (payRules.application_type_rules) {
                payRules = JSON.parse(payRules.application_type_rules)
                if (payRules.rules.length > 0) {
                    for (let i = 0; i < payRules.rules.length; i++) {
                        if (discountRate < payRules.rules[i].rate && payRules.rules[i].amount <= getters.getProductsWithoutSale.totalAmount) {
                            discountRate = payRules.rules[i].rate
                        }
                    }
                }
                return { discountRate: discountRate, discountValue: (getters.getProductsWithoutSale.totalPrice > 0 ? (getters.getProductsWithoutSale.totalPrice * (discountRate / 100)) : discountRate) };
            }
        }
    }
}

const getProductsWithoutSale = function (state, getters) {
    let itens = [];
    let totalAmount = 0;
    let totalPrice = 0;

    for (let i = 0; i < getters.productsWithImgUrl.length; i++) {
        if (getters.productsWithImgUrl[i].actived_promotions.length <= 0) {
            itens.push({ price: (getters.productsWithImgUrl[i].price * getters.productsWithImgUrl[i].amount), amount: getters.productsWithImgUrl[i].amount })
            totalAmount = getters.productsWithImgUrl[i].amount + totalAmount;
            totalPrice = (getters.productsWithImgUrl[i].price * getters.productsWithImgUrl[i].amount) + totalPrice;

        }
    }
    return { itens: itens, totalAmount: totalAmount, totalPrice: totalPrice };


}

const totalAmountInCart = function (state) {
    let cartNumbers = state.cartData.map(a => parseFloat(a.amount))
    let teste = cartNumbers.reduce(function (prevVal, elem) {
        return parseFloat(prevVal) + parseFloat(elem);
    }, 0);
    return teste
}

const totalProductsValue = function (state) {
    let response = 0;

    for (let i = 0; i < state.cartData.length; ++i) {
        if (state.cartData[i].atributes) {
            response =
                response + (getAtributeProductValue(state.cartData[i].atributes, state.cartData[i].amount)) + parseFloat(state.cartData[i].price) * state.cartData[i].amount;
        } else {
            response =
                response + parseFloat(state.cartData[i].price) * state.cartData[i].amount;

        }
    }

    return response
}

//private
const getCorrectImg = function (value) {
    if (value.product_image[0]) {
        let img = value.product_image.filter((img) => {
            return img.color === value.color;
        });
        if (img[0]) {
            return s3Url + img[0].img_name + "300.jpg";
        } else {
            return s3Url + value.product_image[0].img_name + "300.jpg";
        }
    }
}

const getAtributeProductValue = function (data, amount) {
    if (data) {
        let sum = 0;
        data.map(function (elem) {
            if (elem.additional_price !== null) {
                return sum = sum + parseFloat(elem.additional_price)
            }
        });

        return amount * sum;
    } else {
        return 0
    }
}

export default {
    productsWithImgUrl,
    totalAmountInCart,
    totalProductsValue,
    onlyGridIdAndAmount,
    getProductsWithoutSale,
    calculateProgressiveDiscount
}