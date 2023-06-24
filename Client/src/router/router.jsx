import { createBrowserRouter } from "react-router-dom";
import LandingPageMenu from "../layout/menu/LandingPageMenu";
import LandingPage from "../modules/landingPage/pages/LandingPage";
import LoginPage from "../modules/authentication/Pages/LoginPage";
import InscriptionPage from "../modules/authentication/Pages/InscriptionPage";
import RenterSidebarMenu from "../layout/menu/RenterSidebarMenu";
import EnginesPage from "../modules/renterDashboard/pages/EnginesPage";
import AdminSidebarMenu from "../layout/menu/AdminSidebarMenu";
import EnginesVisualisation from "../modules/adminDashboard/pages/EnginesVisualisation";
import CategoriesPage from "../modules/rentRequest/pages/CategoriesPage";
import EngineDetailsPage from "../modules/rentRequest/pages/EngineDetailsPage";
import LocationRequestPage from "../modules/rentRequest/pages/LocationRequestPage";
import ConfirmationPage from "../modules/rentRequest/components/ConfirmationPage";
import LocationListPage from "../modules/renterDashboard/pages/LocationListPage";
import RecommendationPage from "../modules/Recommendation/pages/RecommendationPage";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPageMenu />,
    errorElement: <div>Il y'a une ereurs</div>,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/recommendation",
        element: <RecommendationPage />,
      },
      {
        path: "/categorie/:catName",
        element: <CategoriesPage />,
      },
      
      {
        path: "/engin/:enginId",
        element: <EngineDetailsPage />,
      },
      {
        path: "/location/:locationId",
        element: <LocationRequestPage />,
      },
      {
        path:"/confirmation",
        element:<ConfirmationPage/>
      }
    ],
  },
  {
    path: "/dashboard",
    element: <RenterSidebarMenu />,
    children: [
      {
        path: "/dashboard/liste-engins",
        element: <EnginesPage />,
      }, {
        path: "/dashboard/liste-demandes",
        element: <LocationListPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminSidebarMenu />,
    children: [
      {
        path: "/admin/liste-engins",
        element: <EnginesVisualisation />,
      },
    ],
  },
  {
    path: "/connexion",
    element: <LoginPage />,
  },
  {
    path: "/inscription",
    element: <InscriptionPage />,
  },
]);

export default Router;
