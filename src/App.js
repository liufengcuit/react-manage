import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect  } from 'react-router-dom';
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
                <Route path="/login" exact component={Login}></Route>
                <Route path="/dashboard" component={Main}></Route>
                <Redirect from="/*" to="/login"></Redirect>
             </Router>
        )
    }
}

export default App;
