import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { logUserOut } from "../apollo";
import { FatText } from "../components/shared";
import { Link } from "react-router-dom";

const SEECOFFEESHOP_QUERY = gql`
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

const PhotoContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
`;
const PhotoHeader = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
`;

const Name = styled(FatText)`
  margin-left: 5px;
`;

const Home = () => {
  const { data } = useQuery(SEECOFFEESHOP_QUERY, { variables: {page:1}});
  console.log(data);
  let items = data?.seeCoffeeShops.map((item:any) => (
    <PhotoContainer key={item.id}>
      <PhotoHeader>
        <Link to={item.id}><Name>{item.name}</Name></Link>
      </PhotoHeader>
    </PhotoContainer>
));
return (
  <>
    {items}
    <button onClick={() => logUserOut()}>Log out now!</button>
  </>
  );
}
export default Home;