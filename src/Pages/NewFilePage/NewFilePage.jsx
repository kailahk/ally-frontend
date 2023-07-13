import InputForm from '../../Components/InputForm/InputForm'
import './NewFilePage.css'

export default function NewFilePage({user}) {
    return (
        <>
            <h1>New File Page</h1>
            <InputForm user={user}/>
        </>
    )
}