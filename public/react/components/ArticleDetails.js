import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiURL from '../api';

export const ArticleDetails = () => {
  const { slug } = useParams(); // Extract the slug from the URL
  const navigate = useNavigate();
  const [article, setArticle] = useState(null); // State to hold the article data
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`${apiURL}/wiki/${slug}`);
        
        if (!response.ok) {
          throw new Error(`Error fetching article: ${response.statusText}`);
        }

        const data = await response.json();
        setArticle(data); // Update state with the article data
      } catch (error) {
        console.error('Error fetching article:', error);
        setError('Failed to load the article. Please try again.');
      } finally {
        setLoading(false); // Set loading to false after request completes
      }
    };

    fetchArticle();
  }, [slug]);

  // Display loading, error, or article content
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h3>{article.title}</h3>
      <p><strong>Author:</strong> {article.author?.name}</p>
      <p><strong>Content:</strong> {article.content}</p>
      <p><strong>Tags:</strong> {article.tags?.map(tag => tag.name).join(', ')}</p>
      <p><strong>Date:</strong> {new Date(article.createdAt).toLocaleDateString()}</p>
      <button onClick={() => navigate('/')}>Back to Wiki List</button>
    </div>
  );
};





