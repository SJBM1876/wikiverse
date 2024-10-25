import React, { useState } from 'react';

export const AddArticleForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const articleData = {
      title,
      content,
      author,
      tags: tags.split(',').map(tag => tag.trim()), // Split tags into an array
    };
    onSubmit(articleData);
    // Reset form fields after submission
    setTitle('');
    setContent('');
    setAuthor('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
      />
      <textarea 
        placeholder="Content" 
        value={content} 
        onChange={(e) => setContent(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Author" 
        value={author} 
        onChange={(e) => setAuthor(e.target.value)} 
        required 
      />
      <input 
        type="text" 
        placeholder="Tags (comma separated)" 
        value={tags} 
        onChange={(e) => setTags(e.target.value)} 
      />
      <button type="submit">Add Article</button>
    </form>
  );
};
