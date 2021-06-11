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
const CREATE_CAFE_MUTATION = gql`
  mutation createCoffeeshop (
    $name: String!
    $latitude: String!
    $longitude: String!
    $photos: [Upload]
    $categories: [String]
  ) {
    createCoffeeshop (
      name : $name
      latitude : $latitude
      longitude : $longitude
      photos : $photos
      categories : $categories      
    ) {
      ok
      error
    }
  }
`;

const Add = () => {
  const history = useHistory();
  const {
    register, handleSubmit, setError, clearErrors, errors, formState
  } = useForm({
    mode: "onChange",
  });
  const onCompleted = (data:any) => {
    const { ok, error } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    history.push(routes.home);
  };
  const [createCoffeeshop, { loading }] = useMutation(CREATE_CAFE_MUTATION, {
    onCompleted,
  });

  const clearCreateError = () => {
    clearErrors("result");
  };
  
  const onSubmitValid = (data:any) => {
    if (loading) {
      return;
    }
    const { name, latitude, longitude, categories, photos } = data;
    createCoffeeshop({
      variables: {
        name,
        latitude,
        longitude,
        categories,
        photos,
      },
    });
  };

  return (
    <AuthLayout>
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faDev} size="3x" />
          <Subtitle>
            Upload your Cafe.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input ref={register({ required: "name is required", minLength: {
              value: 1,
              message: "name should be longer than 1 chars.",
            },})}
            name="name"
            type="text"
            onChange={clearCreateError}
            hasError={Boolean(errors?.name?.message)}
            placeholder="name"
          />
          <Input ref={register({ required: "latitude is required.",})}
            name="latitude"
            type="text"
            onChange={clearCreateError}
            hasError={Boolean(errors?.latitude?.message)}
            placeholder="latitude"
          />
          <Input
            ref={register({
              required: "longitude is required.",
            })}
            name="longitude"
            type="text"
            onChange={clearCreateError}
            hasError={Boolean(errors?.longitude?.message)}
            placeholder="longitude"
          />
          <Input
            ref={register({
            })}
            name="photos"
            type="file"
            multiple
            accept="image/jpeg, image/jpg"
            onChange={clearCreateError}
            placeholder="photos"
          />
          <Input
             ref={register({
            })}
            name="categories"
            type="text"
            onChange={clearCreateError}
            placeholder="categories"
          />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Create"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="" linkText="home" link={routes.home} />
    </AuthLayout>
  );
}
export default Add;