import React, { useState, useEffect } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useLocation, useNavigate } from 'react-router-dom';

import useRefreshToken from '../hooks/useRefreshToken';

export const Users = () => {
    const [users, setUsers] = useState([]);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();

    const refresh = useRefreshToken();

    useEffect(() => {

        let isMount = true;
        const controller = new AbortController();

        const getUsers = async () => {

            try {

                const response = await axiosPrivate.get('/users', {
                    signal: controller.signal
                });
                console.log(response.data)
                if (isMount) setUsers(response.data);

            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });


            }
        }
        getUsers();

        return () => {
            isMount = false;
            controller.abort();
        }

    }, []);

    return (
        <article>
            <h2>Users List</h2>
            {users?.length
                ? (
                    <ul>
                        {users.map((user, i) => <li key={i}>{user?.username}</li>)}
                    </ul>
                ) : <p>No users to display</p>
            }
            <button onClick={() => refresh()}>Refresh</button>
        </article>
    )
}


export default Users;
