import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import Home from "./pages/Home";
import Watchlist from "./pages/Watchlist";
import Portfolios from "./pages/Portfolios";

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
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
        element: <Watchlist />
      }
    ]
  }
])


function App() {
  return <RouterProvider router={router} />
}

export default App;
