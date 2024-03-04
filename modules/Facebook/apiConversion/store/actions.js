import { baseApiUrl, catchError, storeId } from "@/Settings/global";
import axios from "axios";
let defaultPath = 'https://graph.facebook.com/v17.0'
import { SHA256 } from 'crypto-js';

let userLogged = null;
let dataHashed = {
  em: null,
  ph: null,
  db: null,
  fn: null,
  ge: null
};


const getInfoToSendApi = function ({ commit, state }, payload) {

  userLogged = state.userData;
  if (userLogged) {
    dataHashed = transformDataInHash(userLogged);
  }
  let data = [
    {
      "event_name": payload.event_name,
      "event_time": getEventTime(),
      "action_source": "website",
      "content_type": "product", // Tipo de conteúdo visualizado
      "user_data": {
        "em": [dataHashed.em],
        "ph": [dataHashed.ph],
        "db": [dataHashed.db],
        "fn": [dataHashed.fn],
        "ge": [dataHashed.ge],
      },
      "custom_data": {
      }
    }
  ];

  if (payload.event_name == "ViewContent") {
    data[0].content_ids = [payload.data.id] // IDs do conteúdo visualizado
    data[0].event_id = payload.code
    // data[0].price = payload.data.price
  }

  if (payload.event_name == "AddToCart") {

    let totalPrice = 0;
    let totalAmount = 0;
    for (let key in payload.data) {
      let price = 0
      if (payload.data[key].price !== undefined) {
        price = parseFloat(payload.data[key].price);
      }
      let amount;
      amount = parseFloat(payload.data[key].amount);
      totalAmount += amount;
      totalPrice += price;
    }
    data[0].custom_data.quantity = totalAmount;
    data[0].custom_data.value = totalPrice;
    data[0].custom_data.currency = "BRL";
    data[0].event_id = payload.code

  }

  if (payload.event_name == "Purchase") {
    console.log(payload);
    let amounts = payload.data.map(key => parseInt(key.amount));
    let products_value = parseFloat(payload.data[0].products_value);
    let delivery_price = parseFloat(payload.data[0].delivery_price);

    data[0].event_id = payload.code;
    data[0].custom_data.value = products_value + delivery_price;
    data[0].custom_data.currency = "BRL";
    data[0].custom_data.content_ids = payload.data.map(a => a.id);
    data[0].custom_data.quantity = amounts.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  }
  console.log(data);
  sendDataToFacebook(data)

}

const sendDataToFacebook = function (data) {
  let pixel_id = $nuxt.$store.state.Layouts.config.pixel_id;
  let access_token = $nuxt.$store.state.Layouts.config.api_conversion_access_token;
  axios.post(`${defaultPath}/${pixel_id}/events?access_token=${access_token}`, { "data": data })
    .then(res => {
      console.log(res);
    })
    .catch(e => {
      console.log(e);
    })
}

//PRIVATE
const getEventTime = function () {
  var data = new Date();
  var timestamp = data.getTime();
  var timestampSecond = Math.floor(timestamp / 1000);

  return timestampSecond;
}


const getUserData = async function ({ commit }) {
  axios
    .post(`${baseApiUrl}/ecommerce/people/show`)
    .then(res => {
      if (res.data.status !== 401) {
        commit("SET_USER_DATA", res.data)
      } else {
        commit("SET_USER_DATA", null)
      }
    })
    .catch(() => { });
}

const transformDataInHash = function (data) {
  // Gere o hash SHA-256
  let email = $nuxt.$store.state.User.user.email

  let dataHashed = {
    em: SHA256(email).toString(),
    ph: SHA256(data.phone_number).toString(),
    fn: SHA256(data.fantasy_name).toString(),
    db: SHA256(data.birthday).toString(),
    ge: SHA256(data.gender).toString(),
    country: SHA256("br").toString(),
  }

  return dataHashed;

}

export default {
  getInfoToSendApi,
  getUserData

}