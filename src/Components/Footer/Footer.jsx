import "./Footer.css"
import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <div className="footer">
            <Link target="blank" to="https://github.com/kailahk">
                <img src="https://i.imgur.com/UqZKJZN.png" alt="github logo" />
            </Link>
            <Link target="blank" to="https://kailahkorsh.com/">
                <img src="https://i.imgur.com/BaPmdWc.png" alt="kailah's website logo" />
            </Link>
            <Link target="blank" to="https://www.linkedin.com/in/kailah-korsh/">
                <img src="https://i.imgur.com/lt3NEt6.png" alt="linkedin logo" />
            </Link>
        </div>
    )
}