import { Provider } from "react-redux";
import { store } from './state/store'
import RepositoriesList from './components/RepositoriesList';

const App = () => {
    return <Provider store={store}>
        <div>
            <h1>Search for a node package</h1>
            <RepositoriesList />
        </div>
    </Provider>
};

export default App;