// import App from "next/app";
import type { AppProps /*, AppContext */ } from "next/app"
import { useEffect, useState } from "react"
import { Auth0Provider } from "@auth0/auth0-react"
import "firebase/app"
import "bootstrap/dist/css/bootstrap.min.css"
import ReactTooltip from "react-tooltip"

import Layout from "@/components/layout/Layout"
import { auth0 } from "@/services/auth0"

function MyApp({ Component, pageProps }: AppProps) {
  const [origin, setOrigin] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setOrigin(window.location.origin)
    setMounted(true)
  }, [])

  return (
    <Auth0Provider
      domain={auth0.domain}
      clientId={auth0.clientId}
      redirectUri={origin}
    >
      <Layout>
        <Component {...pageProps} />
        {mounted && <ReactTooltip />}
      </Layout>
    </Auth0Provider>
  )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp
