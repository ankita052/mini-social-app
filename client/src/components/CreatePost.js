import { useState } from "react";
import axios from "axios";
import "../styles/Post.css";

function CreatePost() {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  // Handle image upload
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);   // base64
        setPreview(reader.result); // preview
      };

      reader.readAsDataURL(file);
    }
  };

  // Submit post
  const handlePost = async () => {
    if (!text && !image) {
      alert("Add text or image");
      return;
    }

    try {
      await axios.post("https://your-backend.onrender.com/login", {
        text,
        image
      });

      setText("");
      setImage("");
      setPreview("");

      alert("Post created");

      window.location.reload(); // simple refresh
    } catch (err) {
      console.log(err);
    }
  };

  return(
    <div className="create-post">

  <textarea
    placeholder="What's on your mind?"
    value={text}
    onChange={(e) => setText(e.target.value)}
  />

  <div className="post-controls">
    <label className="upload-btn">
      📷 Upload
      <input type="file" onChange={handleImage} hidden />
    </label>

    <button className="post-btn" onClick={handlePost}>
      Post
    </button>
  </div>

  {preview && <img src={preview} alt="preview" className="preview-img" />}

</div>
  )
}

export default CreatePost;
