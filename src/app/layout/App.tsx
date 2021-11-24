import { Fragment } from "react";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../feature/activities/dashboard/ActivityDashboard";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Route, useLocation } from "react-router-dom";
import HomePage from "../../feature/home/HomePage";
import ActivityForm from "../../feature/activities/form/ActivityForm";
import ActivityDetails from "../../feature/activities/details/ActivityDetails";

function App() {
  const location = useLocation();
  return (
    <Fragment>
      <Route exact path="/" component={HomePage} />
      {
        //any routes match with slash plus something else will match the routes
      }
      <Route
        path={"/(.+)"}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: "7em" }}>
              <Route exact path="/activities" component={ActivityDashboard} />
              <Route path="/activities/:id" component={ActivityDetails} />
              <Route
                path={["/createActivity", "/manage/:id"]}
                component={ActivityForm}
                key={location.key}
              />
            </Container>
          </>
        )}
      />
    </Fragment>
  );
}

export default observer(App);
