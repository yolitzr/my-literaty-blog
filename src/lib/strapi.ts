import type {
  StrapiListResponse,
  StrapiSingleResponse,
  Book,
  Author,
  Category,
  Post,
  Review,
  SobreMi,
  PoliticaDeResenas,
  BookishNewsEntry,
  WwwWednesdayEntry,
  TopTenTuesdayEntry,
  MonthlyWrapUpEntry,
  HomeData,
} from '@/types/strapi'

const STRAPI_URL = process.env.STRAPI_URL ?? 'http://localhost:1337'
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN

function getHeaders(): HeadersInit {
  return STRAPI_API_TOKEN
    ? { Authorization: `Bearer ${STRAPI_API_TOKEN}` }
    : {}
}

async function fetchStrapi<T>(
  path: string,
  params: Record<string, string> = {},
  options: RequestInit = {}
): Promise<T> {
  const url = new URL(`/api${path}`, STRAPI_URL)

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value)
  })

  const res = await fetch(url.toString(), {
    headers: getHeaders(),
    cache: 'no-store',
    ...options,
  })

  if (!res.ok) {
    throw new Error(
      `Strapi error ${res.status}: ${res.statusText} — ${url.pathname}${url.search}`
    )
  }

  return res.json() as Promise<T>
}

// ─── Books ────────────────────────────────────────────────────────────────────

export function getBooks(page = 1, pageSize = 10) {
  return fetchStrapi<StrapiListResponse<Book>>('/books', {
    populate: '*',
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
    sort: 'createdAt:desc',
  })
}

export function getBookBySlug(slug: string) {
  return fetchStrapi<StrapiListResponse<Book>>('/books', {
    'filters[slug][$eq]': slug,
    populate: '*',
  })
}

// ─── Authors ──────────────────────────────────────────────────────────────────

export function getAuthors() {
  return fetchStrapi<StrapiListResponse<Author>>('/authors', {
    populate: '*',
    sort: 'full_name:asc',
  })
}

export function getAuthorsWithBooks() {
  return fetchStrapi<StrapiListResponse<Author>>('/authors', {
    'populate[image][fields][0]': 'url',
    'populate[image][fields][1]': 'formats',
    'populate[image][fields][2]': 'alternativeText',
    'populate[books][populate][image][fields][0]': 'url',
    'populate[books][populate][image][fields][1]': 'formats',
    'populate[books][populate][review][fields][0]': 'rating',
    'populate[books][populate][review][fields][1]': 'slug',
    'populate[books][populate][genres][fields][0]': 'title',
    sort: 'full_name:asc',
  })
}

export function getAuthorBySlug(slug: string) {
  return fetchStrapi<StrapiListResponse<Author>>('/authors', {
    'filters[slug][$eq]': slug,
    'populate[image][fields][0]': 'url',
    'populate[image][fields][1]': 'formats',
    'populate[image][fields][2]': 'alternativeText',
    'populate[books][populate][image][fields][0]': 'url',
    'populate[books][populate][image][fields][1]': 'formats',
    'populate[books][populate][review][fields][0]': 'rating',
    'populate[books][populate][review][fields][1]': 'slug',
    'populate[books][populate][genres][fields][0]': 'title',
  })
}

// ─── Categories ───────────────────────────────────────────────────────────────

export function getCategories() {
  return fetchStrapi<StrapiListResponse<Category>>('/categories', {
    sort: 'name:asc',
  })
}

export function getCategoryBySlug(slug: string) {
  return fetchStrapi<StrapiListResponse<Category>>('/categories', {
    'filters[slug][$eq]': slug,
    populate: '*',
  })
}

// ─── Posts ────────────────────────────────────────────────────────────────────

export function getPosts(page = 1, pageSize = 10) {
  return fetchStrapi<StrapiListResponse<Post>>('/posts', {
    populate: '*',
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
    sort: 'createdAt:desc',
  })
}

export function getPostBySlug(slug: string) {
  return fetchStrapi<StrapiListResponse<Post>>('/posts', {
    'filters[slug][$eq]': slug,
    populate: '*',
  })
}

// ─── Reviews ──────────────────────────────────────────────────────────────────

export function getReviews(page = 1, pageSize = 10) {
  return fetchStrapi<StrapiListResponse<Review>>('/reviews', {
    populate: '*',
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
    sort: 'createdAt:desc',
  })
}

export function getReviewBySlug(slug: string) {
  return fetchStrapi<StrapiListResponse<Review>>('/reviews', {
    'filters[slug][$eq]': slug,
    populate: '*',
  })
}

