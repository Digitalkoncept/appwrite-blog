'use client';
import Link from "next/link";
import React,{useEffect,useState} from "react";
import { Client,Databases} from 'appwrite';
import Container from "@/components/container";
import PostList from "@/components/postlist";

export default function Post() {
  const [posts,setPosts] = useState([]);
  async function getPosts(){
    try {
      const client = new Client();
      client
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);
   
      const databases = new Databases(client);
   
      const data2 = await databases.listDocuments('64abdeb1161c4e6f3d87', '64abe74886aada3e9d93'); 
      if(data2){
        setPosts(data2.documents);
      }
      console.log("post now found");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getPosts();
  }, [])
  console.log(posts);

  return (
    <>
   
      {posts && (
        <Container>
          <div className="grid gap-10 md:grid-cols-2 lg:gap-10 ">
            {posts?.slice(0, 2).map(post => (
              <PostList
                key={post?._id}
                post={post}
                aspect="landscape"
                preloadImage={true}
              />
            ))}
          </div>
          <div className="mt-10 grid gap-10 md:grid-cols-2 lg:gap-10 xl:grid-cols-3 ">
            {posts?.slice(2, 14).map(post => (
              <PostList key={post._id} post={post} aspect="square" />
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <Link
              href="/"
              className="relative inline-flex items-center gap-1 rounded-md border border-gray-300 bg-white px-3 py-2 pl-4 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 disabled:pointer-events-none disabled:opacity-40 dark:border-gray-500 dark:bg-gray-800 dark:text-gray-300">
              <span>View all Posts</span>
            </Link>
          </div>
        </Container>
      )}
    </>
  );
}
