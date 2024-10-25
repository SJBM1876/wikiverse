import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import { Page } from './Page';

export const PagesList = ({ pages }) => {
  return (
    <>
      {pages.map((page, idx) => (
        <Link key={idx} to={`/article/${page.slug}`}> {/* Use Link component for navigation */}
          <Page page={page} /> {/* Pass page data to Page component */}
        </Link>
      ))}
    </>
  );
};