// ─── Review detail (deep populate) ───────────────────────────────────────────

export function getReviewDetail(slug: string) {
  return fetchStrapi<StrapiListResponse<Review>>('/reviews', {
    'filters[slug][$eq]': slug,
    'populate[book][populate]': '*',
  })
}

export function getRelatedReviews(excludeSlug: string, limit = 3) {
  return fetchStrapi<StrapiListResponse<Review>>('/reviews', {
    'filters[slug][$ne]': excludeSlug,
    'populate[book][populate][image][fields][0]': 'url',
    'populate[book][populate][image][fields][1]': 'formats',
    'pagination[pageSize]': String(limit),
    sort: 'createdAt:desc',
  })
}

// ─── Reviews with deep book populate ─────────────────────────────────────────

export function getReviewsWithBooks(page = 1, pageSize = 100) {
  return fetchStrapi<StrapiListResponse<Review>>('/reviews', {
    'populate[book][populate]': '*',
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
    sort: 'createdAt:desc',
  })
}

// ─── Post detail & navigation ─────────────────────────────────────────────────

export function getPostDetail(slug: string) {
  return fetchStrapi<StrapiListResponse<Post>>('/posts', {
    'filters[slug][$eq]': slug,
    populate: '*',
  })
}

export function getPrevPost(createdAt: string) {
  return fetchStrapi<StrapiListResponse<Post>>('/posts', {
    'filters[createdAt][$lt]': createdAt,
    'populate[cover][fields][0]': 'url',
    'pagination[pageSize]': '1',
    sort: 'createdAt:desc',
  })
}

export function getNextPost(createdAt: string) {
  return fetchStrapi<StrapiListResponse<Post>>('/posts', {
    'filters[createdAt][$gt]': createdAt,
    'populate[cover][fields][0]': 'url',
    'pagination[pageSize]': '1',
    sort: 'createdAt:asc',
  })
}

export function getRelatedBlogPosts(excludeSlug: string, limit = 4) {
  return fetchStrapi<StrapiListResponse<Post>>('/posts', {
    'filters[slug][$ne]': excludeSlug,
    'populate[cover][fields][0]': 'url',
    'populate[cover][fields][1]': 'formats',
    'pagination[pageSize]': String(limit),
    sort: 'createdAt:desc',
  })
}

export function getPostsForBlog(page = 1, pageSize = 100) {
  return fetchStrapi<StrapiListResponse<Post>>('/posts', {
    populate: '*',
    'pagination[page]': String(page),
    'pagination[pageSize]': String(pageSize),
    sort: 'createdAt:desc',
  })
}

// ─── Posts by category ────────────────────────────────────────────────────────

export function getPostsByCategory(categorySlug: string, pageSize = 3) {
  return fetchStrapi<StrapiListResponse<Post>>('/posts', {
    populate: '*',
    'filters[categories][slug][$eq]': categorySlug,
    'pagination[pageSize]': String(pageSize),
    sort: 'createdAt:desc',
  })
}

// ─── Single types ─────────────────────────────────────────────────────────────

export function getSobreMi() {
  return fetchStrapi<StrapiSingleResponse<SobreMi>>('/sobre-mi', {
    'populate[photo][fields][0]': 'url',
    'populate[photo][fields][1]': 'formats',
    'populate[photo][fields][2]': 'alternativeText',
  })
}

export function getPoliticaDeResenas() {
  return fetchStrapi<StrapiSingleResponse<PoliticaDeResenas>>('/politica-de-resenas')
}

// ─── Home single type ─────────────────────────────────────────────────────────

export function getHome() {
  // populate=* trae hero_background, about_photo y featured_review (shallow)
  // Si featured_review tiene datos, se necesitará un populate más profundo
  return fetchStrapi<StrapiSingleResponse<HomeData>>('/home', {
    'populate[0]': 'hero_background',
    'populate[1]': 'about_photo',
    'populate[2]': 'featured_review',
  })
}

// ─── New content types ────────────────────────────────────────────────────────

export function getLatestBookishNews() {
  return fetchStrapi<StrapiListResponse<BookishNewsEntry>>('/bookish-news-entries', {
    'populate[image][fields][0]': 'url',
    'populate[image][fields][1]': 'formats',
    'pagination[pageSize]': '1',
    sort: 'date:desc',
  })
}

