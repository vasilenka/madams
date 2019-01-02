import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import styles from './App.module.scss';

import Container from './layouts/Container/Container';
import LeftSection from './layouts/LeftSection/LeftSection';
import RightSection from './layouts/RightSection/RightSection';
import MainContent from './layouts/MainContent/MainContent';

import Navbar from './components/Navbar/Navbar';
import Brand from './components/Brand/Brand';
import MenuContainer from './components/MenuContainer/MenuContainer';

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
      <ApolloProvider client={client} className={styles.root}>
        <Router>
          <React.Fragment>
            <Container fixLeft>
              <Navbar />
              <Container fixRight>
                <MainContent className={styles.mainContent}>
                  <Switch>
                    <Route exact path="/" component={DashboardPage} />
                    <Route exact path="/text" component={TextPage} />
                    <Route exact path="/textfield" component={TextfieldPage} />
                    <Route exact path="/projects/:id" component={ProjectPage} />
                    <Route exact path="/users/:id" component={UserPage} />
                  </Switch>
                </MainContent>
              </Container>
            </Container>

            <LeftSection fixed className={styles.leftSection}>
              <AppRoute />
            </LeftSection>
            <RightSection fixed className={styles.rightSection}>
              <p>This is the right section</p>
              <Brand />
            </RightSection>
            <MenuContainer />
          </React.Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
