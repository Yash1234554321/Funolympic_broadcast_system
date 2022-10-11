import {useState,useEffect} from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";

export default function Search() {
  const [loading,setLoading] = useState(false);
  const [posts,setPosts] = useState<any[]>([]);
  const [searchTitle,setSearchTitle] = useState<any>([]); 

  useEffect(() => {
      const loadPosts = async () => {
        setLoading(true);
        const response = await axios.get("http://127.0.0.1:8000/livegame/")
        setPosts(response.data);
        setLoading(false);
      }
      loadPosts();
  },[])

  return (
    <div style={{ margin: "5px 10px" }}>
      <Input
        placeholder="Search Live Games"
        onChange={(e) => setSearchTitle(e.target.value)}
      />
    </div>
  );
}
