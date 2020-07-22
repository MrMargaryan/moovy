import React, { FC } from 'react'
import { NavLink } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'

import styles from './Header.module.scss'

const Header: FC = () => {
  return (
    <header className={styles.header}>
      <NavLink to="/" className={styles.logo}>Moovy</NavLink>
      <SearchBar />
    </header>
  )
}

export default Header
