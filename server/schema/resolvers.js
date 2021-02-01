const { AuthenticationError } = require('apollo-server-express');
const { User, Courses, Lesson } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    courses: async () => {
      return await Courses.find();
    },

    lessons: async (parent, { courseName }) => {
      const params = {};

      if (courseName) {
        params.courseName = courseName;
      }

      return await Lesson.find(params).populate('courseName');
    },

    lesson: async (parent, { lessonId }, context) => {
      return await Lesson.findById(lessonId).populate('courseName');
    },

    users: async () => {
      return User.find().select('-__v -password');
    },

    me: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findOne({ _id: context.user });

        return user;
      }

      throw new AuthenticationError('Not logged in');
    }
  },

  Mutation: {
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // updateUser: async (parent, args, context) => {
    //   if (context.user) {
    //     return await User.findByIdAndUpdate(context.user._id, { $set: { args } }, { new: true });
    //   }
    //   throw new AuthenticationError('Not logged in');
    // },

    updateUser: async (parent, args, context) => {

      if (context.user) {
        return await User.findOneAndUpdate(
          { _id: context.user },
          {
            $set: {
              email: args.email,
              firstName: args.firstName,
              lastName: args.lastName,
              password: args.password
            }
          },
          { new: true }
        )
      };
    },


    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    }
  }
};

module.exports = resolvers;
