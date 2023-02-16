import { MovieList, Users } from "../FakeData.js";
import _ from "lodash";
export const resolvers = {
	Query: {
		users() {
			return Users;
		},
		user: (parent, args) => {
			const { id } = args;
			console.log(id);
			const user = _.find(Users, { id: Number(id) });
			return user;
		},
		movies: () => {
			return MovieList;
		},
		movie: (parent, args) => {
			const { name } = args;
			const movie = _.find(MovieList, { name: name });
			return movie;
		},
	},
	User: {
		favoriteMovies: () => {
			return _.filter(
				MovieList,
				(movie) =>
					movie.yearOfPublication >= 2000 &&
					movie.yearOfPublication <= 2010
			);
		},
	},
	Mutation: {
		createUser: (parent, args) => {
			const { user } = args;
			user.id = Users.length + 1;
			console.log(user);
			Users.push(user);
			return user;
		},
		updateUser: (parent, args) => {
			const { id, newUsername } = args.user;
			let userToUpdate;
			Users.forEach((userItem) => {
				if (userItem.id === Number(id)) {
					userItem.username = newUsername;
					userToUpdate = userItem;
				}
			});
			console.log(userToUpdate);
			return userToUpdate;
		},
		deleteUser: (parent, args) => {
			const { id } = args;
			_.remove(Users, (userItem) => userItem.id === Number(id));
			return null;
		},
	},
};
