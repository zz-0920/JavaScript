import { useSearchParams } from "react-router-dom";

function User() {
    const [Params] = useSearchParams();
    const id = Params.get("id");
    return (
        <h2>User page -- {id}</h2>
    )
}

export default User;