import React from 'react';

const LesionAnalyzer: React.FC = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lesion Analyzer</h2>
      <p className="text-gray-600">Upload a lesion image and evaluate it using ABCDE criteria. Future versions will support ML-based classification.</p>
    </div>
  );
};

export default LesionAnalyzer;
