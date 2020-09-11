import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Todo from './components/Todo';


class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={Todo}/>
                </div>
            </Router>
        )
    }
}

export default App
