import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Auth from './utils/auth';
// import Chat from './components/Chat';
// import Course from './pages/Course';
import Footer from './components/Footer';
import Header from './components/Header';
// import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
// import NotFound from './pages/NotFound';
// import Profile from './pages/Profile';
import React from 'react';

// import Signup from './pages/Signup';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  },
  uri: '/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
        {Auth.loggedIn() ? (
          <>
          <Header />
          <div className="container">  
            <Switch>
              {/* <Route exact path="/home" component={Home} /> */}
              {/* <Route exact path="/login" component={Login} /> */}
              {/* <Route exact path="/signup" component={Signup} /> */}
              {/* <Route exact path="/profile" component={Profile} /> */}
              {/* <Route exact path='/course' component={Course} /> */}
              {/* <Route component={NotFound} />  */}
            </Switch>
            {/* <Chat /> */}
          </div>
          <Footer />
          </>
        ) : (
              <>
              <Route exact path="/" component={LandingPage} />
              </>
        )}
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;