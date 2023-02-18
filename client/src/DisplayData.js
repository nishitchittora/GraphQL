import { useQuery, gql, useLazyQuery } from "@apollo/client";

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

function DisplayData() {
	const { data, loading, error } = useQuery(QUERY_ALL_USER);
	const [fetchMovie, { data: movieSearchedData, error: movieError }] =
		useLazyQuery(GET_MOVIE_BY_NAME);

	console.log(movieSearchedData);
	return (
		<h1>
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
