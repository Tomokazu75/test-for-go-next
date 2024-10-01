"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"

const Page = () => {
    const router = useRouter()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        try {
            const formValue = {title: title, content: content}
            const response = await fetch("http://localhost:9090/posts/create", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formValue)
            })
            const result = await response.json()
            console.log(result)
            router.push("/posts")
        } catch(error) {
            console.log(error)
        }
        
    }
  return (
    <>
        <h1>Create a post</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="border" />
            <label htmlFor="content">Content</label>
            <input type="text" id="content" value={content} onChange={(e) => setContent(e.target.value)} className="border" />
            <button type="submit">Submit</button>
        </form>
    </>
  )
}

export default Page