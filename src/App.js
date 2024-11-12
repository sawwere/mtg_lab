import './App.css';

import { SelectedCardProvider } from './providers/SelectedCardProvider';
import { DeckProvider } from './providers/DeckProvider';

import SearchMenu from "./components/search/SearchMenu";
import SelectedCard from './components/selectedCard/SelectedCard';
import DeckContainer from './components/deck/DeckContainer';
import Stats from './components/widgets/stats';

function App() {

    return (
        
        <DeckProvider>
            <SelectedCardProvider>
                <main className="main">
                    <SearchMenu />

                    <div className="content">
                        <SelectedCard />
                        <hr />
                        <DeckContainer />
                    </div>
                    <Stats />
                </main>
        
            
            </SelectedCardProvider>
        </DeckProvider>
        
  );
}

export default App;
