import { createBrowserRouter as createRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout/RootLayout";
import Explore from "./pages/Explore";
import Watchlist from "./pages/Watchlist";
import Portfolios from "./pages/Portfolios";
import Authentication from "./pages/Authentication";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import WatchlistProvider from "./components/ContextProviders/WatchlistProvider";
import PortfolioProvider from "./components/ContextProviders/PortfolioProvider";
import Hero from "./pages/Hero";

const router = createRouter([
  {
    path: '/',
    element: (
      <RootLayout />
    ),
    children: [
      {
        path: '',
        element: <Hero />,
      },
      {
        path: 'explore',
        element: <Explore />,
      },
      {
        path: 'portfolio',
        element: (
          <PrivateRoute>
            <PortfolioProvider>
              <Portfolios />
            </PortfolioProvider>
          </PrivateRoute>
        )
      },
      {
        path: 'watchlist',
        element: (
          <PrivateRoute>
            <WatchlistProvider>
              <Watchlist />
            </WatchlistProvider>
          </PrivateRoute>
        )
      },
      {
        path: 'login',
        element: (
          <Authentication />
        )
      }
    ]
  },

])


function App() {
  return <RouterProvider router={router} />
}

export default App;
