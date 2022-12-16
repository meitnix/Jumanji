import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { useGetTripsQuery } from './tripsApiSlice'
import { memo } from 'react'

const Trip = ({ tripId }) => {

    const { trip } = useGetTripsQuery("tripsList", {
        selectFromResult: ({ data }) => ({
            trip: data?.entities[tripId]
        }),
    })

    const navigate = useNavigate()

    if (trip) {
        const created = new Date(trip.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(trip.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/trips/${tripId}`)

        return (
            <tr className="table__row">
                <td className="table__cell trip__status">
                    {trip.completed
                        ? <span className="trip__status--completed">Completed</span>
                        : <span className="trip__status--open">Open</span>
                    }
                </td>
                <td className="table__cell trip__created">{created}</td>
                <td className="table__cell trip__updated">{updated}</td>
                <td className="table__cell trip__title">{trip.title}</td>
                <td className="table__cell trip__username">{trip.username}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}

const memoizedTrip = memo(Trip)

export default memoizedTrip