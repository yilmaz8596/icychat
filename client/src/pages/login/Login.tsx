import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";

export default function Login() {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        setLoading(true);
        console.log(values);
        setLoading(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col items-center justify-center min-w-96 mx-auto">
          <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
            <h1 className="text-blue-500 text-5xl font-semibold text-center mb-2">
              IcyChat
            </h1>
            <h1 className="text-3xl font-semibold text-center text-gray-300 mb-14">
              Login
            </h1>
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
            <Link
              to="/signup"
              className="text-sm text-gray-200 hover:underline hover:text-blue-600 mt-2 inline-block mb-4"
            >
              {"Don't"} have an account?
            </Link>
            <div>
              <button
                type="submit"
                className="btn btn-block btn-sm mt-2"
                disabled={isSubmitting || loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
