import { useForm } from "react-hook-form";
import { LoginInputs } from "../types";
import { useMutation } from "react-query";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authenticate } from "../app/slices/authSlice";

const DEFAULT_VALUES = {
  email: "",
  password: "",
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<LoginInputs>({
    defaultValues: DEFAULT_VALUES,
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { isLoading, mutate, isError } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (userInfo) => {
      dispatch(authenticate(userInfo));
      navigate("/");
    },
    onError: () => reset(),
  });

  function loginUser(userInfo: LoginInputs) {
    mutate({ email: userInfo.email, password: userInfo.password });
  }

  return (
    <form className="auth-form" noValidate onSubmit={handleSubmit(loginUser)}>
      <h2>Login</h2>
      {isError && (
        <div className="error-box">Invalid User name or password</div>
      )}
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
          })}
        />
        <small className="error-text">{errors.password?.message}</small>
      </div>
      <button
        className="btn auth-btn"
        type="submit"
        disabled={isLoading || !isDirty || !isValid}
      >
        Login
      </button>
    </form>
  );
};
