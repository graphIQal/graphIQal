import React from 'react';
import View from '../components/layouts/View';
import Window from '../components/layouts/Window';
import HoveringToolbar from '../components/organisms/HoveringToolbar';
import SplitPaneDocument from './document/SplitPaneDocument';
import HomeNode from './HomeNode';

const Home: React.FC = () => {
  return (
    <div>
      <Window>
        <View>
          <HomeNode />
          {/* <SplitPaneDocument></SplitPaneDocument> */}
        </View>
      </Window>
    </div>
  );
};

export default Home;
