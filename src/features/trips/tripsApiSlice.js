import {createSelector, createEntityAdapter} from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const tripsAdapter = createEntityAdapter({})

const initialState = tripsAdapter.getInitialState()

export const tripsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTrips: builder.query({
            query: () => ({
                url:'/trips',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
        }),
            transformResponse: responseData => {
                const loadedTrips = responseData.map(trip => {
                    trip.id = trip._id
                    return trip
                });
                return tripsAdapter.setAll(initialState, loadedTrips)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Trip', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Trip', id }))
                    ]
                } else return [{ type: 'Trip', id: 'LIST' }]
            }
        }),
        addNewTrip: builder.mutation({
            query: initialTripData => ({
                url: '/trips',
                method: 'POST',
                body: {
                    ...initialTripData,
                }
            }),
            invalidatesTags: [
                {type: 'Trip', id: 'LIST'}
            ]
        }),
        updateTrip: builder.mutation({
            query: initialTripData => ({
                url: '/trips',
                method: 'PATCH',
                body: {
                    ...initialTripData,
                }  
            }),
            invalidatesTags: (result,error,arg) => [
                { type: 'Trip', id: arg.id }
            ]
        }),
        deleteTrip: builder.mutation({
            query:({ id }) => ({
                url: '/trips',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Trip', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetTripsQuery,
    useAddNewTripMutation,
    useUpdateTripMutation,
    useDeleteTripMutation,
} = tripsApiSlice

// returns the query result object
export const selectTripsResult = tripsApiSlice.endpoints.getTrips.select()

// creates memoized selector
const selectTripsData = createSelector(
    selectTripsResult,
    tripsResult => tripsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllTrips,
    selectById: selectTripById,
    selectIds: selectTripIds
    // Pass in a selector that returns the trips slice of state
} = tripsAdapter.getSelectors(state => selectTripsData(state) ?? initialState)