import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Button, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import * as Yup from "yup";
import ValidationErrors from "../errors/ValidationErrors";

export default observer(function RegisterForm() {
  const { userStore } = useStore();
  //fluid for take the full width of the form
  const validationSchema = Yup.object({
    displayName: Yup.string().required(),
    username: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });
  // className="ui form error" nho de error vao neu nhu muon validation erros component xuat hien
  // boi vi do semantic qui dinh
  // ben component cung phai khai bao la error
  //=====
  // vi dung formik de validate nen dung may cai component khac cua semantic ui phai cho no cai className
  return (
    <Formik
      initialValues={{
        displayName: "",
        username: "",
        email: "",
        password: "",
        error: null,
      }}
      onSubmit={
        (values, { setErrors }) =>
          userStore
            .register(values)
            .catch((error) => setErrors({ error: error })) //error from api
      }
      validationSchema={validationSchema}
    >
      {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
        <Form
          className="ui form error"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Header
            as="h2"
            content="Sign up to Reactivities"
            color="teal"
            textAlign="center"
          />
          <MyTextInput name="displayName" placeholder="DisplayName" />
          <MyTextInput name="username" placeholder="Username" />
          <MyTextInput name="email" placeholder="Email" />
          <MyTextInput name="password" placeholder="Password" type="password" />
          <ErrorMessage
            name="error"
            render={() => <ValidationErrors errors={errors.error} />}
          />
          <Button
            disabled={!dirty || !isValid || isSubmitting}
            loading={isSubmitting}
            positive
            content="Login"
            type="submit"
            fluid
          />
        </Form>
      )}
    </Formik>
  );
});
