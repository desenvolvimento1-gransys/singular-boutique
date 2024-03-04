export const baseApiUrl = process.env.baseApiUrl
export const storeId = parseInt(process.env.storeId)
export const s3Url = process.env.s3Url

export const itensPerPage = 48;

export const catchError = function (e) {
    alert('Algo deu errado !!!')
    $nuxt.$router.push({ path: `/` })
};