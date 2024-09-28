import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { format } from "date-fns"
import { useStoreActions, useStoreState } from 'easy-peasy'

const EditPost = () => {


    const navigate = useNavigate()
    const { id } = useParams()

    const editTitle = useStoreState((state) => state.editTitle)
    const editBody = useStoreState((state) => state.editBody)

    const editPost = useStoreActions((actions) => actions.editPost)
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle)
    const setEditBody = useStoreActions((actions) => actions.setEditBody)
    const getPostById = useStoreState((state) => state.getPostById)
    const post = getPostById(id)

    useEffect(() => {
        if (post) {
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    }, [post, setEditTitle, setEditBody])

    const handleEdit = (id) => {
        const datetime = format(new Date(), "MMMM dd, yyyy pp");
        const updatePost = { id, title: editTitle, datetime, body: editBody }
        editPost(updatePost)
        navigate('/')

    }
    return (
        <main className='NewPost'>
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input type="text" id='postTitle' required value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                        <label htmlFor="postBody">Post</label>
                        <textarea required id="postBody" value={editBody} onChange={(e) => setEditBody(e.target.value)} >
                        </textarea>
                        <button type='button' onClick={(e) => handleEdit(post.id)}>Submit</button>
                    </form>
                </>
            }
            {
                !editTitle &&
                <>
                    <h2>Post Not Found</h2>
                    <p>well, that's disappointing.</p>
                    <p><Link to="/">Visit Our HomePage</Link></p>
                </>
            }
        </main>
    )
}

export default EditPost