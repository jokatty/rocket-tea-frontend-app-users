import logo from './logo.svg';
import './App.css';

function App() {

  // use effect to get full menu

  return (
    <>
      <NavBar />
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
          // <map through <ItemCard />

    </>
  );
}

export default App;
