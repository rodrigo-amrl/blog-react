import './App.css';
import Header from './layout/Header';
import Nav from './layout/Nav';
import Footer from './layout/Footer';
import NewPost from "./pages/NewPost"
import EditPost from "./pages/EditPost"
import Home from './pages/Home';
import Missing from "./pages/Missing"
import PostPage from "./pages/PostPage"
import About from "./pages/About"
import { Route, Routes } from 'react-router-dom';
import useAxiosFech from './hooks/useAxiosFetch';
import { useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';

function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts)
  const { data, fetchError, isLoading } = useAxiosFech('http://localhost:3500/posts')

  
  useEffect(() => {
    setPosts(data)
  }, [data, setPosts])


  return (
    <div className="App">
      <Header title="React JS Blog" />
      <Nav />
      <Routes>
        <Route exact path='/' element={<Home isLoading={isLoading} fetchError={fetchError} />} />
        <Route path='/post' element={<NewPost />} />
        <Route path='/edit/:id' element={<EditPost />} />
        <Route path='/post/:id' element={<PostPage />} />
        <Route path='about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
