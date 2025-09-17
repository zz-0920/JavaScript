import useListStore from '../store/index.js'

export default function List() {
    const { list } = useListStore()

    return (
        <div>
            <ul>
                {list.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    )
}
