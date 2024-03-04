const getYPos = function ({ commit }, scrollPosition) {
    localStorage.setItem('scrollPosition', scrollPosition)
    // console.log(localStorage.getItem('scrollPosition'))
    // commit("SET_YPOS", scrollPosition);
};

export default {
    getYPos,
}