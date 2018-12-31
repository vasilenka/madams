import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import styles from './App.module.scss';
import classnames from 'classnames';

import Container from './layouts/Container/Container';
import LeftSection from './layouts/LeftSection/LeftSection';
import MainContent from './layouts/MainContent/MainContent';

import Navbar from './components/Navbar/Navbar';
import Text from './components/Text/Text';

import TextfieldPage from './container/TextfieldPage/TextfieldPage';
import TextPage from './container/TextPage/TextPage';
import DashboardPage from './container/Dashboard/DashboardPage';

class App extends Component {
  routeGroup = [
    {
      routes: [
        { name: 'Dashboard', path: '/' },
      ]
    },
    {
      title: 'Components',
      routes: [
        { name: 'Text', path: '/text' },
        { name: 'Textfield', path: '/textfield' }
      ]
    },
  ];

  render() {
    return (
      <div className={classnames(styles.root)}>
        <Navbar />
        <Router>
          <React.Fragment>
            <Container fixLeft fixRight>
              <MainContent>
                <Switch>
                  <Route exact path="/" component={DashboardPage} />
                  <Route exact path="/text" component={TextPage} />
                  <Route exact path="/textfield" component={TextfieldPage} />
                </Switch>
              </MainContent>
            </Container>

            <LeftSection fixed className={styles.leftSection}>
              {this.routeGroup.map((group, groupIndex) => {
                return (
                  <React.Fragment key={groupIndex}>
                    {group.title && <Text
                      heading6
                      component="h3"
                      className={styles.sidebarTitle}
                    >
                      {group.title}
                    </Text>}
                    {group.routes.map((route, routeIndex) => {
                      return (
                        <Link key={routeIndex} to={route.path}>
                          <Text className={styles.link}>{route.name}</Text>
                        </Link>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </LeftSection>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
