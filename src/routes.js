const apiPath = 'https://shibe.online/api/shibes';

const routes = {
  api: {
    picturesPath: (picturesNumber = 1) => [apiPath, '?', 'count=', picturesNumber].join(''),
  },
  pages: {
    rootPath: () => '/',
  },
};

export default routes;
