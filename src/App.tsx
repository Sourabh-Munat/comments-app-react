import React from 'react';
import { Comments } from './Comments';
import commentsData from './commentsData.json';

export const App: React.FC = () => {
  return (
    <div className="App">
      <ul>
      <Comments comments={commentsData} />
      </ul>
    </div>
  );
}

export default App;
