'use client';
import { useEffect, useState } from "react"


const page = () => {
    const [shops, setShops] = useState([])
    const [name, setName] = useState("")
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            const formValue = {name:name}
            const response = await fetch("http://localhost:9090/shops", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValue)
                })
            const result = await response.json()
            console.log(result)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const fetchShops = async () => {
            const response = await fetch("http://localhost:9090/shops")
            const result = await response.json()
            setShops(result)
        }
    }, [])
  return (
    <>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">店名</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </form>
        <div>Choose shop!</div>
        {shops.map((shop) => (
            <li>
                <button>{shop.name}</button>
            </li>
        ))}
    </>
  )
}

export default page