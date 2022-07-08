import * as React from "react"
import { Link } from "gatsby"

import BottomNav from "./BottomNav"
import PanelLeft from "./PanelLeft"
import PanelRight from "./PanelRight"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined"
import MoreHorizIcon from "@mui/icons-material/MoreHoriz"
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined"


import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  useTheme,
} from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

function ThemeIconButton() {
  const theme = useTheme()
  const colorMode = React.useContext(ColorModeContext)
  return (
    <Tooltip title="Switch theme" placement="right" arrow>
      <IconButton onClick={colorMode.toggleColorMode}>
        {theme.palette.mode === "dark" ? (
          <LightModeOutlinedIcon />
        ) : (
          <DarkModeOutlinedIcon />
        )}
      </IconButton>
    </Tooltip>
  )
}

const Layout = ({
  location,
  title,
  extraDrawerContent,
  extraFooterContent,
  children,
}) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const [mode, setMode] = React.useState("light")
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode(prevMode => (prevMode === "light" ? "dark" : "light"))
      },
    }),
    []
  )

  let theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // palette values for light mode
                primary: {
                  main: "#007aff",
                },
                text: {
                  disabled: "rgba(0, 0, 0, 0.48)",
                  postBody: "rgba(0, 0, 0, 0.87)",
                },
                background: {
                  alt: "#fafafa",
                },
              }
            : {
                // palette values for dark mode
                primary: {
                  main: "#0a84ff",
                },
                text: {
                  primary: "#f5f5f7",
                  secondary: "#f5f5f7",
                  postBody: "rgba(255, 255, 255, 0.87)",
                },
                background: {
                  default: "#000",
                  paper: "#121212",
                  alt: "#0c0c0c",
                },
              }),
        },
      }),
    [mode]
  )

  theme = responsiveFontSizes(theme)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box sx={{ display: "block" }}>
          <Box sx={{ display: "block", margin: "auto", maxWidth: "1504px" }}>
            <Box sx={{ display: "flex" }} data-is-root-path={isRootPath}>
              <PanelLeft
                isRootPath={isRootPath}
                ThemeButton={<ThemeIconButton />}
              />
              <Box sx={{ display: "block", minWidth: 0, flex: "1 1 auto" }}>
                <Container
                  disableGutters
                  maxWidth="string"
                  sx={{
                    maxWidth: "692px",
                    py: "2rem",
                    "@media (max-width: 600px)": {
                      px: "1.5rem",
                      py: "1rem",
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        lineHeight: "52px",
                        fontWeight: "700",
                        "& > a": {
                          color: "text.primary",
                          textDecoration: "none",
                        },
                        "@media (max-width: 600px)": {
                          fontSize: "22px",
                        },
                      }}
                    >
                      <Link to="/">{title}</Link>
                    </Typography>
                    {title && (
                      <IconButton sx={{ height: "fit-content" }}>
                        <MoreHorizIcon alt="More" />
                      </IconButton>
                    )}
                  </Box>
                </Container>
                <main style={{ minHeight: "calc((100vh - 360px) - 116px)" }}>
                  {children}
                </main>
                <footer>
                  <Container
                    disableGutters
                    sx={{
                      backgroundColor: "background.alt",
                      py: "4rem",
                      mt: "4rem",
                    }}
                  >
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
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 1,
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              color: "text.primary",
                              letterSpacing: 0,
                              fontWeight: "500",
                              lineHeight: "20px",
                            }}
                          >
                            More stories from Brian
                          </Typography>
                          <Button
                            variant="outlined"
                            disableElevation
                            size="small"
                            sx={{
                              borderRadius: "2rem",
                              textTransform: "none",
                              fontWeight: 400,
                            }}
                          >
                            Get Newsletter
                          </Button>
                        </Box>
                        <Typography
                          variant="body2"
                          sx={{ maxWidth: "440px", color: "text.secondary" }}
                        >
                          Hey, enjoying the content? Subscribe to my newsletter
                          to stay up to date on new posts and more. P.S. No spam,
                          unsubscribe any time.
                        </Typography>
                      </Box>
                      {extraFooterContent}
                    </Container>
                  </Container>
                </footer>
              </Box>
              <PanelRight extraDrawerContent={extraDrawerContent} />
            </Box>
          </Box>
          <BottomNav
            isRootPath={isRootPath}
            colorMode={colorMode}
            theme={theme}
          />
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default Layout
