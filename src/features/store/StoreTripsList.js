import { useGetTripsQuery } from "../trips/tripsApiSlice"
import Store from "./Store"
import useAuth from "../../hooks/useAuth"
import PulseLoader from "react-spinners/PulseLoader"

const StoreTripsList = () => {

    const { username, isManager, isAdmin } = useAuth()

    const {
        data: trips,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTripsQuery('tripsList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = trips

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(tripId => entities[tripId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(tripId => <Store key={tripId} tripId={tripId} />)

        content = (
            <table className="table table--trips">
                <thead className="table__thead">
                    <tr>
                        <th scope="col" className="table__th trip__status">Status</th>
                        <th scope="col" className="table__th trip__title">Title</th>
                        <th scope="col" className="table__th trip__username">Guide</th>
                        <th scope="col" className="table__th trip__text">Description</th>
                        <th scope="col" className="table__th trip__price">Price</th>
                        <th scope="col" className="table__th trip__edit">Buy Now</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default StoreTripsList