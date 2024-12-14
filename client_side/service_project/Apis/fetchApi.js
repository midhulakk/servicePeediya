import commonapi from "./commonApi"

export const userRegister=(data)=>{
    return commonapi("POST","http://127.0.0.1:8000/user/","",data)
}
export const userLogin=(data)=>{
    return commonapi("POST","http://127.0.0.1:8000/token/","",data)
}

export const postJobs=(data,header)=>{
    return commonapi("POST","http://127.0.0.1:8000/user/jobpost/",header,data)
}
export const getpostJobs=(header)=>{
    return commonapi("GET","http://127.0.0.1:8000/user/jobpost/",header,"")
}
export const getJobDetail=(id,header)=>{
    return commonapi("GET",`http://127.0.0.1:8000/user/jobpost/${id}/`,header,"")
}
export const userLogout=(header)=>{
    return commonapi("POST","http://127.0.0.1:8000/user/logout/",header,"")
}
export const workerRegister=(data,header)=>{
    return commonapi("POST","http://127.0.0.1:8000/workreg/",header,data)
}
export const workerView=()=>{
    return commonapi("GET","http://127.0.0.1:8000/workreg/","","")
}
export const adminApproval=(id,data)=>{
    return commonapi("POST",`http://127.0.0.1:8000/approve/${id}/`,"",data)
}
export const workerLogin=(data)=>{
    return commonapi("POST","http://127.0.0.1:8000/worklog/","",data)
}
export const jobMatchView=(header)=>{
    return commonapi("GET","http://127.0.0.1:8000/jobmatch/",header,"")
}
export const jobDetailView=(id,header)=>{
    return commonapi("GET",`http://127.0.0.1:8000/jobmatch/${id}/`,header,"")
}
export const acceptJob=(id,header,data)=>{
    return commonapi("POST",`http://127.0.0.1:8000/jobs/apply/${id}/`,header,data)
}
export const usersList=(header)=>{
    return commonapi("GET","http://127.0.0.1:8000/userslist/",header,"")
}
export const workersList=(header)=>{
    return commonapi("GET","http://127.0.0.1:8000/workerslist/",header,"")
}
export const newWorkerNotify=()=>{
    return commonapi("GET","http://127.0.0.1:8000/newworkernotify/","","")
}
export const acceptedjobView=(header)=>{
    return commonapi("GET","http://127.0.0.1:8000/acceptedjobs/",header,"")
}
export const viewProfile=(header)=>{
    return commonapi("GET","http://127.0.0.1:8000/profile/",header,"")
}
export const updateWorkerProfile=(header,data)=>{
    return commonapi("PUT","http://127.0.0.1:8000/profile/",header,data)
}
export const jobStatus=(header)=>{
    return commonapi("GET","http://127.0.0.1:8000/jobstatus/",header,"")
}
export const workerProfile=(id,header)=>{
    return commonapi("GET",`http://127.0.0.1:8000/workerprofile/${id}/`,header,"")
}
export const userNotication=(header)=>{
    return commonapi("GET","http://127.0.0.1:8000/usernotify/",header,"")
}
export const workerNotification=(header)=>{
    return commonapi("GET","http://127.0.0.1:8000/workernotify/",header,"")
}
export const sendNotification=(data)=>{
    return commonapi("POST","http://127.0.0.1:8000/sendnotify/",data)
}
export const cancelJob = (id, header) => {
    return commonapi("PATCH", `http://127.0.0.1:8000/jobs/${id}/cancel/`, header, "");
}

