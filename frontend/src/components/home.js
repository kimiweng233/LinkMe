import React, { useState, useEffect } from "react";
import services from '../services'

const Home = (props) => {

    const [items, setItems] = useState([]);

    useEffect(() => {
        services.getAllItems().then(response => {
            setItems(response.data)
        }).catch(() => {
            alert("Error Message")
        })
    }, [])

    return (
        <div>
            {items.map((item) => (
                <div>
                    <p>{item.name}</p>
                    <p>{item.created}</p>
                </div>
            ))}
        </div>
    )
}

export default Home