import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PagesList } from './PagesList';
import { ArticleDetails } from './ArticleDetails';
import { AddArticleForm } from './AddArticleForm';
import apiURL from '../api';

export const App = () => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    async function fetchPages() {
      try {
        const response = await fetch(`${apiURL}/wiki`);
        const pagesData = await response.json();
        setPages(pagesData);
      } catch (err) {
        console.log('Oh no an error! ', err);
      }
    }

    fetchPages();
  }, []);

  const handleAddArticle = async (articleData) => {
    // Function to handle adding articles
  };

  return (
    <Router>
      <main>
        <h1>WikiVerse</h1>
        <h2>An interesting 📚</h2>
        <Routes>
          <Route path="/" element={<PagesList pages={pages} />} />
          <Route path="/article/:slug" element={<ArticleDetails />} />
          <Route path="/add" element={<AddArticleForm onSubmit={handleAddArticle} />} />
        </Routes>
      </main>
    </Router>
  );
};












