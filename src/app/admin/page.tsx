// import { useSearchParams } from "next/navigation";
// import React, { useEffect } from "react";

// const page = () => {
//   // const params = useSearchParams();
//   // useEffect(() => {
//   //   const a = new URLSearchParams(params.toString());
//   //   console.log(params, a);
//   // }, []);
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//       <div className="bg-white p-6 rounded shadow">Total Orders: 124</div>
//       <div className="bg-white p-6 rounded shadow">
//         Total Revenue: ₹2,45,000
//       </div>
//       <div className="bg-white p-6 rounded shadow">Products: 34</div>
//     </div>
//   );
// };

// export default page;

// pages/index.js

"use client"
import React, { useState, useEffect } from "react";

type Post = {
  _id: string;
  title: string;
  content: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ title: "", content: "" });
    const res = await fetch("/api/posts");
    const data = await res.json();
    console.log(data)
    setPosts(data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Posts</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <button type="submit">Add Post</button>
      </form>
      <ul>
        {posts.map((p) => (
          <li key={p._id}>
            <h3>{p.title}</h3>
            <p>{p.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
