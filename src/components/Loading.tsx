import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-20">
      <div className="flex flex-col items-center space-y-4">
        <span className="loader"></span>
        <span className="text-sm text-muted-foreground animate-pulse-light">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loading;