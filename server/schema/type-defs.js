import { gql } from "apollo-server";

export const typeDefs = gql`
	type User {
		id: ID!
		name: String!
		username: String!
		age: Int!
		nationality: Nationality!
		friends: [User]
		favoriteMovies: [Movie!]
	}
	type Query {
		users: [User!]!
		user(id: ID!): User!
		movies: [Movie!]!
		movie(name: String!): Movie!
	}
	input CreateUserInput {
		name: String!
		username: String!
		age: Int!
		nationality: Nationality = BRAZIL
	}
	input UpdateUserInput {
		id: ID!
		newUsername: String!
	}
	type Mutation {
		createUser(user: CreateUserInput!): User!
		updateUser(user: UpdateUserInput!): User!
		deleteUser(id: ID!): User
	}
	type Movie {
		id: ID!
		name: String!
		yearOfPublication: Int!
		isInTheaters: Boolean!
	}
	enum Nationality {
		CANADA
		BRAZIL
		INDIA
		GERMANY
		CHILE
	}
`;
