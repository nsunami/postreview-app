import React from "react"
import { useQuery } from "blitz"
import getQuestionCategories from "app/queries/getQuestionCategories"
import { FaBook, FaUser } from "react-icons/fa"
import { Review } from "app/core/components/Review"
import { ArticleAction } from "./ArticleAction"

export const MyReviewsTable = (props) => {
  const { articleWithReview, currentUser } = props
  const [questionCategories] = useQuery(getQuestionCategories, undefined)

  return (
    <>
      {articleWithReview.map((article) => {
        const isAnonymous = article.review[0].isAnonymous
        return (
          <div
            key={article.id}
            className="bg-gray-50 m-6 p-4 border-gray-200 border-2
            flex flex-col  max-w-5xl"
          >
            <div
              id="metadata-container"
              className="mx-4 flex flex-row justify-between items-center"
            >
              <div id="article-metadata" className="m-2">
                <a href={`articles/${article.id}`}>
                  <h2 className="font-bold">{article.title}</h2>
                </a>
                <div id="author" className="text-sm text-gray-700">
                  <FaUser className="inline mr-2" />
                  {article.authorString} ({article.publishedYear})
                </div>
                <div className="text-sm text-gray-700">
                  <FaBook className="inline mr-2" />
                  <a href={`https://doi.org/${article.doi}`} target="_blank" rel="noreferrer">
                    {article.doi}
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center items-center">
              <Review
                displayName={currentUser.displayName}
                handle={currentUser.handle}
                reviews={article.review}
                userIcon={currentUser.icon}
                questionCategories={questionCategories}
              />
              <div className="flex flex-col">
                <div id="action-menu" className="self-end text-gray-500">
                  <ArticleAction curentUser={currentUser} article={article} />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
