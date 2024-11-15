import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import RecordForm from "./components/RecordForm";
import RecordList from "./components/RecordList";
import "./index.css";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PaginatedRecord from "./components/PaginatedRecord"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
  ],
},
  {
    path: "/view",
    element: <App />,
    children: [
      {
        path: "/view",
        element: <RecordList />,
      },
    ],
  },
  {
    path: "/paginatedView",
    element: <App />,
    children: [
      {
        path: "/paginatedView",
        element: <PaginatedRecord />,
      },
  ],
},
  {
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <RecordForm />,
      },
    ],
  },
  {
    path: "/edit/:id",
    element: <App />,
    children: [
      {
        path: "/edit/:id",
        element: <RecordForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
