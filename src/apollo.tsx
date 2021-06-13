import {
  ApolloClient,
  from,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import { onError } from "@apollo/client/link/error";

const TOKEN = "token";
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));

export const logUserIn = (token:string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  window.location.reload();
};

export const darkModeVar = makeVar(false);
const httpLinkOptions = {
  uri: process.env.NODE_ENV === "production"? "https://woori-nomadcoffe-backend.herokuapp.com/graphql":"http://localhost:4000/graphql",
}

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
});
const uploadHttpLink = createUploadLink(httpLinkOptions);
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

export const client = new ApolloClient({
  link: from([errorLink, authLink.concat(uploadHttpLink)]),
  cache: new InMemoryCache(),
});