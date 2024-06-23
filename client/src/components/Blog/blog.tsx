import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddCommentIcon from '@mui/icons-material/AddComment';
interface UserData {
    name: string;
    id: string;
}

interface Props {
    generateId: () => number;
    isNewPost: boolean;
    changeValue: () => void;
    authorName: string;
    isAdmin: boolean;
    getUserData: UserData;
    isUser: boolean;
}

interface BlogContent {
    id: string;
    title: string;
    content: string;
    date: string;
    author: string;
    likes: number;
}

interface LikedPost {
    userId: string;  // ID dell'utente che ha messo "mi piace"
    postId: string;  // ID del post a cui è stato messo "mi piace"
}

interface LikedList {
    postId:string;
    id: string;  // ID dell'utente che ha messo "mi piace"
    name: string;  // ID del post a cui è stato messo "mi piace"
}

export default function Blog(props: Props) {
    const [likedPosts, setLikedPosts] = useState<LikedPost[]>([]);
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
    const [isHide, setIsHide] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [blog, setBlog] = useState<BlogContent[]>([]);
    const [editingPostId, setEditingPostId] = useState<string | null>(null);
    const [likedList,setLikedList]=useState<LikedList[]>([]);
    const [isLikeList,setIsLikeList]=useState<boolean>(false);
    const [currentPostId,setCurrentPostId]=useState<string>("")

    useEffect(() => {
        setIsFormVisible(props.isNewPost);
    }, [props.isNewPost]);

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const idNumber = props.generateId().toString();
        const newIdText = `post-n-${idNumber}`;
        const newDate = new Date().toLocaleString();
        const author = props.authorName;
        setIsFormVisible(false);
        props.changeValue();

        const newPost: BlogContent = {
            id: newIdText,
            title: title || "Title undefined",
            content: content || "Content undefined",
            date: newDate,
            author: author,
            likes: 0
        };

        setBlog([...blog, newPost]);
        setTitle("");
        setContent("");
    }

    function handleTitle(event: ChangeEvent<HTMLInputElement>) {
        const newTitle = event.target.value;
        setTitle(newTitle);
    }

    function handleContent(event: ChangeEvent<HTMLTextAreaElement>) {
        const newContent = event.target.value;
        setContent(newContent);
    }

    function handleLikes(postId: string) {
        const userData = props.getUserData;
        const userId = userData.id;
        const userName = userData.name;

        if (userData.id && userName.length > 0) {
            // Check if the user has already liked the post
            const alreadyLiked = likedPosts.some(item => item.userId === userId && item.postId === postId);

            if (!alreadyLiked) {
                // User has not liked the post, allow them to like it
                setBlog(prevBlog =>
                    prevBlog.map(post =>
                        post.id === postId ? { ...post, likes: post.likes + 1 } : post
                    )
                );
                setLikedPosts([...likedPosts, { userId: userId, postId: postId }]);
                setLikedList([...likedList,{id:userId, name: userName , postId:postId}])
            } else {
                // User has already liked the post, allow them to unlike it
                setBlog(prevBlog =>
                    prevBlog.map(post =>
                        post.id === postId ? { ...post, likes: post.likes - 1 } : post
                    )
                );
                setLikedPosts(likedPosts.filter(item => !(item.userId === userId && item.postId === postId)));
                setLikedList(likedList.filter(item => !(item.id === userId && item.name === userName && item.postId === postId )));
            }
        } else {
            alert("Login to add like");
        }
    }

    function handleEdit(postId: string) {
        setIsHide(true);
        const post = blog.find(post => post.id === postId);
        if (post) {
            setEditingPostId(postId);
            setTitle(post.title);
            setContent(post.content);
            setIsFormVisible(true);
        } else {
            console.log("Post not found");
        }
    }

    function handleUpdate(event: FormEvent) {
        event.preventDefault();
        if (!editingPostId) return;

        const updatedBlog = blog.map(post =>
            post.id === editingPostId
                ? {
                    ...post,
                    title,
                    content
                }
                : post
        );

        setBlog(updatedBlog);
        setTitle("");
        setContent("");
        setEditingPostId(null);
        setIsFormVisible(false);
        setIsHide(false);
    }

    function handleDelete(postId: string) {
      const confirmDelete = window.confirm("Are you sure you want to delete this post ? ")
        if(confirmDelete){
        const updatedBlog = blog.filter(post => post.id !== postId);
        setBlog(updatedBlog);}else{
            return;
        }
    }

    function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.key === "Enter") {
            console.log("enter is clicked");
        }
    }

    function handleLikeList(postId:string){
        setIsLikeList(!isLikeList);
        setCurrentPostId(postId);

    }

    const hide = isHide ? "hide" : "";
    const overlay= isLikeList? "overlay": "";
    const hideLikeList = isLikeList? ""  :"hide";
    
    return (
        <div >
            {isFormVisible && (
                <div className="div-form">
                    <button title="close" type="button" onClick={props.changeValue} className="float-right-cross">X</button>
                    <form
                        id="blog-form"
                        action="Post"
                        onSubmit={editingPostId ? handleUpdate : handleSubmit}
                    >
                        <input
                            id="title-input"
                            className="input-title"
                            type="text"
                            onChange={handleTitle}
                            maxLength={100}
                            placeholder="Create title..."
                            value={title}
                        />
                        <textarea
                            id="blog-text-area"
                            className="input-content"
                            onChange={handleContent}
                            onKeyDown={handleKeyDown}
                            maxLength={10000}
                            placeholder="Write content..."
                            value={content}
                        />
                        <button className="post-btn" type="submit">
                            {editingPostId ? "Update" : "Post"}
                        </button>
                    </form>
                </div>
            )}

            {blog.map(post => (
                <div className={`${hide} div-post`} key={post.id}>
                    <h2 className="font-xxl">{post.title}</h2>
                    <pre className="font-xl text-dark-grey">{post.content}</pre>
                    <p className="font-xl cursive text-grey">
                        Author: <b><i>{post.author}</i></b>
                    </p>
                    <p className="font-l font-100 text-grey">
                        Created on: <b>{post.date}</b>
                    </p>
                    {props.isAdmin && (
                        <>
                            <button type="button" onClick={() => handleEdit(post.id)}>
                                Edit
                            </button>
                            <button className="delete-post" type="button" onClick={() => handleDelete(post.id)}>
                                Delete
                            </button>
                        </>
                    )}
                    <br />
                    <button
                        type="button"
                        className="no-style-btn"
                        onClick={() => handleLikes(post.id)}
                    >
                        {post.likes}
                        {likedPosts.some(item => item.userId === props.getUserData.id && item.postId === post.id) ? (
                            <FavoriteIcon color="error" />
                        ) : (
                            <FavoriteBorderIcon />
                        )}
                        
                    </button>
                    <button title="Add comment.." type="button" className="no-style-btn comment-btn"><AddCommentIcon/></button>
                    <br />
                    <button title="Check likes" type="button" className=" likes" onClick={()=>handleLikeList(post.id)}>
                     {post.likes} { post.likes > 1 ?("persons likes this post "):("person like this post") } </button>

                    <div className={`${overlay} ${hideLikeList}`}>
                    <div className={`like-list ${hideLikeList}`}>
                      
                    <button className="float-right-cross" type="button" onClick={()=>handleLikeList(post.id)}>X</button>
                   
                        <ul className="ul-no-style ">
                            <li className="text-center">Likes</li>
                            <li><hr /></li>
                            {likedList.filter(user => user.postId === currentPostId).length > 0 ? (
                                    likedList.filter(user => user.postId === currentPostId).map((user) => (
                        <li className="inline-block" key={user.id}>
                            <div className=" flex flex-row ">  
                        <img alt={user.name} className="user-img " src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>
                        <div className="  flex-row margin-likes-name ">
                         <p className="truncate" > {user.name} </p>
                         <p className="truncate"> username is jasnkjdfnjsdnjknjkfdsnakjndsn </p>
                         </div>
                         <div className="flex-row margin-likes-follow">
                        <button type="button">Follow</button>
                         </div>
                         </div>
                        
                         </li>
                        ))
                        ) : (
                         <li > No likes yet </li>
                        )}
                        </ul>
                        </div> 
                </div>
                </div>
            ))}
        </div>
    );
}