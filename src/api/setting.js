import request from '@/utils/request'
export const  getRoleList =(params)=>{
    return request({
        url: '/sys/role',
        params
    })
}