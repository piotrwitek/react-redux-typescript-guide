import React from 'react';
import { Link } from 'react-router-dom';

export function LayoutHeader() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  );
}
