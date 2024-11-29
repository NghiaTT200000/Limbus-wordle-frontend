const apiCaller = async (endpoint,opt={})=>{
    return await fetch(endpoint,opt)
}

export default apiCaller