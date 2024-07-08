import React from 'react';

interface Props {
    hide: string;
    id: string;
    title: string;
    content: string;
    author: string;
    date: string;
    isAdmin: boolean;
    handleEdit: (id: string) => void;
    handleDelete: (id: string) => void;
}

const Post: React.FC<Props> = (props) => {
    return (
        <div>
        <h2 className="font-xxl">{props.title}</h2>
        <pre className="font-xl text-dark-grey">{props.content}</pre>
        <p className="font-xl cursive text-grey">
                <i>Author: {props.author}</i>
        </p>
        <p className="font-l font-100 text-grey">
            <i>Created on:  {props.date}</i>
        </p>
        {props.isAdmin && ( <> <button type="button" onClick={() => props.handleEdit(props.id)}>
            Edit
        </button> < button className = "delete-post" type = "button" onClick = {
            () => props.handleDelete(props.id)
        } > Delete </button>
                   </ >)}
                   </div>

    );
}

export default Post;


{  /*   <h2 className="font-xxl">{post.title}</h2>
<pre className="font-xl text-dark-grey">{post.content}</pre>
<p className="font-xl cursive text-grey">
        <i>Author: {post.author}</i>
</p>
<p className="font-l font-100 text-grey">
    <i>Created on:  {post.date}</i>
</p>
{props.isAdmin && ( <> <button type="button" onClick={() => handleEdit(post.id)}>
    Edit
</button> < button className = "delete-post" type = "button" onClick = {
    () => handleDelete(post.id)
} > Delete </button>
           </ >)} */}