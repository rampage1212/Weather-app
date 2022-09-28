import React from 'react';
import ContentSection from './content-section';
import '../stylesheets/app.less';

class App extends React.Component {
  render() {
    return (
      <div className="app-container">
        <ContentSection />
      </div>
    );
  }
}

export default App;
