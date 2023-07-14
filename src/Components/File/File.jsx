import './File.css'
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// export default function File() {
//     const PostList = () => {
//         const [posts, setPosts] = useState([]);
//     console.log(file)
// }
export default function FileList({user}) {
// const FileList = ({user}) => {
    const [Files, setFiles] = useState([]);
  
    const BASE_URL = "http://localhost:8000";
  
    const getFiles = async () => {
      try {
        const response = await fetch(BASE_URL + "/info/getFiles", {
            method: "POST",
            headers: {
                "content-Type": "application/json",
            },
            body: JSON.stringify({ "userid": user._id })
        });
        const allFiles = await response.json();
        setFiles(allFiles);
      } catch (err) {
        console.error(err);
      }
    };
    useEffect(() => {
      getFiles();
    }, []);
  
    return (
      <div className="file">
        <h2>Files </h2>
        <ul>
          {Files &&
            Files.map((file) => (
              <div className="" key={file._id}>
                <Link  to={`/filedetails/${file._id}`}>
                  <div className="title">
                  <h1>{file.title}</h1>
                  </div>
                  {/* <div className="ptags">
                  <p>{post.name}</p>
                  </div> */}
                  {/* <div className="HeartPost">
                  <HeartRating fixedRating={post.rating} setRating={() => {}} />
                  </div> */}
                </Link>
              </div>
            ))}
        </ul>
      </div>
    );
  };
  
//   export default FileList;