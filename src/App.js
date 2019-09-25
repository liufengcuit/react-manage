import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import Login from './pages/login';
import Main from './pages/main';

class App extends React.Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/login" exact component={Login}></Route>
                    <Route path="/dashboard" component={Main}></Route>
                </Switch>
             </Router>
        )
    }
}


export default App;
