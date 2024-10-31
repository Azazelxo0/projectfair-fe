import { BASE_URL } from "./baseurl"
import { commonApi } from "./commonApi"


// register api

export const registerApi = async(userDetails)=>{
    return await commonApi ("POST",`${BASE_URL}/user/register`,userDetails,"")
}

//login api
export const loginApi = async(userDetails)=>{
    return await commonApi ("POST", `${BASE_URL}/user/login`,userDetails,"")
}

//add project
export const addProjectApi = async(projectDetails,reqHeader)=>{
    return await commonApi("POST",`${BASE_URL}/project/addproject`,projectDetails,reqHeader)
}

//get home projects 
export const getHomeProject = async()=>{
    return await commonApi("GET",`${BASE_URL}/project/homeproject`,"","")
}

//get all projects

export const getAllProject = async(reqHeader,searchKey)=>{
    //query param syntax
    //path?key=value
    return await commonApi("GET",`${BASE_URL}/project/allproject?search=${searchKey}`,"",reqHeader)
}

//get user project 
export const getUserProject = async(reqHeader)=>{
    return await commonApi("GET",`${BASE_URL}/project/userproject`,"",reqHeader)
}

//update project
export const editUserProjectApi= async(projectId,reqbody,reqHeader)=>{
    return await commonApi("PUT",`${BASE_URL}/project/editproject/${projectId}`,reqbody,reqHeader)
}

//delete project 
export const deleteProjectApi = async(projectId,reqHeader)=>{
    return await commonApi("DELETE",`${BASE_URL}/project/delete/${projectId}`,{},reqHeader)
}