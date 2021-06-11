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
import { gql, useMutation, useQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";


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
const UPDATE_CAFE_MUTATION = gql`
  mutation editCoffeeShop  (
    $id:Int!
    $name: String
    $latitude: String
    $longitude: String
    $categories: [String]
  ) {
    editCoffeeShop (
      id : $Int
      name : $name
      latitude : $latitude
      longitude : $longitude
      categories : $categories
    ) {
      ok
      error
    }
  }
`;

const Edit = () => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const shop_id=Number(id.replace(":", ""));

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
    history.push(routes.shop);
  };
  const [editCoffeeShop, { loading }] = useMutation(UPDATE_CAFE_MUTATION, {
    onCompleted,
  });

  const clearCreateError = () => {
    clearErrors("result");
  };
  
  const onSubmitValid = (data: any) => {
    if (loading) {
      return;
    }
    console.log("editCoffeeShop");
    console.log(data);
    editCoffeeShop({
      variables: {
        id: shop_id,
        name: data?.name,
        latitude: data?.latitude,
        longitude: data?.longitude,
      },
    });
  }

  return (
    <AuthLayout>
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faDev} size="3x" />
          <Subtitle>
            Update your Cafe.
          </Subtitle>
        </HeaderContainer>
        <form onSubmit={handleSubmit(onSubmitValid)}>
          <Input ref={register({})}
            name="name"
            type="text"
            onChange={clearCreateError}
            hasError={Boolean(errors?.name?.message)}
            placeholder="name"
          />
          <Input ref={register({ })}
            name="latitude"
            type="text"
            onChange={clearCreateError}
            hasError={Boolean(errors?.latitude?.message)}
            placeholder="latitude"
          />
          <Input
            ref={register({
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
            name="categories"
            type="text"
            onChange={clearCreateError}
            placeholder="categories"
          />
          <Button
            type="submit"
            value={loading ? "Loading..." : "Update"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
      <BottomBox cta="" linkText="home" link={routes.home} />
    </AuthLayout>
  );
}
export default Edit;