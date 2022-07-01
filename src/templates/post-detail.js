import * as React from "react"
import { MDXProvider } from "@mdx-js/react"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { Link, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

// Utilities
import kebabCase from "lodash/kebabCase"

import Layout from "../components/layout"
import shortcodes from "../components/mdx"
import Seo from "../components/seo"
import Post from "../templates/post"

import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import Container from "@mui/material/Container"
import Divider from "@mui/material/Divider"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import Tooltip from "@mui/material/Tooltip"

import TwitterIcon from "@mui/icons-material/Twitter"
import FacebookIcon from "@mui/icons-material/Facebook"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import LinkIcon from "@mui/icons-material/Link"

const ClampTypography = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: "2",
  lineClamp: "2",
  WebkitBoxOrient: "vertical",
}

function PostTags(props) {
  const tags = props.data
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "text.primary",
          fontSize: "16px !important",
          letterSpacing: 0,
          fontWeight: "500",
          lineHeight: "20px",
        }}
      >
        Topics mentioned
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {tags.map(tag => (
          <Chip
            key={tag}
            component={Link}
            to={`/tag/${kebabCase(tag)}/`}
            label={tag}
            clickable
          />
        ))}
      </Box>
    </Box>
  )
}

function MoreStories(props) {
  const { previous, next } = props.data

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "text.primary",
          fontSize: "16px !important",
          letterSpacing: 0,
          fontWeight: "500",
          lineHeight: "20px",
        }}
      >
        More stories
      </Typography>
      <Stack spacing={3}>
        {[next, previous].map(item => {
          if (!item) return null
          return (
            <Box
              key={item.fields.slug}
              component={Link}
              to={item.fields.slug}
              rel={item}
              sx={{
                textDecoration: "none",
                color: "unset",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "1rem",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary" }}
                  gutterBottom
                >
                  {`${item.frontmatter.date} • ${item.timeToRead}`} min read
                </Typography>
                <Typography
                  variant="body1"
                  style={ClampTypography}
                  sx={{
                    color: "text.primary !important",
                    fontWeight: "700",
                    lineHeight: "20px",
                    textTransform: "capitalize",
                    letterSpacing: "0",
                  }}
                >
                  {" "}
                  {item.frontmatter.title}
                </Typography>
              </Box>
              <Box sx={{ width: "100%", maxWidth: "55px" }}>
                <GatsbyImage
                  image={getImage(item.frontmatter.featuredImage)}
                  alt={item.frontmatter.featuredImage.name}
                />
              </Box>
            </Box>
          )
        })}
      </Stack>
    </Box>
  )
}

const PostDetailTemplate = ({ data, location }) => {
  const post = data.mdx
  const image = getImage(post.frontmatter.featuredImage)
  const tags = post.frontmatter.tags

  return (
    <Layout
      location={location}
      title={""}
      extraDrawerContent={
        <>
          <PostTags data={tags} />
          <MoreStories data={data} />
        </>
      }
      extraFooterContent={
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            pt: "4rem",
          }}
        >
          {data.next && <Divider />}
          {data.next && <Post data={data.next} />}
          {data.previous && <Divider />}
          {data.previous && <Post data={data.previous} />}
        </Box>
      }
    >
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article itemScope itemType="http://schema.org/Article">
        <Container
          disableGutters
          maxWidth="string"
          sx={{
            maxWidth: "692px",
            "@media (max-width: 600px)": {
              px: "1.5rem",
            },
          }}
        >
          <header>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <Avatar
                  alt="Brian Ruiz"
                  src="../avatar.png"
                  sx={{
                    width: "48px",
                    height: "48px",
                    backgroundColor: "divider",
                    "@media (max-width: 900px)": {
                      width: "36px",
                      height: "36px",
                    },
                  }}
                >
                  BR
                </Avatar>
                <Stack>
                  <Typography variant="body1">Brian Ruiz</Typography>
                  <Typography color="text.secondary" variant="body2">
                    {post.frontmatter.date} &bull;{" "}
                    {post.timeToRead + " min read"}
                  </Typography>
                </Stack>
              </Box>
              {/* social share */}
              <Stack direction="row" spacing={1}>
                <IconButton sx={{ height: "fit-content" }} size="small">
                  <TwitterIcon />
                </IconButton>
                <IconButton sx={{ height: "fit-content" }} size="small">
                  <FacebookIcon />
                </IconButton>
                <IconButton sx={{ height: "fit-content" }} size="small">
                  <LinkedInIcon />
                </IconButton>
                <Tooltip title="Copy URL" arrow>
                  <IconButton
                    sx={{ height: "fit-content" }}
                    size="small"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `https://b-r.io/${location.pathname}`
                      )
                    }}
                  >
                    <LinkIcon sx={{ transform: "rotate(-45deg)" }} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Box>
            <Box py={4}>
              <Box>
                <Typography
                  variant="h1"
                  gutterBottom
                  sx={{
                    fontWeight: "900",
                    letterSpacing: "-0.016em",
                    lineHeight: "40px",
                    textTransform: "capitalize",
                    fontSize: "32px !important",
                    "@media (max-width: 900px)": {
                      lineHeight: "40px",
                    },
                  }}
                >
                  {post.frontmatter.title}
                </Typography>
                <Typography
                  variant="h2"
                  gutterBottom
                  sx={{
                    fontSize: "22px !important",
                    letterSpacing: "0",
                    lineHeight: "28px",
                    fontWeight: "400",
                    color: "text.disabled",
                  }}
                >
                  {post.frontmatter.description}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                maxHeight: "40rem",
                pb: "4rem",
                "& > div": { maxHeight: "40rem" },
              }}
            >
              <GatsbyImage
                image={image}
                alt={post.frontmatter.featuredImage.name}
              />
            </Box>
          </header>
          <MDXProvider components={shortcodes}>
            <MDXRenderer>{post.body}</MDXRenderer>
          </MDXProvider>
        </Container>
      </article>
    </Layout>
  )
}

export default PostDetailTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      body
      timeToRead
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        tags
        featuredImage {
          childImageSharp {
            gatsbyImageData(quality: 100)
          }
          name
        }
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      timeToRead
      frontmatter {
        title
        date(formatString: "MMM, YYYY")
        description
        featuredImage {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1)
          }
          name
        }
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      timeToRead
      frontmatter {
        title
        date(formatString: "MMM, YYYY")
        description
        featuredImage {
          childImageSharp {
            gatsbyImageData(aspectRatio: 1)
          }
          name
        }
      }
    }
  }
`
