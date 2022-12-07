import React from 'react';
import Document from './document/Document';
import View from '../components/layouts/View';
import Window from '../components/layouts/Window';

const Home: React.FC = () => {
  return (
    <div>
      <Window>
        <View>
          <Document></Document>
        </View>
      </Window>
    </div>
  );
};

export default Home;
