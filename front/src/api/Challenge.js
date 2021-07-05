import Client from './Client';

const c = new Client();

const formatData = challenge => {
  return {
    id: challenge.id,
    title: challenge.title_res,
    illustration: {
      uri: c.imagesUrl + challenge.image_res,
    },
    shortDesc: challenge.content,
    longDesc: challenge.content_long,
    difficulty: challenge.difficulty,
    doWith: challenge.doWith
      .map(item =>
        Object.values(item)
          .map(who => who.label)
          .join(', '),
      )
      .flat(),
    totalTestimonials: challenge.comments.length,
    reward: {
      icon: {
        uri: c.imagesUrl + challenge.reward.icon,
      },
      desc: challenge.reward.wording,
      rank: challenge.reward.rank,
    },
    popular: challenge.popular,
    recent: challenge.recent,
    comments: challenge.comments.map(comment => ({
      comment: comment.commentaire,
      author: comment.user.firstname + ' ' + comment.user.lastname,
    })),
    started: challenge.started,
  };
};

export const getChallenges = async () => {
  return (await c.list('ressources')).map(challenge => formatData(challenge));
};

export const getChallenge = async id => {
  return formatData(await c.get('ressources', id));
};

export const startChallenge = async (id, user_id) => {
  return (
    await c.getAxios().put(c.url('ressources/' + id + '/start'), {
      id,
      user_id,
    })
  ).data;
};

export const cancelChallenge = async (id, user_id) => {
  return (
    await c.getAxios().put(c.url('ressources/' + id + '/cancel'), {
      id,
      user_id,
    })
  ).data;
};

export const getBookmarks = async () => {
  return (await c.list('ressources/bookmarks')).map(challenge =>
    formatData(challenge),
  );
};

export const getRewards = async () => {
  return [
    {
      title: 'Mini-Capus',
      challenge: {
        id: 1,
        title: 'Coffee Bar',
      },
    },
    {
      title: 'Sergent-Capus',
      challenge: {
        id: 1,
        title: 'Coffee Bar',
      },
    },
    {
      title: 'Grand protecteur',
      challenge: {
        id: 3,
        title: 'Hôtel à insectes',
      },
    },
  ];
};
