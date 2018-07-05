import Cookies from 'js-cookie'
export function setName(name) {
    return Cookies.set("name", name);
}
export function getName() {
    return Cookies.get("name");
}
export function setToken(token) {
    return Cookies.set("token", token);
}
export function getToken() {
    return Cookies.get("token");
}