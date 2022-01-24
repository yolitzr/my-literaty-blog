import { Layout, Hero, Tabs } from "../components"
// Images
import imgHero from '../public/images/bg.jpg'

const PoliciesPage = () => {
  return (
    <Layout title="Policies">
      <Hero
        bgHero={imgHero.src}
        titleHero="Yolit's Books"
				subTitleHero="Compulsive Reader, Book Blogger and Reviewer"
      />
      <main className="container mx-auto p-8 lg:py-10 lg:px-14">
        <section className="py-16">
          <Tabs
            tabNameOne="Web Policies"
            tabNameTwo="Review Policies"
            tabOne="This site reserves the right to accept or refuse comments. That is, any comments made here will be monitored by the admin. This is done with the purpose of avoiding comments abusive, offensive or that create discomfort to the other visitors of the website. In addition to avoiding post comments that contain emails or links that the admin considers as passive advertising."
            tabTwo="Each review will be written by the author of the website, not taken for other blogs o site. in case it appears any opinion of another site or person, the link of the site/blog from which the information or notice of the name of the person was taken will be given, although this in reviews is something that did NOT happen. The information in the author’s biographies is original from Goodreads or the publisher’s website." 
          />
        </section>
      </main>
    </Layout>
  )
}

export default PoliciesPage