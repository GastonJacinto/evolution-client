import React from 'react';
import './loading.css';
export default function Loading() {
  return (
    <div className="fixed w-full inset-0 flex items-center justify-center ">
      <span className="loader"></span>
    </div>
  );
}
