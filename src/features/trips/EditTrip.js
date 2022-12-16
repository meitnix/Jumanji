import { useParams } from 'react-router-dom'
import EditTripForm from './EditTripForm'
import { useGetTripsQuery } from './tripsApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'

const EditTrip = () => {
    useTitle('Trips: Edit Trip')

    const { id } = useParams()

    const { username, isManager, isAdmin } = useAuth()

    const { trip } = useGetTripsQuery("tripsList", {
        selectFromResult: ({ data }) => ({
            trip: data?.entities[id]
        }),
    })

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!trip || !users?.length) return <PulseLoader color={"#FFF"} />


    if (!isManager && !isAdmin) {
        if (trip.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditTripForm trip={trip} users={users} />

    return content
}
export default EditTrip