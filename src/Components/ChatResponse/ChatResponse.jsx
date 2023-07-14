import './ChatResponse.css'

export default function ChatResponse({ line }) {
    return (
        <div className='chat-response'>
            <br />
            <p>{line}</p>
        </div>
    )
}