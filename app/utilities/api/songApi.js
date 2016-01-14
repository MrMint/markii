export function fetchSongsByKeyword(keyword) {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{
        id: 'f7ab15c5-72f9-4922-b6a8-3e3028941fa6',
        name: 'Song 1',
        source: 'YOUTUBE',
        sourceId: 'fLK42eB71xo',
        thumbnail: 'i.ytimg.com/vi/fLK42eB71xo/default.jpg',
      }, {
        id: '0cc1dd19-4aac-432f-980f-cf476748bef1',
        name: 'Song 2',
        source: 'YOUTUBE',
        sourceId: 'fLK42eB71xo',
        thumbnail: 'i.ytimg.com/vi/fLK42eB71xo/default.jpg',
      }, {
        id: 'a80fc6db-ce00-40a8-9232-53a388ce1d50',
        name: 'Song 3',
        source: 'YOUTUBE',
        sourceId: 'fLK42eB71xo',
        thumbnail: 'i.ytimg.com/vi/fLK42eB71xo/default.jpg',
      }, {
        id: 'ec62b8ae-b455-466a-8c14-4246d503e9b4',
        name: 'Song 4',
        source: 'YOUTUBE',
        sourceId: 'fLK42eB71xo',
        thumbnail: 'i.ytimg.com/vi/fLK42eB71xo/default.jpg',
      }]);
    }, 1000); // simulate server latency
  });
}
