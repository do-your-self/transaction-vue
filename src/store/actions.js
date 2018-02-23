import * as types from './types.js'

//actions常用于异步更改状态。也就是说它一般用来先发送请求，然后再commit


export default {
    UserLogin({ commit }, data){
        commit(types.LOGIN, data);
    },
    UserLogout({ commit }){
        commit(types.LOGOUT);
    },
    Admin({ commit }, data){
        commit(types.ADMIN, data);
    },
    User({ commit }, data){
        commit(types.USER, data);
    },
    Periods({ commit }, data){
        commit(types.PERIODS, data);
    },
    Companys({ commit }, data){
        commit(types.COMPANYS, data);
    },
    Prods({ commit }, data){
        commit(types.PRODS, data);
    },
    Claarr({ commit }, data){
        commit(types.ClAARR, data);
    },
    Minamounts({ commit }, data){
        commit(types.MINAMOUNTS, data);
    },
    isCollapse({ commit }, data){
        commit(types.ISCOLLAPSE, data);
    }
/*    Company({ commit }, data){
        commit(types.COMPANY, data);
    },
    Id({ commit }, data){
        commit(types.ID, data);
    },
    Message({ commit }, data){
        commit(types.MESSAGE,data);
    }*/
}

