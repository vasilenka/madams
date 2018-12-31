import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import styles from './App.module.scss';
import classnames from 'classnames';

import Container from './layouts/Container/Container';
import LeftSection from './layouts/LeftSection/LeftSection';
import MainContent from './layouts/MainContent/MainContent';

import Navbar from './components/Navbar/Navbar';
import Text from './components/Text/Text';

import TextfieldPage from './container/TextfieldPage/TextfieldPage';
import TextPage from './container/TextPage/TextPage';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      options: ['Primary options', 'Secondary options']
    };
  }

  componentDidMount = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json =>
        this.setState({
          users: json
        })
      );
  };

  render() {
    return (
      <div className={classnames(styles.root)}>
        <Navbar />
        <Router>
          <React.Fragment>
            <Container fixLeft fixRight>
              <MainContent>
                <Route exact path="/text" component={TextPage} />
                <Route exact path="/textfield" component={TextfieldPage} />
              </MainContent>
            </Container>
            <LeftSection fixed className={styles.leftSection}>
              <Text heading6 component="h3" className={styles.sidebarTitle}>
                Components
              </Text>
              <Link to="/text">
                <Text className={styles.link}>Text</Text>
              </Link>
              <Link to="/textfield">
                <Text className={styles.link}>Textfield</Text>
              </Link>
            </LeftSection>
          </React.Fragment>
        </Router>
      </div>
    );
  }
}

export default App;
