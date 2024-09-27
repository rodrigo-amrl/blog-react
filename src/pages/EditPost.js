import React from 'react'
import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
const EditPost = ({ posts, HandleEdit, editPost, setEditBody, editTitle, setEditTitle }) => {
    const { id } = useParams()
    const post = posts.find(post => (post.id).toString() === id);

    useEffect(() => {
        if (post) {
            setEditBody(post.title)
            setEditBody(post.body)
        }
    }, [post, setEditTitle, setEditBody])

    return (
        <main className='NewPost'>
            {editTitle &&
                <>
                    <h2>New Post</h2>
                    <form className='newPostForm' onSubmit={(e) => e.preventDefault()}>
                        <label htmlFor="postTitle">Title:</label>
                        <input type="text" id='postTitle' required value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                        <label htmlFor="postBody">Post</label>
                        <textarea required id="postBody" value={editBody} onChange={(e) => setEditBody(e.target.value)} >
                        </textarea>
                        <button type='submit'>Submit</button>
                    </form>
                </>
            }
        </main>
    )
}

export default EditPost