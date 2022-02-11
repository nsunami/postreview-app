import React, { useState } from "react"
import { invoke, useMutation, useRouter } from "blitz"
import addArticle from "../../mutations/addArticle"
import getArticleByDoi from "../../queries/getArticleByDoi"
import axios from "axios"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"

import { v4 as uuidv4 } from "uuid"
import { Input, InputAdornment } from "@mui/material"
import { Search } from "@mui/icons-material"

export default function EnterDOI() {
  const currentUser = useCurrentUser()
  const defaultDoi = ""
  const [doi, setDoi] = useState(defaultDoi)
  const [addArticleMutation] = useMutation(addArticle)

  async function getArticleMetadata() {
    if (!doi) return handleArticleNotFound()
    try {
      const doiURL = "https://api.crossref.org/works/" + doi
      const response = await axios.get(doiURL)
      const newArticleMetadata = response.data.message
      return newArticleMetadata
    } catch {
      handleArticleNotFound()
    }
  }

  async function parseArticleMetadata(newArticleMetadata) {
    const newArticle = {
      id: uuidv4(),
      title: newArticleMetadata.title[0],
      doi: newArticleMetadata.DOI,
      publishedYear: newArticleMetadata.created["date-parts"][0][0],
      journal: newArticleMetadata["container-title"][0],
      addedBy: currentUser?.handle,
      addedById: currentUser?.id,
      authorString: newArticleMetadata.author
        .map((author, i, authors) => {
          if (authors.length - 1 === i) {
            /* If last author, do not print the semicolon */
            return `${author.family}, ${author.given}`
          } else {
            return `${author.family}, ${author.given}; `
          }
        })
        .join(""),
    }
    return newArticle
  }

  const router = useRouter()
  async function handleArticleAdd() {
    const newArticleMetadata = await getArticleMetadata()
    if (!newArticleMetadata) return null
    const newArticle = await parseArticleMetadata(newArticleMetadata)
    // Is article already in the database?
    const existingArticle = await invoke(getArticleByDoi, newArticle.doi)
    if (existingArticle) return router.push("/articles/" + existingArticle.id)
    // push to database
    const addedArticle = await invoke(addArticleMutation, { ...newArticle })
    // go to the added article
    router.push(`/articles/${addedArticle.id}`)
    // add authors - implement with Nested Writes in the future
    // https://www.prisma.io/docs/concepts/components/prisma-client/relation-queries#nested-writes
  }

  function handleArticleNotFound() {
    window.alert("Article not found")
  }

  return (
    <div className="m-1 rounded-md flex flex-row items-center min-w-full justify-end">
      <div className="w-2/5">
        <Input
          fullWidth={true}
          placeholder="Enter DOI"
          value={doi}
          onChange={(e) => setDoi(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
        ></Input>
      </div>
      <button
        className="bg-indigo-500 hover:bg-indigo-700 text-white mx-2 p-2 px-3 border rounded-md"
        onClick={handleArticleAdd}
      >
        Rate a Paper
      </button>
    </div>
  )
}
