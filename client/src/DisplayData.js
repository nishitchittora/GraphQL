import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client";

const QUERY_ALL_USER = gql`
	query GetAllUsers {
		users {
			id
			age
			name
			username
			nationality
			friends {
				name
			}
		}
	}
`;

const GET_MOVIE_BY_NAME = gql`
	query Moview($name: String!) {
		movie(name: $name) {
			name
			yearOfPublication
		}
	}
`;

const CREATE_USER_MUTATION = gql`
	mutation CreateUser($user: CreateUserInput!) {
		createUser(user: $user) {
			name
			username
			age
		}
	}
`;

function DisplayData() {
	const { data, loading, error, refetch } = useQuery(QUERY_ALL_USER);
	const [fetchMovie, { data: movieSearchedData, error: movieError }] =
		useLazyQuery(GET_MOVIE_BY_NAME);
	const [createUser] = useMutation(CREATE_USER_MUTATION);
	console.log(movieSearchedData);
	return (
		<h1>
			<div
				onClick={() => {
					createUser({
						variables: {
							user: {
								name: "nishit1",
								username: "worldwide1",
								age: 28,
								nationality: "BRAZIL",
							},
						},
					});
					refetch();
				}}
			>
				Click here to create User
			</div>
			List User
			{data && data?.users?.map((user) => <div>{user.name}</div>)}
			<div
				onClick={() =>
					fetchMovie({
						variables: {
							name: "Interstellar",
						},
					})
				}
			>
				Click here
			</div>
			<div>{movieSearchedData?.movie?.name}</div>
		</h1>
	);
}

export default DisplayData;
