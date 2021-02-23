import { ApolloClient, InMemoryCache } from "@apollo/client";
import { PrismicLink } from "apollo-link-prismic";

export const client = new ApolloClient({
	link: PrismicLink({
		uri: "https://pbnb.prismic.io/graphql",
		accessToken: process.env.PRISMIC_TOKEN,
	}),
	cache: new InMemoryCache(),
});
