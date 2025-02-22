import React from 'react';

function Logo({ width = '100px' }) {
  return (
    <div style={{ width }}>
      <img 
        src="/blog-logo.png" 
        alt="Blog Logo"
        className="w-full" 
      />
    </div>
  );
}

export default Logo;
