import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import { Provider } from 'react-redux';

import Container from './layouts/Container/Container';
import LeftSection from './layouts/LeftSection/LeftSection';
import RightSection from './layouts/RightSection/RightSection';
import MainContent from './layouts/MainContent/MainContent';

import Navbar from './components/Navbar/Navbar';
import MenuContainer from './components/MenuContainer/MenuContainer';

import AppRoute from './AppRoute';
import TextfieldPage from './container/TextfieldPage/TextfieldPage';
import TextPage from './container/TextPage/TextPage';
import DashboardPage from './container/Dashboard/DashboardPage';
import ProjectPage from './container/ProjectPage/ProjectPage';
import UserPage from './container/UserPage/UserPage';
import Login from './layouts/Auth/Login';
import AuthenticationRoute from './layouts/Auth/AuthenticationRoute';
import store from './reducers';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route
              path="/"
              render={() => (
                <MainLayout>
                  <Switch>
                    <Route exact path="/" component={DashboardPage} />
                    <Route exact path="/text" component={TextPage} />
                    <Route exact path="/textfield" component={TextfieldPage} />
                    <Route exact path="/users/:id" component={UserPage} />
                    <Route
                      path="/"
                      render={props => (
                        <AuthenticationRoute {...props}>
                          <Route
                            exact
                            path="/projects/:id"
                            component={ProjectPage}
                          />
                        </AuthenticationRoute>
                      )}
                    />
                  </Switch>
                </MainLayout>
              )}
            />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

const MainLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Container fixLeft>
        <Navbar />
        <Container fixRight>
          <MainContent className={styles.mainContent}>{children}</MainContent>
        </Container>
      </Container>

      <LeftSection fixed className={styles.leftSection}>
        <AppRoute />
      </LeftSection>

      <RightSection fixed className={styles.rightSection}>
        <p>This is the right section</p>
      </RightSection>
      <MenuContainer />
    </React.Fragment>
  );
};

export default App;
