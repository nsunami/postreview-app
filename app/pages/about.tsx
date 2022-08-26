import Navbar from "app/core/components/Navbar"
import { BlitzPage, Image, useRouter } from "blitz"
import { Suspense } from "react"
import twoScientistsPhoto from "public/two-scientists-photo.png"
import peopleAroundTheWorld from "public/people-around-the-world.png"
import logoWithNameDarkMode from "public/logo-withname-darkmode.png"
import Layout from "app/core/layouts/Layout"

const About: BlitzPage = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback="Loading...">
        <Navbar />
      </Suspense>
      <main className="flex-grow flex flex-col items-center bg-white text-gray-darkest">
        <h1 className="my-12 mx-4 max-w-3xl text-5xl text-left font-bold text-green">
          Post a review, post-publication
        </h1>
        <div id="story-container" className="flex flex-col max-w-2xl mt-24 mx-4">
          <div className="text-2xl text-left">
            Last year, a question peaked two scientists&apos; minds.
          </div>
          <h2 className="my-36 md:ml-16 max-w-xl text-4xl font-bold text-black">
            Why is it so difficult to track evaluations of scholarly articles?
          </h2>
          <div className="text-2xl text-left">
            They realized there was no space to document and communicate discussions on scholarly
            articles.
          </div>
          <div className="my-36 text-2xl text-left">They decided to create a space.</div>
          <div id="brainstorming-container">
            <span className="text-4xl font-bold text-black sm:whitespace-nowrap">
              Brainstorming for the{" "}
            </span>
            <span className="text-4xl font-bold text-green">perfect space </span>
            <span className="text-4xl font-bold text-black">began...</span>
          </div>
          </div>
        </div>
        <Visions />
        <div id="team" className="flex flex-col items-center max-w-3xl my-12 mx-4">
          <h2 className="text-4xl font-bold">Our team</h2>
          <div className="my-6">
            PostReview is developed by a small group of scientists passionate about improving
            communications in research.
          </div>
          <div className="flex flex-col items-center">
            <div id="picture">
              <PeopleOutlineIcon sx={{ fontSize: 100 }} />
            </div>
            <div id="out-team-description" className="flex flex-row">
              <div className="m-4">
                <h3 className="font-bold">Naoyuki Sunami </h3>
                <h3 className="text-stone-600">Chief Technology Officer</h3>
                <div className="my-2">
                  Nami has a PhD in Social Psychology with background in social rejection research.
                  In his spare time, Nami enjoys drawing, playing guitar and playing Warframe. Nami
                  is in charge of the development of the platform.
                </div>
              </div>
              <div className="m-4">
                <h3 className="font-bold">Anton Lebed</h3>
                <h3 className="text-stone-600">Chief Operating Officer</h3>
                <div className="my-2">
                  Anton is a PhD in Cognitive Psychology with background in visual attention and
                  creativity research. In his spare time, Anton enjoys biking and playing board
                  games. Anton is in charge of the organizational efforts of PostReview.
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

About.getLayout = (page) => <Layout title="Our Story | PostReview">{page}</Layout>
export default About
