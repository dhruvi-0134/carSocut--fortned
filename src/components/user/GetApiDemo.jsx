import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const GetApiDemo = () => {
  const [users, setusers] = useState([])

  const getUsers = async () => {
    const res = await axios.get("https://node5.onrender.com/user/user/")
    console.log("response...", res);
    setusers(res.data.data)
  }
  const deleteUser =async(id)=>{
    // alert("delete user called..."+id)
    const res =await axios.delete(`https://node5.onrender.com/user/user/${id}`)
    console.log(res)
    if(res.status==204){
      toast.success("User deleted successfully")
      getUsers()
    }
  }
      

  // component load → useEffect call → function call
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div style={{ textAlign: "center"}}>
      
    
      <h1>GET API DEMO</h1>

      <table
        style={{
          margin: "20px auto",
          borderCollapse: "collapse",
          width: "95%"
        }}
        border="1"
        cellPadding="10"
      >
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>No.</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td>
                {user.isActive ? "Active ✅" : "Inactive ❌"}
              </td>
              <td>
                <button onClick={()=>{deleteUser(user._id)}} className='text-red-500 cursor-pointer font-bold'>DELETE</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}