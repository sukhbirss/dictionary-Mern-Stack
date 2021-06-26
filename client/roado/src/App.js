import { Route,Switch,useHistory } from 'react-router-dom'

import Home from './page/Home/Home'
import WordDetail from './page/WordDetail/WordDetail'

function App() {
  return (
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/:word" component={WordDetail}/>
        </Switch>
  );
}

export default App;
