import './App.css';
import Header from './layout/Header';
import Nav from './layout/Nav';
import Footer from './layout/Footer';
import NewPost from "./pages/NewPost"
import Home from './pages/Home';
import Missing from "./pages/Missing"
import PostPage from "./pages/PostPage"
import About from "./pages/About"
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { format } from "date-fns"

function App() {
  const [posts, setPosts] = useState([
    {
        "id": 1,
        "title": "First Post",
        "datetime": "July 01, 2021 11:17:36 AM",
        "body": "Description test"
    },
    {
        "id": 2,
        "title": "Second Post",
        "datetime": "July 01, 2021 11:17:36 AM",
        "body": "Description test"
    }
])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const filteredResults = posts.filter(post => ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase()))
    setSearchResults(filteredResults.reverse())
  }, [posts, search])
  const handleDelete = (id) => {
    const postLists = posts.filter(post => post.id !== id);
    setPosts(postLists)
    navigate("/")
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;

    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = { id, title: postTitle, datetime, body: postBody }
    const allPosts = [...posts, newPost]

    setPosts(allPosts)
    setPostTitle('')
    setPostBody('')
    navigate("/")

  }
  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route exact path='/' element={<Home posts={searchResults} />} />
        <Route path='/post' element={<NewPost postTitle={postTitle} setPostTitle={setPostTitle} postBody={postBody} setPostBody={setPostBody} handleSubmit={handleSubmit} />} />
        <Route path='/post/:id' element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        <Route path='about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
