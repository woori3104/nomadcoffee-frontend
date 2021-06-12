import { faDev } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import { FatLink } from "../components/shared";
import routes from "../routes";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;
const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount (
    $userName: String!
    $email:    String!
    $password:String!
    $name:String!
    $location:String!
    $avatarURL:Upload,
    $githubUsername:String
  ) {
    createAccount (
      userName : $userName
      email : $email
      password : $password
      name : $name
      location : $location
      avatarURL :  $avatarURL
      githubUsername : githubUsername
    ) {
      ok
      error
    }
  }
`;

const SignUp = () => {
  const history = useHistory();
  const onCompleted = (data: any) => {
    const { userName, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
     history.push(routes.home, {
      message: "Account created. Please log in.",
      userName,
      password,
    });
  };
  const clearLoginError = () => {
    clearErrors("result");
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, setError, clearErrors, errors, formState, getValues  } = useForm({
    mode: "onChange",
  });
  const onSubmitValid = (data: any) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  return (
    <AuthLayout>
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faDev} size="3x" />
          <Subtitle>
            Sign up to see cafe from your friends.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input ref={register({ required: "UserName is required", minLength: {
              value: 5,
              message: "Username should be longer than 5 chars.",
            },})}
            name="userName"
            type="text"
            onChange={clearLoginError}
            hasError={Boolean(errors?.userName?.message)}
            placeholder="userName"
          />
          <Input ref={register({ required: "Email is required.",})}
            name="email"
            type="email"
            onChange={clearLoginError}
            hasError={Boolean(errors?.email?.message)}
            placeholder="Email"
          />
          <Input
            ref={register({
              required: "name is required.",
            })}
            name="name"
            type="text"
            onChange={clearLoginError}
            hasError={Boolean(errors?.name?.message)}
            placeholder="Name"
          />
          <Input
            ref={register({
              required: "Password is required.",
            })}
            name="password"
            type="password"
            onChange={clearLoginError}
            hasError={Boolean(errors?.password?.message)}
            placeholder="Password"
          />
          <Input
            ref={register({
              required: "location is required.",
            })}
            name="location"
            type="test"
            onChange={clearLoginError}
            hasError={Boolean(errors?.location?.message)}
            placeholder="location"
          />
          <Input
            ref={register({
              required: "avatar is required.",
            })}
            name="avatar"
            type="file"
            onChange={clearLoginError}
            accept="image/jpeg, image/jpg"
            hasError={Boolean(errors?.location?.message)}
            placeholder="location"
          />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
}
export default SignUp;