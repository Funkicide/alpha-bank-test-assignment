const picturesPath = 'https://shibe.online/api/shibes';
const factsPath = 'https://meowfacts.herokuapp.com/';

const routes = {
  api: {
    picturesPath: (picturesNumber = 1) => [picturesPath, '?', 'count=', picturesNumber].join(''),
    factsPath: (factsNumber = 1) => [factsPath, '?', 'count=', factsNumber].join(''),
  },
  pages: {
    rootPath: () => '/',
  },
};

export default routes;
