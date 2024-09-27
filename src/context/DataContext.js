import { createContext, useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { format } from "date-fns"
import api from "../api/posts"
import useAxiosFech from '../hooks/useAxiosFetch';


const DataContext = createContext({})
export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')
    const navigate = useNavigate()
    const { data, fetchError, isLoading } = useAxiosFech('http://localhost:3500/posts')


    useEffect(() => {
        setPosts(data)
    }, [data])

    useEffect(() => {
        const filteredResults = posts.filter(post => ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase()))
        setSearchResults(filteredResults.reverse())
    }, [posts, search])
    const handleEdit = async (id) => {
        const datetime = format(new Date(), "MMMM dd, yyyy pp");
        const updataPost = { id, title: editTitle, datetime, body: editBody }
        try {
            const response = await api.put(`/posts/${id}`, updataPost)
            setPosts(posts.map(post => post.id === id ? { ...response.data } : post))
            setEditTitle('')
            setEditBody('')
            navigate('/')
        } catch (err) {
            console.log(`Error ${err.message}`)
        }
    }
    const handleDelete = async (id) => {
        try {
            await api.delete(`/posts/${id}`)
            const postLists = posts.filter(post => post.id !== id);
            setPosts(postLists)
            navigate("/")
        } catch (err) {
            console.log(`Error ${err.message}`)
        }
    }

    return (
        <DataContext.Provider value={{
            search, setSearch, searchResults, fetchError, isLoading,
            posts, handleEdit, editBody, setEditBody, editTitle, setEditTitle,
            handleDelete
        }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;