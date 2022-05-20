import React from 'react';
import "./pagination.css"
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination d-flex justify-content-center pg" >
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a style={{cursor: "pointer"}} onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;