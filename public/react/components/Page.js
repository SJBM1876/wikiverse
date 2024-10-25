import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Page = ({ page }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${page.slug}`); // Navigate to article details page using slug
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <h3>{page.title}</h3> {/* Article Title */}
    </div>
  );
};










