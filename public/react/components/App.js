import React, { useEffect, useState } from 'react';
import { PagesList } from './PagesList';
import { ArticleDetails } from './ArticleDetails';
import { AddArticleForm } from './AddArticleForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import apiURL from '../api';

export const App = () => {
  const [pages, setPages] = useState([]);
  const [isAddingArticle, setIsAddingArticle] = useState(false);

  const fetchPages = async () => {
    try {
      const response = await fetch(`${apiURL}/wiki`);
      const pagesData = await response.json();
      setPages(pagesData);
    } catch (err) {
      console.log('Oh no, an error! ', err);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleAddArticle = async (articleData) => {
    try {
      const response = await fetch(`${apiURL}/wiki`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      if (response.ok) {
        await fetchPages();
        setIsAddingArticle(false); // Return to the list view after adding
      } else {
        console.error('Failed to add the article');
      }
    } catch (error) {
      console.error('Error adding the article:', error);
    }
  };

  const handleCancel = () => {
    setIsAddingArticle(false); // Return to the list view when canceled
  };

  return (
    <Router>
      <main>
        <h1>WikiVerse</h1>
        <h2>An interesting 📚</h2>
        {isAddingArticle ? (
          <AddArticleForm onSubmit={handleAddArticle} onCancel={handleCancel} />
        ) : (
          <>
            <button onClick={() => setIsAddingArticle(true)}>Add a New Article</button>
            <Routes>
              <Route path="/" element={<PagesList pages={pages} />} />
              <Route path="/article/:slug" element={<ArticleDetails fetchPages={fetchPages} />} />
            </Routes>
          </>
        )}
      </main>
    </Router>
  );
};














