export default function Child2({ list }) {
    return (
        <div className="bd">
            <ul>
                {
                    list.map((item) => {
                        return <li key={item}>{item}</li>
                    })
                }
            </ul>
        </div>
    )
}