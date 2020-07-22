export interface MovieDetailPropsType {
  match: {
    params: {
      id: string
    }
  }
}

export interface TitleType {
  id: number
  title: string
  release_date: string
}

export interface TitlePropsType {
  orderId: number
  currentId: number
  movieId: number
  title: string
  date: string
}

export interface MovieType {
  title: string
  tagline: string
  overview: string
  genres: GenreType[]
  production_companies: ProdCompanyType[]
  runtime: number
  release_date: string
  revenue: number
  vote_average: number
  backdrop_path: string
  poster_path: string
}

export interface GenreType {
  id: number
  name: string
}

export interface ProdCompanyType {
  id: number
  logo_path: string
  name: string
  origin_country: string
}