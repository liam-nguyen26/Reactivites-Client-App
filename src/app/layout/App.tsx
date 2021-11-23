import { Fragment, useEffect, useState } from "react";
import { Container } from "semantic-ui-react";
import ActivityDashboard from "../../feature/activities/dashboard/ActivityDashboard";
import { Activity } from "../models/activity";
import NavBar from "./NavBar";
import { v4 as uuid } from "uuid";
import agent from "../api/agent";
import LoadingComponent from "./LoadingComponent";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";

function App() {
  const { activityStore } = useStore();

  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

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

  if (activityStore.loadingInitial)
    return <LoadingComponent content="Loading app" />;

  return (
    <Fragment>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activityStore.activities}
          createOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default observer(App);
