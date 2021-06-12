import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import {Link} from "react-router-dom";

const SEECOFFEESHOPS_QUERY = gql`
  query seeCoffeeShops($page:Int) {
    seeCoffeeShops(page:$page) {
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
const Wrapper = styled.div`

  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
`;
const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
`;
const PhotoHeader = styled.div`
  align-items: center;
  padding: 5px 10px;
`;

const Home = () => {

  const { data } = useQuery(SEECOFFEESHOPS_QUERY, { variables: {page:1}});
  let items = data?.seeCoffeeShops.map((item:any) => (
    <PhotoContainer key={item.id}>
      <PhotoHeader>
        <SLink to={`/shop/:${item.id}`}>
          <div>
            <span>
              {item.latitude}, {item.longitude}
            </span>
          </div>
          <div>
            {item.photos[0]?.url ? (
              <PhotoFile src={item.photos[0].url} />
            ) : (
              <PhotoFile src={`https://via.placeholder.com/${50}x${40}?text=${item.name}`}/>
            )}
          </div>
          <div>
            <Name>{item.name}</Name>
          </div>
        </SLink>
      </PhotoHeader>
    </PhotoContainer>
));
  return (
  <>
    <Wrapper>
      {items}
    </Wrapper>
    <button onClick={() => logUserOut()}>Log out now!</button>
  </>
  );
}
export default Home;