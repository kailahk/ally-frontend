import './File.css'
import { useState, useEffect } from "react";

// export default function File() {
//     const PostList = () => {
//         const [posts, setPosts] = useState([]);
//     console.log(file)
// }
const FileList = ({user}) => {
    const [Files, setFiles] = useState([]);
  
    const BASE_URL = "http://localhost:9000";
  
    const getFiles = async () => {
      try {
        const response = await fetch(BASE_URL + "/getFiles", {
            body: { "userid": user._id }
        });
        const allFiles = await response.json();
        setFiles(allFiles);
        console.log(allFiles);
      } catch (err) {
        console.error(err);
      }
    };
    useEffect(() => {
      getFiles();
    }, []);
  
    return (
      <>
        <h2>Files in Lists</h2>
        <ul>
          {Files &&
            Files.map((file) => (
              <div className="HomePosts">
                {/* <Link key={post._id} to={`/post/${post._id}`}> */}
                  <div className="title">
                  <h1>{file.title}</h1>
                  </div>
                  <div className="ptags">
                  <p>{post.name}</p>
                  </div>
                  <div className="HeartPost">
                  <HeartRating fixedRating={post.rating} setRating={() => {}} />
                  </div>
                {/* </Link> */}
              </div>
            ))}
        </ul>
      </>
    );
  };
  
  export default PostList;