import { Layout, Hero, Tabs } from "../components"
// Images
import imgHero from '../public/images/bg.jpg'

const PoliciesPage = () => {
  const webPolicies = `
    <p><strong><em>Yolit's Books</strong> is a literary website that was created to shared information about book releases and reviews.</em> This website is not a place to download books.</p>
    <br/>
    <p>This site reserves the right to accept or refuse comments. That is, any comments made here will be monitored by the admin. This is done with the purpose of avoiding comments abusive, offensive or that create discomfort to the other visitors of the website. In addition to avoiding post comments that contain emails or links that the admin considers as passive advertising.</p>
    <br/>
    <p>Each review will be written by the author of the website, not taken for other blogs o site. in case it appears any opinion of another site or person, the link of the site/blog from which the information or notice of the name of the person was taken will be given, although this in reviews is something that did NOT happen. The information in the author’s biographies is original from Goodreads or the publisher’s website.</p>
    <br/>
    <p>If you are an author or publisher who wants to collaborate with the site, you can contact me via the email <em><u>info@yolitsbooks.com</u></em>. Also, if you are a visitor of the blog you want to contact me for suggestions, help or anything else, you can do it by the same means mentioned above.</p>
  `

  const webReview = `
    <p>¡Hi! Thank you for visiting my website. First of all, I want to tell you that right now I am only agreeing to review NetGalley’s ARC or that it belongs to my favourite authors or publishers. If after reading my politic you are interested in requesting a review, you can contact me by email <em><u>info@yolitsbooks.com</em></u>.</p>

    <p>I clarify that most of the books reviewed and for reviewing are books that I have bought because they call me to attention or some special case of a request to some publisher.</p>

    <p>As a book reviewer, I currently have a slow pace so I can take a maximum of ten (10) days to read and critique the book. In case it takes a little longer for any reason I will notify the author or publisher. If you want the review at a specific time you must notify it to re-organize my reading priorities. Netgalley reviews will always be available the day the book is published, they will never be available before unless requested by the publisher.</p>

    <p>In case of not finishing the book, I will send first an email to the author/publisher explaining my reasons and if they decide I will publish my review of what I read and why I could not finish it.</p>
    <br/>
    <p><strong><u>My style of reviews</u></strong></p>

    <p>As a rule, when I write my reviews, I try not to go that far. For me, a short, eye-catching review works better than many meaningless words repeating the same thing. Of course, there will always be a hype moment in which it will be almost inevitable not to extend myself and speak a thousand wonders of history. But, mostly it will have between 1500 and 3000 characters.</p>

    <p>I will always make a small summary (without spoiler) of the book, I will try to make it different to the synopsis, so the reader gets a clearer idea of what can be found within the story. In addition to that, I will explain a little about the plot and what it seemed to me and finally my feelings about the whole reading.</p>
    <br/>
    <p><strong><u>My rating system</u></strong></p>
    <br/>
    <i class="fas fa-star"></i> -  I didn’t like it, probably won’t even finish it.
    <br/>
    <i class="fas fa-star"></i><i class="fas fa-star"></i> - It took me a bit, I couldn’t connect with the plot or characters, but I got to the end and that’s a great achievement.
    <br/>
    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> - A good read. Entertaining but missing something. I would recommend it to others at their own risk.
    <br/>
    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> -  An excellent book. I would definitely recommend it whenever I can.
    <br/> 
    <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i> - Reading required for all readers.
    <br/>
    <br/>
    <p>Now, a very important topic when sending a digital or printed book. My favourite genders and that I always read.</p>

    <p>My readings are mostly in the Adult, Young Adult, New Adult, and Middle Grade genre, and include the following:</p>
    <i class="fas fa-heart"></i> Romantic Suspense
    <br/>
    <i class="fas fa-heart"></i>  Thriller / Psychological Thriller / Mystery Thriller
    <br/>
    <i class="fas fa-heart"></i>  Crime
    <br/>
    <i class="fas fa-heart"></i>  Retelling
    <br/>
    <br/>
    <p>Books outside the aforementioned theme will surely not be accepted unless it is Horror, which I could evaluate and accept if the cover and synopsis call my attention.</p>

    <p>And this is all… See ya!</p>
  `
  return (
    <Layout title="Web and Review Policies">
      <Hero
        bgHero={imgHero.src}
        titleHero="Yolit's Books"
				subTitleHero="Compulsive Reader, Book Blogger and Reviewer"
      />
      <main className="container mx-auto p-8 lg:py-10 lg:px-14">
        <section className="py-16 ">
          <Tabs
            tabNameOne="Web Policies"
            tabNameTwo="Review Policies"
            tabOne={webPolicies}
            tabTwo={webReview}
          />
        </section>
      </main>
    </Layout>
  )
}

export default PoliciesPage