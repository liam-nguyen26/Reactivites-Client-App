import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../feature/activities/dashboard/ActivityDashboard";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import { v4 as uuid } from "uuid";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>("https://localhost:5001/api/Activities")
      .then((res) => {
        console.log(res.data);
        setActivities(res.data);
      });
  }, []);

  const selectActivityHandler = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };

  const cancelActivityHandler = () => {
    setSelectedActivity(undefined);
  };

  const formOpenHandler = (id?: string) => {
    id ? selectActivityHandler(id) : cancelActivityHandler();
    setEditMode(true);
  };

  const formCloseHandler = () => {
    setEditMode(false);
  };

  const handleCreateOrEditActivity = (activity: Activity) => {
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ])
      : setActivities([...activities, { ...activity, id: uuid() }]);
    setEditMode(false);
    setSelectedActivity(activity);
  };

  const handleDeleteActivity = (id: string) => {
    setActivities([...activities.filter((x) => x.id !== id)]);
  };

  return (
    <Fragment>
      <NavBar openForm={formOpenHandler} />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={selectActivityHandler}
          cancelSelectActivity={cancelActivityHandler}
          editMode={editMode}
          openForm={formOpenHandler}
          closeForm={formCloseHandler}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
