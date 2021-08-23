import React from 'react';
import './App.css';
import FullMenu  from './components/Menu/FullMenu';
import { MenuProvider } from './StoreLogic/store';

function App() {

  // use effect to get full menu

  return (
    <MenuProvider>
      <FullMenu/>

      {/* <NavBar />
      <Greeting />
      <PickUpPoint />
      <FullMenu/>
        <PopularBrews/> 
          // <h1 Popular brews>
          // <map through <ItemCard />
        <SesonalItems />
          // <h1 Seasonal Teas>
          // <map through <ItemCard />
        <BottledItems />
          // <h1 Bottled Teas>
          // <map through <ItemCard /> */}
    </MenuProvider>
  );
}

export default App;
