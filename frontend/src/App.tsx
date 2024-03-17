import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout/RootLayout";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import Portfolios from "./pages/Portfolios";
import Authentication from "./pages/Authentication";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import WatchlistProvider from "./components/ContextProviders/WatchlistProvider";

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <RootLayout />
    ),
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'portfolio',
        element: <Portfolios />
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
