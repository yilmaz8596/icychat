import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import GenderCheckBox from "../../components/GenderCheckBox";

export default function Register() {
  const validationSchema = Yup.object({
    fullName: Yup.string().min(3).required("Full Name is required"),
    username: Yup.string().min(3).required("Username is required"),
    email: Yup.string().email().required("Email is required"),
    password: Yup.string().min(6).required("Password is required"),
    confirmPassword: Yup.string()
      .min(6)
      .required("Confirm Password is required"),
    gender: Yup.string()
      .oneOf(["male", "female"], "Please select a gender")
      .required("Gender is required"),
  }).equals(["password", "confirmPassword"], "Passwords must match");

  return (
    <Formik
      initialValues={{
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Form className="flex flex-col items-center justify-center min-w-96 mx-auto">
          <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-blue-500 text-5xl font-semibold text-center mb-2">
              IcyChat
            </h1>
            <h1 className="text-3xl font-semibold text-center text-gray-300 mb-14">
              Register
            </h1>
            <div className="mb-4">
              <Field
                type="text"
                placeholder="Full Name"
                className="w-full input input-bordered h-10 bg-transparent placeholder:text-gray-100"
                name="fullName"
              />
              <ErrorMessage
                name="fullName"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <Field
                type="text"
                placeholder="Username"
                className="w-full input input-bordered h-10 bg-transparent placeholder:text-gray-100"
                name="username"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <Field
                type="email"
                placeholder="Email"
                className="w-full input input-bordered h-10 bg-transparent placeholder:text-gray-100"
                name="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <Field
                type="password"
                placeholder="Password"
                className="w-full input input-bordered h-10 bg-transparent placeholder:text-gray-100"
                name="password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-4">
              <Field
                type="password"
                placeholder="Confirm Password"
                className="w-full input input-bordered h-10 bg-transparent placeholder:text-gray-100"
                name="confirmPassword"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500"
              />
            </div>
            <div>
              <GenderCheckBox
                selectedGender={values.gender}
                onCheckboxChange={(gender) => setFieldValue("gender", gender)}
              />
            </div>
            <Link
              to="/login"
              className="text-sm text-gray-200  hover:underline hover:text-blue-600 mt-2 inline-block mb-4"
            >
              {"Already"} have an account? Login
            </Link>
            <div>
              <button
                className="btn btn-block btn-sm mt-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="loading loading-spinner "></span>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
