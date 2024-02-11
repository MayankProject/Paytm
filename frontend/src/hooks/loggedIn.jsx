export const loginToken = ()=>{
    return localStorage.getItem('paytm_token') || null
}