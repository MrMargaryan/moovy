import React, { FC } from 'react'

import styles from './Footer.module.scss'

const Footer: FC = () => {
  return (
    <footer className={styles.footer}>
      <a href="https://github.com/MrMargaryan" className={styles.link}>
        Hamlet Margaryan
      </a>
      <p className={styles.moscowLove}>
        Made with <span title="Stop watching movies. Go and study JS" className={styles.heart}>&#9829;</span> in Moscow
      </p>
    </footer>
  )
}

export default Footer
