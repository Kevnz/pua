const uuidv1 = require('uuid/v1');

const saveDetails = async (request, h, query) => {
  const updateData = Object.assign({}, query, {
    profile: request.auth.credentials.profile
  });
  console.log('profile', updateData);
  await request.db.users.update(query, updateData, {
    upsert: true
  });
  const info = await request.db.users.findOne(query);
  return h.redirect(`/`);
};

module.exports = [
  {
    method: ['GET', 'POST'],
    path: '/auth/twitter',
    options: {
      auth: 'twitter',
      handler: async (request, h) => {
        if (!request.auth.isAuthenticated) {
          return `Authentication failed due to: ${request.auth.error.message}`;
        }
        console.log('request.auth.credentials', request.auth.credentials);
        const query = {
          twitterId: request.auth.credentials.profile.id
        };
        const user = await request.db.users.findOne(query);

        const out = {
          valid: !!user
        };

        if (!out.valid) {
          return saveDetails(request, h, query);
        }
        /*
        const query = {
          id: user.id
        };
        const updateData = Object.assign({}, user, {
          profile: request.auth.credentials.profile
        });
        await request.db.users.update(query, updateData, {
          upsert: true
        });
        */
        return h.redirect('/');
      }
    }
  }
];
