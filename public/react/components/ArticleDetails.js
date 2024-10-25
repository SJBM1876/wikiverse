import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiURL from '../api';

export const ArticleDetails = ({ fetchPages }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${apiURL}/wiki/${slug}`);
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [slug]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${apiURL}/wiki/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Article deleted successfully');
        await fetchPages(); // Re-fetch the list of articles
        navigate('/'); // Redirect to the list of articles after deletion
      } else {
        console.error('Failed to delete the article');
      }
    } catch (error) {
      console.error('Error deleting the article:', error);
    }
  };

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h3>{article.title}</h3>
      <p><strong>Author:</strong> {article.author.name}</p>
      <p><strong>Email:</strong> {article.author.email}</p>
      <p><strong>Content:</strong> {article.content}</p>
      <p><strong>Tags:</strong> {article.tags.map(tag => tag.name).join(', ')}</p>
      <p><strong>Created At:</strong> {new Date(article.createdAt).toLocaleString()}</p>

      <button onClick={handleDelete}>Delete Article</button>
      <button onClick={() => navigate('/')}>Back to Wiki List</button>
    </div>
  );
};







