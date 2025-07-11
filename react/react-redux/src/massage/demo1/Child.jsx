import React from 'react'

export default function Child(props) {
    return (
        <div className="bd">
            <ul>
                {
                    props.list.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })
                }</ul>
        </div>
    )
}
