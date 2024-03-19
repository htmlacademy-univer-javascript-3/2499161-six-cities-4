import MainScreen from '../pages/main-screen/main-screen';

function App({cardsNumber}: {cardsNumber: number}): JSX.Element {
  return (
    <MainScreen cardsNumber = {cardsNumber}/>
  );
}

export default App;
