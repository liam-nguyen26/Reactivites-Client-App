import { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../feature/activities/dashboard/ActivityDashboard";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then((res) => {
      let formatedActivites: Activity[] = [];
      res.forEach((activity) => {
        activity.date = activity.date.split("T")[0];
        formatedActivites.push(activity);
      });
      setActivities(formatedActivites);
      setLoading(false);
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

  const handleCreateOrEditActivity = async (activity: Activity) => {
    setSubmitting(true);
    if (activity.id) {
      try {
        await agent.Activities.update(activity);
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        activity.id = uuid();
        await agent.Activities.create(activity);
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteActivity = async (id: string) => {
    setSubmitting(true);
    try {
      await agent.Activities.delete(id);
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <LoadingComponent content="Loading app" />;

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
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default App;
