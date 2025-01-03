const apiCaller = async (endpoint:string,opt={})=>{
    return await fetch(endpoint,opt)
}

export default apiCaller