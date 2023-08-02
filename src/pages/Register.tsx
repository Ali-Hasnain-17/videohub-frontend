import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { RegisterInputs } from "../types";
import { register as handleRegister } from "../api/auth";

const DEFAULT_VALUES = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<RegisterInputs>({
    defaultValues: DEFAULT_VALUES,
    mode: "onTouched",
  });

  const { isLoading, mutate, isError, isSuccess } = useMutation({
    mutationKey: ["register"],
    mutationFn: handleRegister,
    onSuccess: () => reset(),
    onError: () => reset(),
  });

  function registerUser(userInfo: RegisterInputs) {
    mutate({
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      email: userInfo.email,
      password: userInfo.password,
    });
  }

  let password = watch("password");

  return (
    <form
      noValidate
      className="auth-form"
      onSubmit={handleSubmit(registerUser)}
    >
      <h2>Register</h2>
      {isSuccess && (
        <div className="success-box">User Registered Successfully</div>
      )}
      {isError && <div className="error-box">Failed to register user</div>}
      <div className="form-field">
        <label htmlFor="fname" className="form-label">
          First Name
        </label>
        <input
          type="text"
          id="fname"
          className={`form-input ${errors.firstName && "error-input"}`}
          {...register("firstName", { required: "First Name is required" })}
        />
        <small className="error-text">{errors.firstName?.message}</small>
      </div>
      <div className="form-field">
        <label htmlFor="lname" className="form-label">
          Last Name
        </label>
        <input
          type="text"
          id="lname"
          className={`form-input ${errors.lastName && "error-input"}`}
          {...register("lastName", { required: "Last Name is required" })}
        />
        <small className="error-text">{errors.lastName?.message}</small>
      </div>
      <div className="form-field">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          id="email"
          className={`form-input ${errors.email && "error-input"}`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid Email Format",
            },
          })}
        />
        <small className="error-text">{errors.email?.message}</small>
      </div>
      <div className="form-field">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          id="password"
          className={`form-input ${errors.password && "error-input"}`}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must have 8 characters",
            },
          })}
        />
        <small className="error-text">{errors.password?.message}</small>
      </div>
      <div className="form-field">
        <label htmlFor="cpassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          id="cpassword"
          className={`form-input ${errors.confirmPassword && "error-input"}`}
          {...register("confirmPassword", {
            required: "Confirm password is required",
            validate: (value) => {
              return (
                value === password ||
                "Confirm password should match with password"
              );
            },
          })}
        />
        <small className="error-text">{errors.confirmPassword?.message}</small>
      </div>
      <button
        className="btn auth-btn"
        type="submit"
        disabled={isLoading || !isDirty || !isValid}
      >
        Register
      </button>
    </form>
  );
};
