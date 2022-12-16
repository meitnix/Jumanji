import { store } from '../../app/store'
import { tripsApiSlice } from '../trips/tripsApiSlice'
import { usersApiSlice } from '../users/usersApiSlice';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {

        store.dispatch(tripsApiSlice.util.prefetch('getTrips', 'tripsList', {force:true}))
        store.dispatch(usersApiSlice.util.prefetch('getUsers', 'usersList', {force:true}))
        //const trips = store.dispatch(tripsApiSlice.endpoints.getTrips.initiate())
        //const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
    }, [])

    return <Outlet />
}
export default Prefetch