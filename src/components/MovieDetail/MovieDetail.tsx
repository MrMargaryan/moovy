import React, { FC, useState, useEffect } from 'react'
import { MovieDetailPropsType, MovieType } from '../../types'
import { fetchMovie } from '../../api'
import imageNotFound from '../../img/image-not-found.jpg'

import styles from './MovieDetail.module.scss'

const MovieDetail: FC<MovieDetailPropsType> = ({ match: { params: { id } } }) => {
  const [movie, setMovie] = useState<MovieType>()

  useEffect(() => {
    // Movie with id 65431 is default for homepage
    fetchMovie(id || '65431').then(
      results => setMovie(results),
      error => console.log(error)
    )

    document.body.style.backgroundImage = 'none'
  }, [id])

  if (!movie)
    return <p className={styles.loading}>Loading...</p>

  const {
    title,
    tagline,
    overview,
    genres,
    production_companies,
    runtime,
    release_date,
    revenue,
    vote_average,
    backdrop_path,
    poster_path
  } = movie

  if (backdrop_path) {
    document.body.style.backgroundImage = `linear-gradient(
        rgba(0, 0, 0, 0.85) 15%,
        rgba(0, 0, 0, 0.2) 40%,
        #000 90%
      ),
      url('https://image.tmdb.org/t/p/original${backdrop_path}')`
  }

  const renderReleaseDetails = (): JSX.Element[] => {
    return [
      { title: 'original release:', data: release_date || '–' },
      { title: 'running time:', data: runtime ? `${runtime} mins` : '–' },
      { title: 'box office:', data: revenue ? `$${revenue.toLocaleString()}` : '–' },
      { title: 'vote average:', data: vote_average ? `${vote_average}/10` : '–' }
    ].map(({ title, data }, index) => {
      return (
        <div key={index} className={styles.releaseDetail}>
          <h3 className={styles.releaseDetailTitle}>{title}</h3>
          <span className={styles.releaseDetailMetaData}>{data}</span>
        </div>
      )
    })
  }

  return (
    <div className={styles.movieWrapper}>
      <img
        src={poster_path ? `https://image.tmdb.org/t/p/w500${poster_path}` : imageNotFound}
        alt={poster_path && `'${title}' movie title`}
        className={styles.poster}
      />
      <div className={styles.metaData}>
        <h1 className={styles.title}>{title}</h1>
        {tagline && <p className={styles.tagline}>{tagline}</p>}
        {overview && <p className={styles.overview}>{overview}</p>}
        <div className={styles.additionalDetails}>
          {genres.length !== 0 && (
            <p className={styles.genres}>
              {genres.map(({ name }) => name).join(', ')}
            </p>
          )}
          {production_companies.length !== 0 && (
            <p className={styles.prodCompanies}>
              {production_companies.map(({ name }) => name).join(', ')}
            </p>
          )}
          <div className={styles.releaseDetails}>
            {renderReleaseDetails()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetail