"use client"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

type Posts = {
  id: number;
  title: string;
  content: string;
}

const Page = () => {
  const router = useRouter()
  const [posts, setPosts] = useState<Posts[]>([])
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:9090/posts")
      if (!response.ok) {
        console.log("error")
      }
      const result = await response.json()
      setPosts(result)
    }
    fetchPosts()
  }, [])

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
        <div className="text-3xl">all posts here</div>
        <input
          type="text"
          placeholder="Search posts"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 p-2 border border-gray-300"
        />
        <ul>
          {filteredPosts.map((post) => (
            <li key={post.id}>
              <button type="button" onClick={() => router.push(`/posts/${post.id}`)}>
                <h1 className="text-xl">{post.title}</h1>
                <p>{post.content}</p>
                <hr/>
              </button>
            </li>
          ))}
        </ul>
        
    </>
  )
}

export default Page