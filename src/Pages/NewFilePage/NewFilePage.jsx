import InputForm from '../../Components/InputForm/InputForm'
import './NewFilePage.css'

export default function NewFilePage({user}) {
    return (
        <div className='new-file-page'>
            <h1>New File Page</h1>
            <InputForm user={user}/>
        </div>
    )
}