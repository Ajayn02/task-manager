import axios from "axios";

const base_url=`https://task-server-az2u.onrender.com`

// to Add Task
export const addTaskApi=async(data)=>{
    return await axios.post(`${base_url}/addtask`,data)
}

// to get all Tasks
export const getAllTaskApi=async()=>{
    return await axios.get(`${base_url}/getalltasks`)
}

// to get specific Tasks
export const getOneTaskApi=async(id)=>{
    return await axios.get(`${base_url}/getonetask/${id}`)
}

// to delete task
export const deleteTask=async(id)=>{
    return await axios.delete(`${base_url}/deltask/${id}`)

}

//edit task

export const editTask=async(id,data)=>{
    return await axios.put(`${base_url}/edittask/${id}`,data)
}