const settings = {
  graphql: {
    uri: 'http://localhost:5001/api/graphql',
  },
  meta: {
    rootUrl: 'https://co-chat.vercel.app/',
    title: 'CoChat',
    description:
      'CoChat hadir untuk memberikan kedaulatan layanan pesan sementara secara instan Indonesia dengan keamanan yang terjamin.',
    social: {
      graphic: 'https://i.ibb.co/KK7DP42/logo.png',
      twitter: '@cochat',
    },
  },
  routes: {
    authenticated: {
      pathAfterFailure: '/login',
    },
    public: {
      pathAfterFailure: '/documents',
    },
  },
};

export default settings;
