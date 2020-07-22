import React, { FC } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import Header from '../Header/Header'
import MovieDetail from '../MovieDetail/MovieDetail'
import Footer from '../Footer/Footer'

import styles from './App.module.scss'

const App: FC = () => {
  return (
    <div className={styles.contentWrapper} >
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={MovieDetail} />
          <Route path="/movie/:id" component={MovieDetail} />
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}

export default App
