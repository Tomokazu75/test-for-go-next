"use client"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react"

type Post = {
    id: number;
    title: string;
    content: string;
}
const Page = () => {
    const {id} = useParams()
    const [edit, setEdit] = useState(false)
    const [post, setPost] = useState<Post>({
        id: 0,
        title: "",
        content: ""
    })
    useEffect(() => {
        const fetchPostFromId = async () => {
            const response = await fetch(`http://localhost:9090/posts/${id}`)
            if (!response.ok) {
                console.log("error")
            }
            const result = await response.json()
            setPost(result)
        }
        fetchPostFromId()
    }, [id])

    const editPost = async () => {
        try {
            const response = await fetch(`http://localhost:9090/posts/${id}`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            })
            if (!response.ok) {
                console.log("error")
            }
            const result = await response.json()
            console.log(result)
            // window.location.reload()
            setEdit(false)
        } catch(error) {
            console.log(error)
        }
    }

  return (
    <>
        <div>Your select is {post.id}</div>
        {edit ? (
            <>
            <input type="text" className="border" value={post.title} onChange={(e) => setPost({...post, title:e.target.value})} />
            <br/>
            <input type="text" className="border" value={post.content} onChange={(e) => setPost({...post, content:e.target.value})} />
            <br/>
            <button className="bg-green-400 p-2" onClick={editPost}>Change</button>
            </>
        ) : (
            <>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <button className="bg-green-400 p-2" onClick={() => {
                console.log(edit)
                setEdit((prevStatus) => !prevStatus)
            }}>Edit Mode</button>
            </>
        )}
    </>
  )
}

export default Page