import { TitleType } from '../types'
import axios from 'axios'
import dotenv from 'dotenv'
import { pickProperties } from '../utils'

dotenv.config()

const url = 'https://api.themoviedb.org/3'
const api_key = process.env.REACT_APP_API_KEY

export const fetchFirstFiveMovies = async (query: string) => {
  try {
    const { data: { results } } = await axios.get(`${url}/search/movie`, {
      params: { api_key, query }
    })

    const movies = results
      .slice(0, 5)
      .map(({ id, title, release_date }: TitleType) => ({ id, title, release_date }))

    return movies
  } catch (error) {
    console.log(error.message)
    return []
  }
}

export const fetchMovie = async (id: string) => {
  try {
    const { data } = await axios.get(`${url}/movie/${id}`, {
      params: { api_key }
    })

    return pickProperties(data, [
      'title',
      'tagline',
      'overview',
      'genres',
      'production_companies',
      'runtime',
      'release_date',
      'revenue',
      'vote_average',
      'backdrop_path',
      'poster_path'
    ])
  } catch (error) {
    console.log(error.message)
  }
}