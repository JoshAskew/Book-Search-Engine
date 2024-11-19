import User from '../models/User.js';
import { signToken } from '../services/auth.js';
const resolvers = {
    Query: {
        me: async (_parent, _args, context) => {
            console.log('Context', context.user);
            if (!context.user) {
                throw new Error('Authentication required');
            }
            const foundUser = await User.findById(context.user._id).populate('savedBooks');
            if (!foundUser) {
                throw new Error('User not found');
            }
            return foundUser;
        },
    },
    Mutation: {
        login: async (_parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('Could not authenticate user.');
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new Error('Wrong credentials.');
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        addUser: async (_parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            // Generate JWT token for new user
            const token = signToken(user.username, user.email, user._id);
            return { user, token };
        },
        saveBook: async (_parent, { bookData }, context) => {
            if (!context.user) {
                throw new Error('Authentication required');
            }
            const updatedUser = await User.findByIdAndUpdate(context.user._id, { $addToSet: { savedBooks: bookData } }, // Add to savedBooks without duplicates
            { new: true, runValidators: true }).populate('savedBooks');
            if (!updatedUser) {
                throw new Error('User not found');
            }
            return updatedUser;
        },
        removeBook: async (_parent, { bookId }, context) => {
            if (!context.user) {
                throw new Error('Authentication required');
            }
            const updatedUser = await User.findByIdAndUpdate(context.user._id, { $pull: { savedBooks: { bookId } } }, // Remove book matching bookId
            { new: true }).populate('savedBooks');
            if (!updatedUser) {
                throw new Error('User not found');
            }
            return updatedUser;
        },
    },
};
export default resolvers;
