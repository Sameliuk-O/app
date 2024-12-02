import { PrivateRoute } from "@/helpers/PrivateRoute";
import { AddService } from "@/pages/AddService";
import { ChooseServices } from "@/pages/ChooseServices";
import { Counters } from "@/pages/Counters";
import { CreateHome } from "@/pages/CreateHome";
import { EditHome } from "@/pages/EditHome";
import { Home } from "@/pages/Home";
import { Homes } from "@/pages/Homes";
import { Information } from "@/pages/Information";
import { InformationContacts } from "@/pages/InformationContacts";
import { Messages } from "@/pages/Messages";
import { Profile } from "@/pages/Profile";
import { Service } from "@/pages/Service";
import { Services } from "@/pages/Services";
import { UpdateHome } from "@/pages/UpdateHome";
import { InformationQuestions } from "@/pages/InformationQuestions";

export const routing = [
  { path: "/", element: <Home /> },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <PrivateRoute>
        <Homes />
      </PrivateRoute>
    ),
  },
  {
    path: "/counters",
    element: (
      <PrivateRoute>
        <Counters />
      </PrivateRoute>
    ),
  },
  {
    path: "/messages",
    element: (
      <PrivateRoute>
        <Messages />
      </PrivateRoute>
    ),
  },
  {
    path: "/home/create",
    element: (
      <PrivateRoute>
        <CreateHome />
      </PrivateRoute>
    ),
  },
  {
    path: "/home/edit/:id",
    element: (
      <PrivateRoute>
        <EditHome />
      </PrivateRoute>
    ),
  },
  {
    path: "/home/edit/:id/update",
    element: (
      <PrivateRoute>
        <UpdateHome />
      </PrivateRoute>
    ),
  },
  {
    path: "/home/edit/:id/choose/:providerName/:serviceName",
    element: (
      <PrivateRoute>
        <AddService />
      </PrivateRoute>
    ),
  },
  {
    path: "/home/edit/:id/choose/services",
    element: (
      <PrivateRoute>
        <ChooseServices />
      </PrivateRoute>
    ),
  },
  {
    path: "/home/:homeId/service",
    element: (
      <PrivateRoute>
        <Service />
      </PrivateRoute>
    ),
  },
  {
    path: "/counters/:homeId/services",
    element: (
      <PrivateRoute>
        <Services />
      </PrivateRoute>
    ),
  },
  {
    path: "/information",
    element: (
      <PrivateRoute>
        <Information />
      </PrivateRoute>
    ),
  },
  {
    path: "/information/:questions",
    element: (
      <PrivateRoute>
        <InformationQuestions />
      </PrivateRoute>
    ),
  },
  {
    path: "/information/contacts",
    element: (
      <PrivateRoute>
        <InformationContacts />
      </PrivateRoute>
    ),
  },
];
