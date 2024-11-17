// resolvers.ts
import User, { UserDocument } from '../models/User';
import bookSchema, { BookDocument } from '../models/Book';



const resolvers = {
    Query: {
        me: async (_parent: any, context: any) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('books');

                return userData;
            }

            throw new Error('Not logged in');
        },
    },
    Mutation: {
        login: async (_parent: any, { email, password }: any) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new Error('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new Error('Incorrect credentials');
            }

            return user;
        },
        addUser: async (_parent: any, args: any) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (_parent: any, { bookData }: any, context: any) => {
            if (context.user) {
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedBooks: bookData } },
                    { new: true }
                );

                return updatedUser;
            }

            throw new Error('You need to be logged in!');
        },
        removeBook: async (_parent: any, { bookId }: any, context: any) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );

                return updatedUser;
            }

            throw new Error('You need to be logged in!');
        },
    },
};