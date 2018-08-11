module.exports = [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: (request, h) => {
        const context = {
          title: 'Pua',
          isAuthenticated: false
        };
        context.state = `window.state = ${JSON.stringify(context)};`;
        return h.view('home/index', context);
      }
    }
  }
];
