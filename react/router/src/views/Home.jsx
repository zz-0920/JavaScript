import {useNavigate} from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div>
            <h2>Home page</h2>
            <button onClick={()=>{navigate("/user?id=1");}}>User</button>
        </div>
    )
}

export default Home
