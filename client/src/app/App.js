import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import styles from './App.module.scss';

import Container from './layouts/Container/Container';
import LeftSection from './layouts/LeftSection/LeftSection';
import MainContent from './layouts/MainContent/MainContent';

import Navbar from './components/Navbar/Navbar';

import AppRoute from './AppRoute';
import TextfieldPage from './container/TextfieldPage/TextfieldPage';
import TextPage from './container/TextPage/TextPage';
import DashboardPage from './container/Dashboard/DashboardPage';
import ProjectPage from './container/ProjectPage/ProjectPage';
import UserPage from './container/UserPage/UserPage';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

class App extends Component {
  render() {
    return (
      <div className={styles.root}>
        <ApolloProvider client={client}>
          <Navbar />
          <Router>
            <React.Fragment>
              <Container fixLeft fixRight>
                <MainContent>
                  <Switch>
                    <Route exact path="/" component={DashboardPage} />
                    <Route exact path="/text" component={TextPage} />
                    <Route exact path="/textfield" component={TextfieldPage} />
                    <Route exact path="/projects/:id" component={ProjectPage} />
                    <Route exact path="/users/:id" component={UserPage} />
                  </Switch>
                </MainContent>
              </Container>

              <LeftSection fixed className={styles.leftSection}>
                <AppRoute />
              </LeftSection>
            </React.Fragment>
          </Router>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
