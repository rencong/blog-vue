import {getName, getToken, setName, setToken} from '../../utils/auth'
import {getUserInfo, login, register} from '../../api/login'

const user = {
    state: {
        name: '',
        token: '',
        id: ''
    },

    mutations: {
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_ID: (state, id) => {
            state.id = id;
        },
    },
    actions: {
        // 登录
        Login({commit}, userInfo) {
            const name = userInfo.name.trim();
            const password = userInfo.password.trim();
            return new Promise((resolve, reject) => {
                login(name, password).then(response => {
                    const data = response.data;
                    commit('SET_NAME', data.name);
                    commit('SET_TOKEN', data.api_token);
                    setName(data.name);
                    setToken(data.api_token);
                    resolve(response);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 注册
        Register({commit}, userInfo) {
            const name = userInfo.name.trim();
            const password = userInfo.password.trim();
            const email = userInfo.email.trim();
            return new Promise((resolve, reject) => {
                register(name, password, email).then(response => {
                    const data = response.data;
                    commit('SET_NAME', data.name);
                    commit('SET_TOKEN', data.api_token);
                    setName(data.name);
                    setToken(data.api_token);
                    resolve(response);
                }).catch(error => {
                    reject(error)
                })
            })
        },
        // 登出
        LogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_NAME', '');
                commit('SET_TOKEN', '');
                setName('');
                setToken('');
                resolve();
            })
        },
        GetUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                getUserInfo().then(response => {
                    const data = response.data;
                    commit('SET_NAME', getName());
                    commit('SET_TOKEN', getToken());
                    commit('SET_ID', data);
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
};
export default user

