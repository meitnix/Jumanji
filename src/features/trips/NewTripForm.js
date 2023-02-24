import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewTripMutation } from "./tripsApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewTripForm = ({ users }) => {

    const [addNewTrip, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewTripMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [price, setPrice] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/trips')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onPriceChanged = e => setPrice(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, price, userId].every(Boolean) && !isLoading

    const onSaveTripClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewTrip({ user: userId, title, text, price })
        }
    }

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''
    const validPriceClass = !price ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form" onSubmit={onSaveTripClicked}>
                <div className="form__title-row">
                    <h2>New Trip</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />

                <label className="form__label" htmlFor="price">
                    Price:</label>
                <input
                    type='number'
                    min='0.001'
                    step={0.001}
                    className={`form__input form__input--price ${validPriceClass}`}
                    id="price"
                    name="price"
                    value={price}
                    onChange={onPriceChanged}
                />


                <label className="form__label form__checkbox-container" htmlFor="username">
                    ASSIGNED TO:</label>
                <select
                    id="username"
                    name="username"
                    className="form__select"
                    value={userId}
                    onChange={onUserIdChanged}
                >
                    {options}
                </select>

            </form>
        </>
    )

    return content
}

export default NewTripForm