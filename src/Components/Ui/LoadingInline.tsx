'use client';
import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center">
        <p className="text-base-content">
          <span className="m-2">
            <span className="loading loading-bars loading-lg"></span>
          </span>{' '}
          Loading Meals 😋...☝🏾...⏱️
        </p>
      </div>
    </div>
  );
};

export default Loading;
