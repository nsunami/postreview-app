import React from "react"
import { useQuery } from "blitz"
import getUsersWithReviewsByArticleId from "app/queries/getUsersWithReviewsByArticleId"
import { Review } from "./Review"
import getQuestionCategories from "app/queries/getQuestionCategories"

export const ReviewList = (prop) => {
  const { article, ActionButton, session } = prop

  const [usersWithReview] = useQuery(getUsersWithReviewsByArticleId, {
    currentArticleId: article?.id,
  })

  const [questionCategories] = useQuery(getQuestionCategories, undefined)

  const currentUserReview = usersWithReview.find((user) => user.id == session?.userId)
  const currentUserHasReview = currentUserReview?.review.length
  const otherUserReview = usersWithReview.filter((user) => user.id != session?.userId)

  return (
    <>
      <div id="reviews-container" className="max-w-4xl">
        <div id="your-rating-wrapper" className="mt-6 mb-6">
          <div className="border-b m-6 text-2xl">
            <h1>Your Rating</h1>
          </div>
          <div className="flex flex-col items-center">
            {currentUserHasReview ? (
              <>
                <Review
                  key={currentUserReview?.id}
                  displayName={currentUserReview?.displayName}
                  handle={currentUserReview?.handle}
                  reviews={currentUserReview?.review}
                  userIcon={currentUserReview?.icon}
                  questionCategories={questionCategories}
                  comment={currentUserReview?.reviewComments[0]?.comment}
                />
                <ActionButton state="edit" />
              </>
            ) : (
              <div className="m-20">
                {session.userId ? (
                  <ActionButton state="submit" />
                ) : (
                  <div>
                    <a href="/api/auth/google" className="text-purple-400">
                      Login
                    </a>{" "}
                    to submit a review
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="border-b m-6 text-2xl">
          <h1>All Ratings</h1>
        </div>
        <div id="individual-review-wrapper" className="flex flex-col items-center">
          {otherUserReview.length ? (
            otherUserReview.map((user) => (
              <Review
                key={user.id}
                displayName={user.displayName}
                handle={user.handle}
                reviews={user.review}
                userIcon={user.icon}
                questionCategories={questionCategories}
              />
            ))
          ) : (
            <div className="m-20">No other reviews</div>
          )}
        </div>
      </div>
    </>
  )
}
