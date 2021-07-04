import request from "@/utils/request";

export function login(user){
    return request({
        method:'POST',
        url:'/api/users/login',
        data:{
            user
        }
    })
}

export function register(data){
    return request({
        method:'POST',
        url:'/api/users/login',
        data
    })
}