import { gql } from "apollo-server";

const typeDefs = gql`
	type Query {
		greeting: String
	}
`;

const resolver = {
	Query: {
		greeting: () => "Hello World",
	},
};
