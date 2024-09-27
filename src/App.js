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
import { useState } from 'react';
import useWindowsSize from './hooks/useWindowsSize';
import { DataProvider } from './context/DataContext';

function App() {
  const [search, setSearch] = useState('')
  const { width } = useWindowsSize()


  return (
    <div className="App">
      <Header title="React JS Blog" />
      <DataProvider>
        <Nav />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/post' element={<NewPost />} />
          <Route path='/edit/:id' element={<EditPost />} />
          <Route path='/post/:id' element={<PostPage />} />
          <Route path='about' element={<About />} />
          <Route path='*' element={<Missing />} />
        </Routes>
      </DataProvider>
      <Footer />
    </div>
  );
}

export default App;