export function getLatestWwwWednesday() {
  return fetchStrapi<StrapiListResponse<WwwWednesdayEntry>>('/www-wednesdays', {
    'populate[cover_image][fields][0]': 'url',
    'populate[cover_image][fields][1]': 'formats',
    'populate[reading_next][populate][image][fields][0]': 'url',
    'populate[reading_next][populate][image][fields][1]': 'formats',
    'pagination[pageSize]': '1',
    sort: 'date:desc',
  })
}

export function getWwwWednesdayBySlug(slug: string) {
  return fetchStrapi<StrapiListResponse<WwwWednesdayEntry>>('/www-wednesdays', {
    'filters[slug][$eq]': slug,
    'populate[cover_image][fields][0]': 'url',
    'populate[cover_image][fields][1]': 'formats',
    'populate[cover_image][fields][2]': 'alternativeText',
    'populate[reading_next][fields][0]': 'title',
    'populate[reading_next][fields][1]': 'slug',
    'populate[reading_next][fields][2]': 'serie',
    'populate[reading_next][fields][3]': 'publication_date',
    'populate[reading_next][fields][4]': 'pages',
    'populate[reading_next][fields][5]': 'reading_status',
    'populate[reading_next][fields][6]': 'owned_format',
    'populate[reading_next][fields][7]': 'goodreads_link',
    'populate[reading_next][fields][8]': 'amazon_link',
    'populate[reading_next][fields][9]': 'synopsis',
    'populate[reading_next][populate][image][fields][0]': 'url',
    'populate[reading_next][populate][image][fields][1]': 'formats',
    'populate[reading_next][populate][author][fields][0]': 'full_name',
    'populate[reading_next][populate][author][fields][1]': 'slug',
    'populate[reading_next][populate][genres][fields][0]': 'title',
    'populate[reading_next][populate][publisher][fields][0]': 'name',
    'populate[categories][fields][0]': 'name',
    'populate[categories][fields][1]': 'slug',
  })
}

export function getRecentWwwWednesdays(excludeSlug: string, limit = 5) {
  return fetchStrapi<StrapiListResponse<WwwWednesdayEntry>>('/www-wednesdays', {
    'filters[slug][$ne]': excludeSlug,
    'populate[cover_image][fields][0]': 'url',
    'populate[cover_image][fields][1]': 'formats',
    'pagination[pageSize]': String(limit),
    sort: 'date:desc',
  })
}

export function getLatestTopTenTuesday() {
  return fetchStrapi<StrapiListResponse<TopTenTuesdayEntry>>('/top-ten-tuesdays', {
    'populate[cover][fields][0]': 'url',
    'populate[cover][fields][1]': 'formats',
    'pagination[pageSize]': '1',
    sort: 'date:desc',
  })
}

export function getTopTenTuesdayBySlug(slug: string) {
  return fetchStrapi<StrapiListResponse<TopTenTuesdayEntry>>('/top-ten-tuesdays', {
    'filters[slug][$eq]': slug,
    'populate[items][populate][book][populate][image][fields][0]': 'url',
    'populate[items][populate][book][populate][image][fields][1]': 'formats',
    'populate[items][populate][book][populate][author][fields][0]': 'full_name',
    'populate[items][populate][manual_cover][fields][0]': 'url',
    'populate[items][populate][manual_cover][fields][1]': 'formats',
    'populate[items][populate][categories][fields][0]': 'name',
    'populate[items][populate][categories][fields][1]': 'slug',
    'populate[categories][fields][0]': 'name',
    'populate[categories][fields][1]': 'slug',
  })
}

export function getRecentTopTenTuesdays(excludeSlug: string, limit = 5) {
  return fetchStrapi<StrapiListResponse<TopTenTuesdayEntry>>('/top-ten-tuesdays', {
    'filters[slug][$ne]': excludeSlug,
    'populate[cover][fields][0]': 'url',
    'populate[cover][fields][1]': 'formats',
    'pagination[pageSize]': String(limit),
    sort: 'date:desc',
  })
}

export function getLatestMonthlyWrapUp() {
  return fetchStrapi<StrapiListResponse<MonthlyWrapUpEntry>>('/monthly-wrap-ups', {
    'populate[cover_image][fields][0]': 'url',
    'populate[cover_image][fields][1]': 'formats',
    'pagination[pageSize]': '1',
    sort: 'year:desc,month:desc',
  })
}

export function getLibraryBooks(pageSize = 24) {
  return fetchStrapi<StrapiListResponse<Book>>('/books', {
    'populate[image][fields][0]': 'url',
    'populate[image][fields][1]': 'formats',
    'populate[author][fields][0]': 'full_name',
    'pagination[pageSize]': String(pageSize),
    sort: 'createdAt:desc',
  })
}
