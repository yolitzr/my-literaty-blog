import {DiscussionEmbed} from "disqus-react"

export const DisqusComments = ({ post }) => {
  const disqusShortname = "caros-bookish"
  const disqusConfig = {
    url: "https://yolitsbooks.com/",
    identifier: post.id, // Single post id
    title: post.title // Single post title
  }
  return (
    <div>
      <DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  )
}

