import http from '../http'
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

export default function Home() {

    const [users, setUsers] = useState([])

        useEffect(() => {
            fetchAllUsers()
        }, [])

    const fetchAllUsers = () => {
        http.get('/users').then(res=>{
            setUsers(res.data)
        })
    }

    const deleteUser = (id) => {
        http.delete('/users/'+id).then(res=>{
            fetchAllUsers()
        })
    }

    return (
        <div>
            <h2>Users List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>no</th>
                        <th>name</th>
                        <th>email</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user,index) => (
                        <tr key={user.id}>
                            <td>{++index}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Link className='btn btn-info' to={{ pathname:'/edit/'+user.id}}>Edit</Link>
                                <Link className='btn btn-primary' to={{ pathname:'/view/'+user.id}}>View</Link>
                                <button className='btn btn-danger' onClick={() => {deleteUser(user.id)}}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}