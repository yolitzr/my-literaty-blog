import HeroSection from "@/components/home/HeroSection";
import WeeklyPostsSection from "@/components/home/WeeklyPostsSection";
import FeaturedReviewSection from "@/components/home/FeaturedReviewSection";
import LibrarySection from "@/components/home/LibrarySection";
import NewsletterSection from "@/components/home/NewsletterSection";
import {
  getHome,
  getReviewsWithBooks,
  getLatestBookishNews,
  getLatestWwwWednesday,
  getLatestTopTenTuesday,
  getLatestMonthlyWrapUp,
  getLibraryBooks,
} from "@/lib/strapi";

const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

function strapiImgUrl(img: { url: string } | null | undefined): string | null {
  if (!img?.url) return null;
  return img.url.startsWith("http") ? img.url : `${STRAPI_URL}${img.url}`;
}

async function fetchHomeData() {
  const [homeRes, reviewsRes, bookishNewsRes, wwwRes, topTenRes, monthlyRes, libraryRes] =
    await Promise.allSettled([
      getHome(),
      getReviewsWithBooks(1, 1),
      getLatestBookishNews(),
      getLatestWwwWednesday(),
      getLatestTopTenTuesday(),
      getLatestMonthlyWrapUp(),
      getLibraryBooks(24),
    ]);

  const homeData = homeRes.status === "fulfilled" ? homeRes.value.data : null;
  // If Home has a featured_review set, use it; otherwise fall back to latest review
  const homeReview = homeData?.featured_review ?? null;
  const latestReview = reviewsRes.status === "fulfilled" ? (reviewsRes.value.data[0] ?? null) : null;

  return {
    homeData,
    featuredReview: homeReview ?? latestReview,
    bookishNews:    bookishNewsRes.status === "fulfilled" ? (bookishNewsRes.value.data[0] ?? null) : null,
    wwwWednesday:   wwwRes.status === "fulfilled"         ? (wwwRes.value.data[0] ?? null)         : null,
    topTen:         topTenRes.status === "fulfilled"      ? (topTenRes.value.data[0] ?? null)      : null,
    monthlyWrapUp:  monthlyRes.status === "fulfilled"     ? (monthlyRes.value.data[0] ?? null)     : null,
    libraryBooks:   libraryRes.status === "fulfilled"     ? libraryRes.value.data                  : [],
    libraryTotal:   libraryRes.status === "fulfilled"     ? libraryRes.value.meta.pagination.total : 0,
  };
}

export default async function Home() {
  const {
    homeData,
    featuredReview,
    bookishNews,
    wwwWednesday,
    topTen,
    monthlyWrapUp,
    libraryBooks,
    libraryTotal,
  } = await fetchHomeData();

  return (
    <>
      <HeroSection
        title={homeData?.hero_title}
        subtitle={homeData?.hero_subtitle}
        ctaText={homeData?.hero_cta_text}
        backgroundUrl={strapiImgUrl(homeData?.hero_background)}
      />
      <WeeklyPostsSection
        bookishNews={bookishNews}
        wwwWednesday={wwwWednesday}
        featuredReview={featuredReview}
        topTen={topTen}
        monthlyWrapUp={monthlyWrapUp}
      />
      <FeaturedReviewSection
        review={featuredReview}
        aboutSnippet={homeData?.about_snippet}
        aboutPhotoUrl={strapiImgUrl(homeData?.about_photo)}
      />
      <LibrarySection books={libraryBooks} total={libraryTotal} />
      <NewsletterSection
        title={homeData?.newsletter_title}
        subtitle={homeData?.newsletter_subtitle}
        quote={homeData?.footer_quote}
        quoteAuthor={homeData?.footer_quote_author}
      />
    </>
  );
}
