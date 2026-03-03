import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { PatientsList } from "./pages/PatientsList";
import { PatientProfile } from "./pages/PatientProfile";
import { AddPatient } from "./pages/AddPatient";
import { VisitsList } from "./pages/VisitsList";
import { VisitDetails } from "./pages/VisitDetails";
import { NewVisit } from "./pages/NewVisit";
import { EditVisit } from "./pages/EditVisit";
import { Inventory } from "./pages/Inventory";
import { StockInMedicine } from "./pages/StockInMedicine";
import { AddMedicine } from "./pages/AddMedicine";
import { StockMovements } from "./pages/StockMovements";
import { Analytics } from "./pages/Analytics";
import { Archive } from "./pages/Archive";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  // Public route
  { path: "/login", Component: LoginPage },

  // Protected routes (all wrapped by Layout + ProtectedRoute)
  {
    path: "/",
    element: (
      <ProtectedRoute>
      <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, Component: Dashboard },
      { path: "patients", Component: PatientsList },
      { path: "patients/add", Component: AddPatient },
      { path: "patients/new", Component: AddPatient },
      { path: "patients/edit/:id", Component: AddPatient },
      { path: "patients/:id", Component: PatientProfile },
      { path: "visits", Component: VisitsList },
      { path: "visits/new", Component: NewVisit },
      { path: "visits/:id", Component: VisitDetails },
      { path: "visits/:id/edit", Component: EditVisit },
      { path: "inventory", Component: Inventory },
      { path: "inventory/stock-in", Component: StockInMedicine },
      { path: "inventory/add-medicine", Component: AddMedicine },
      { path: "inventory/movements", Component: StockMovements },
      { path: "analytics", Component: Analytics },
      { path: "archive", Component: Archive },
      { path: "settings", Component: Settings },
    ],
  },
]);
