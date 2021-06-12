import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import Avatar from "../components/Avatar";
import AuthLayout from "../components/auth/AuthLayout";
import Button from "../components/auth/Button";
import routes from "../routes";

const SEECOFFEESHOP_QUERY = gql`
  query seeCoffeeShop($id:Int!) {
    seeCoffeeShop(id:$id) {
      id
      name
      latitude
      longitude
      photos {
        id
        url
      }
      categories {
        id
        name
      }
      user {
        id
        avatarURL
        name
      }
      isMine
    }
  }
`;

const PhotoFile = styled.img`
  width: 300px;
  height: 300px;
`;

const Name = styled.div`
  margin: 15px 0px;
`;

const SLink = styled(Link)``;

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
  align-items: center;
`;
const PhotoHeader = styled.div`
  align-items: center;
  padding: 5px 10px;
`;
const ProfileHeader = styled.div`
  align-items: center;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
`;

const SBottomBox = styled.div`
  padding: 35px 40px 25px 40px;
  text-align: center;
  a {
    font-weight: 600;
    margin-left: 5px;
    color: ${(props) => props.theme.accent};
  }
`;

const Shop = () => {
    const history = useHistory();
    const { id } = useParams<{ id: string }>();
    const Shopid=Number(id.replace(":", ""));
    console.log(Shopid);
    const { data } = useQuery(SEECOFFEESHOP_QUERY, { variables: {id:Shopid}});
    const item = data?.seeCoffeeShop;
    console.log(item);
    
    return (
    <AuthLayout>
        <PhotoContainer key={Shopid}>
          <PhotoHeader>
              <ProfileHeader>
                  <Avatar url={item?.user?.avatarURL} />
                  <Name>{item?.user?.name}</Name>
              </ProfileHeader>
          <div>
              <Name>
                  lat {item?.latitude}, long {item?.longitude}
              </Name>
              <div>
                  <Name> cafeName : {item?.name}</Name>
              </div>
            </div>
            <div>
            {item?.photos[0]?.url ? (
                <PhotoFile src={item.photos[0].url} />
            ) : (
                <PhotoFile src={`https://via.placeholder.com/${50}x${40}?text=${item?.name}`}/>
            )}
            </div>
            {item?.isMine ? (
              <SLink to={`/shop/:${Shopid}/edit`}>
              <Button
                  type="submit"
                  value={"Edit Cafe"}
                  disabled={item?.isMine}
                />
              </SLink>
            ) : null}
            <SBottomBox>
              <Link to={routes.home}>{"Home"}</Link>
            </SBottomBox>
          </PhotoHeader>
          
        </PhotoContainer>
       
    </AuthLayout>
    );
   
}
export default Shop;