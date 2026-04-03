import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Post.css";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});

  // 🔄 Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get("https://mini-social-app-oa2i.onrender.com/posts");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
      alert("Error fetching posts");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // ❤️ Like post
  const handleLike = async (id) => {
    try {
      await axios.put(`https://mini-social-app-oa2i.onrender.com/posts/${id}/like`);
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  // 💬 Add comment
  const handleComment = async (id) => {
    try {
      await axios.post(`https://mini-social-app-oa2i.onrender.com/posts/${id}/comment`, {
        text: commentText[id]
      });

      setCommentText({ ...commentText, [id]: "" });
      fetchPosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>

      {posts.map((post) => (
        <div key={post._id} className="post">

  <div className="post-header">
    👤 User
  </div>

  {post.text && <p>{post.text}</p>}

  {post.image && (
    <img src={post.image} alt="post" className="post-img" />
  )}

  <div className="post-actions">
    <button onClick={() => handleLike(post._id)}>
      ❤️ {post.likes.length}
    </button>

    <button>
      💬 {post.comments.length}
    </button>
  </div>

  {/* COMMENTS */}
  <div className="comments">
    {post.comments.map((c, i) => (
      <p key={i}>{c}</p>
    ))}
  </div>

  {/* ADD COMMENT */}
  <div className="comment-box">
    <input
      type="text"
      placeholder="Write a comment..."
      value={commentText[post._id] || ""}
      onChange={(e) =>
        setCommentText({
          ...commentText,
          [post._id]: e.target.value
        })
      }
    />

    <button onClick={() => handleComment(post._id)}>
      Post
    </button>
  </div>

</div>
      ))}

    </div>
  );
}

export default Feed;
