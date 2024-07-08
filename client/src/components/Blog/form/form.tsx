import React from 'react';

interface Props {
  changeValue: () => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleUpdate: (event: React.FormEvent<HTMLFormElement>) => void;
  editingPostId: string | null;
  content: string;
  title: string;
  handleTitle: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleContent: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  isUpdating: boolean;
  handleCloseWhileUpdate: () => void;
}

export default function Form(props: Props) {
  return (
    <div>
      <button
        title="close"
        type="button"
        onClick={props.isUpdating ? props.handleCloseWhileUpdate : props.changeValue}
        className="float-right-cross"
      >
        X
      </button>
      <form
        id="blog-form"
        action="Post"
        onSubmit={props.editingPostId ? props.handleUpdate : props.handleSubmit}
      >
        <input
          id="title-input"
          className="input-title"
          type="text"
          onChange={props.handleTitle}
          maxLength={100}
          placeholder="Create title..."
          value={props.title}
        />
        <textarea
          id="blog-text-area"
          className="input-content"
          onChange={props.handleContent}
          maxLength={10000}
          placeholder="Write content..."
          value={props.content}
        />
        <button className="post-btn" type="submit">
          {props.editingPostId ? 'Update' : 'Post'}
        </button>
      </form>
    </div>
  );
}

/* 
<button
                        title="close"
                        type="button"
                        onClick={ isUpdating? (handleCloseWhileUpdate):(props.changeValue) }
                        className="float-right-cross">X</button>
                    <form
                        id="blog-form"
                        action="Post"
                        onSubmit={editingPostId
                        ? handleUpdate
                        : handleSubmit}>
                        <input
                            id="title-input"
                            className="input-title"
                            type="text"
                            onChange={handleTitle}
                            maxLength={100}
                            placeholder="Create title..."
                            value={title}/>
                        <textarea
                            id="blog-text-area"
                            className="input-content"
                            onChange={handleContent}
                            maxLength={10000}
                            placeholder="Write content..."
                            value={content}/>
                        <button className="post-btn" type="submit">
                            {editingPostId
                                ? "Update"
                                : "Post"}
                        </button>
                    </form> */