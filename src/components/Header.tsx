import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import Avatar from "./Avatar";
import { faHome, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import { Link } from "react-router-dom";
import routes from "../routes";
import useUser from "../hooks/useUser";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  padding: 18px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 4px 15px;
  color: white;
  font-weight: 600;
`;
const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;


const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;
const SLink = styled(Link)``;
const Icon = styled.span`
  margin-left: 15px;
`;

function Header() {
    const isLoggedIn = useReactiveVar(isLoggedInVar);
    const { data } = useUser();
    return (
        <SHeader>
        <Wrapper>
            <Column>
            <FontAwesomeIcon icon={faInstagram} size="2x" />
            </Column>
            <Column>
            {isLoggedIn ? (
                <IconsContainer>
                <Icon>
                  <SLink to={routes.home}>
                    <FontAwesomeIcon icon={faHome} size="lg" />
                  </SLink>
                </Icon>
                <Icon>
                  <SLink to={routes.createShop}>
                    <FontAwesomeIcon icon={faPlus} size="lg" />
                  </SLink>
                </Icon>
                <Icon>
                    <Avatar url={data?.me?.avatar} />
                </Icon>
                </IconsContainer>
            ) : (
                <Link to={routes.home}>
                <Button>Login</Button>
                </Link>
            )}
            </Column>
        </Wrapper>
        </SHeader>
    );
}
export default Header;