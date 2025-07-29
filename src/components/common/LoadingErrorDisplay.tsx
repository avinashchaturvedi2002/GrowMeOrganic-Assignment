import React from 'react';

type LoadingErrorDisplayProps = {
  loading: boolean;
  error: Error | null;
  loadingMessage?: string;
};

const LoadingErrorDisplay: React.FC<LoadingErrorDisplayProps> = ({
  loading,
  error,
  loadingMessage = 'Loading data...',
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-gray-700">{loadingMessage}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-red-600">Error: {error.message}</p>
      </div>
    );
  }

  return null;
};

export default LoadingErrorDisplay;