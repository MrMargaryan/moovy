import React, { FC } from 'react'
import { TitlePropsType } from '../../types/index'
import classNames from 'classnames'

import styles from './Title.module.scss'

const Title: FC<TitlePropsType> = ({ orderId, currentId, movieId, title, date }) => {
  const className = classNames(
    styles.title,
    orderId === currentId && styles.titleActive
  )

  const year = date && `(${date.split('-')[0]})`

  return (
    <li
      data-orderid={orderId}
      data-movieid={movieId}
      className={className}
    >
      {title} {year}
    </li>
  )
}

export default Title