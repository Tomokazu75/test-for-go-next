"use client"
import { useRouter } from "next/navigation"

const MenuBar = () => {
    const router = useRouter()

  return (
    <>
        <ul className="flex">
            <li>
                <button type="button" className="bg-red-400" onClick={() => router.push("/posts")}>Home</button>
            </li>
            <li>
                <button type="button" className="bg-blue-400" onClick={() => router.push("/posts/create")}>Create</button>
            </li>
        </ul>
    </>
  )
}

export default MenuBar