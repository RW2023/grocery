'use client';
import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-3xl">
          <span className="m-2">
            <span className="loading loading-bars loading-lg"></span>
          </span>{' '}
          Loading.....⏱️ Groceries...😋
        </p>
      </div>
    </div>
  );
};

export default Loading;
