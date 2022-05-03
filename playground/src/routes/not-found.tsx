import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div>
      <h2>Not found!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
