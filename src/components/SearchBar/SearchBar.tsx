import React, {
  FC,
  useState,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
  MouseEvent
} from 'react'
import { TitleType } from '../../types'
import useDebounce from '../../hooks/useDebounce'
import { fetchFirstFiveMovies } from '../../api'
import Title from '../Title/Title'
import { useHistory } from 'react-router-dom'

import styles from './SearchBar.module.scss'

const SearchBar: FC = () => {
  const history = useHistory()

  const [movies, setMovies] = useState<TitleType[]>([])
  const [debouncedValue, setValue] = useDebounce('', 500)
  const [currentId, setCurrentId] = useState(-1)
  let timeout: number

  const onAutosuggestKeyDown = (event: KeyboardEvent<HTMLDivElement>): void => {
    switch (event.keyCode) {
      // Up arrow
      case 38:
        currentId === 0
          ? setCurrentId(4)
          : currentId === -1
            ? setCurrentId(4)
            : setCurrentId(prevState => prevState - 1)
        break
      // Down arrow
      case 40:
        currentId === 4
          ? setCurrentId(0)
          : setCurrentId(prevState => prevState + 1)
        break
      // Esc
      case 27:
        setMovies([])
        setCurrentId(-1)
        break
      // Enter
      case 13:
        if (currentId >= 0) {
          history.push(`/movie/${movies[currentId].id}`)
          setMovies([])
          setCurrentId(-1)
        }
        break
    }
  }

  const onAutosuggestBlur = (): void => {
    timeout = setTimeout(() => {
      setMovies([])
      setCurrentId(-1)
    })
  }

  const onAutosuggestFocus = (): void => {
    clearTimeout(timeout)
  }

  const onTermChange = async (event: ChangeEvent<HTMLInputElement>): Promise<any> => {
    setValue(event.target.value)
  }

  useEffect(() => {
    debouncedValue
      ? fetchFirstFiveMovies(debouncedValue)
        .then(
          results => setMovies(results),
          error => console.log(error)
        )
      : setMovies([])
  }, [debouncedValue])

  const onTitlesClick = (event: MouseEvent<HTMLUListElement>): void => {
    const movieId = (event.target as HTMLUListElement).getAttribute('data-movieid')
    if (movieId) {
      history.push(`/movie/${movieId}`)
      setMovies([])
      setCurrentId(-1)
    }
  }

  const onTitlesMouseOver = (event: MouseEvent<HTMLOListElement>): void => {
    const orderId = (event.target as HTMLOListElement).getAttribute('data-orderid')
    orderId && setCurrentId(+orderId)
  }

  const onTitlesMouseLeave = (): void => {
    setCurrentId(-1)
  }

  return (
    <div
      className={styles.autosuggest}
      tabIndex={0}
      onKeyDown={onAutosuggestKeyDown}
      onBlur={onAutosuggestBlur}
      onFocus={onAutosuggestFocus}
    >
      <input
        type="text"
        onChange={onTermChange}
        placeholder="Search Title..."
        className={styles.input}
      />
      {
        movies.length !== 0 && (
          <ol
            className={styles.titles}
            onClick={onTitlesClick}
            onMouseOver={onTitlesMouseOver}
            onMouseLeave={onTitlesMouseLeave}
          >
            {movies.map(({ id, title, release_date }, orderId) => {
              return (
                <Title
                  key={id}
                  orderId={orderId}
                  currentId={currentId}
                  movieId={id}
                  title={title}
                  date={release_date}
                />
              )
            })}
          </ol>
        )
      }
    </div>
  )
}

export default SearchBar
