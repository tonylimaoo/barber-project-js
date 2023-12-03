import "./alert-message.css"

export default function AlertMessage({ setFormError, formErrorMessage }) {
    return (
        <div className='form-error'>
            <div className="white-block">
                <button className='close-error' onClick={() => setFormError(false)}>X</button>
                <h4 className='error-message'>{formErrorMessage}</h4>
            </div>
        </div>
    )
}
