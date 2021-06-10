import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import { logUserIn } from "../apollo";
//import PageTitle from "../components/PageTitle";
import FormError from "../components/auth/FormError";
import routes from "../routes";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";

const FacebookLogin = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;
const LOGIN_MUTATION = gql`
  mutation login($userName: String!, $password: String!) {
    login(userName: $userName, password: $password) {
      ok
      token
      error
    }
  }
`;
const Login = () => {
   const {
    register,
    handleSubmit,
    errors,
    formState,
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
  });
  const onCompleted = (data:any) => {
    const {
      login: { ok, error, token
      },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });
  const clearLoginError = () => {
    clearErrors("result");
  };
  const onSubmitValid = () => {
    if (loading) {
      return;
    }
    const { userName, password } = getValues();
    login({
      variables: { userName, password },
    });
  };
  return (
    <AuthLayout>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <form onSubmit={ handleSubmit(onSubmitValid)}>

          <Input ref={register({ required: "UserName is required", minLength: {
              value: 5,
              message: "Username should be longer than 5 chars.",
            },})}
          name="userName"
          type="text"
          placeholder="UserName"
          onChange={clearLoginError}
          hasError={Boolean(errors?.userName?.message)}
          required
        />
        <Input ref={register({ required : "password is required",})}
          name="password"
          type="password"
          placeholder="Password"
          hasError={Boolean(errors?.password?.message)}
          onChange={clearLoginError}
          required/>
        <FormError message={errors?.password?.message} />
        <Button
          type="submit"
          value={loading ? "Loading..." : "Log in"}
          disabled={!formState.isValid || loading}
        />
        <FormError message={errors?.result?.message} />
      </form>
      <Separator />
      <FacebookLogin>
        <FontAwesomeIcon icon={faFacebookSquare} />
        <span>Log in with Facebook</span>
      </FacebookLogin>
    </FormBox>
    <BottomBox
      cta="Don't have an account?"
      linkText="Sign up"
      link={routes.signUp}
    />
    </AuthLayout>
  );
}
export default Login;

