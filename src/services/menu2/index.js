export const getMenuData = [
  {
    category: true,
    title: 'Apps & Pages',
  },
  // {
  //   title: '아파트 / 주택',
  //   key: 'apps',
  //   icon: 'environment',
  //   children: [
  //     {
  //       title: '검색',
  //       key: 'appsProfile',
  //       url: '/apps/profile',
  //     },
  //     {
  //       title: '즐겨찾기',
  //       key: 'appsCalendar',
  //       url: '/apps/calendar',
  //     },
  //   ],
  // },
  // {
  //   title: '분양 정보',
  //   key: 'extraApps',
  //   icon: 'calendar',
  //   children: [
  //     {
  //       title: '분양 일정',
  //       key: 'extraAppsGithubExplore',
  //       url: '/apps/github-explore',
  //     },
  //   ],
  // },
  {
    title: '아파트 / 주택',
    key: 'apps',
    icon: 'environment',
    children: [
      {
        title: '검색',
        key: 'housesSearch',
        url: '/houses/search',
      },
      {
        title: '즐겨찾기',
        key: 'housesInterest',
        url: '/houses/interest',
      },
    ],
  },
  {
    title: '분양 정보',
    key: 'extraApps',
    icon: 'calendar',
    children: [
      {
        title: '분양 일정',
        key: 'bunyang',
        url: '/bunyang',
      },
    ],
  },
  {
    title: '관심 지역',
    key: 'interestarea',
    icon: 'pushpin',
    children: [
      {
        title: '관심 지역 관리',
        key: 'interestareaManage',
        url: '/interestarea/manage',
      },
      {
        title: '주변 상권',
        key: 'interestareaStores',
        url: '/interestarea/stores',
      },
      {
        title: '주변 기타 정보',
        key: 'interestareaEtc',
        url: '/interestarea/etc',
      },
      { // TEST
        title: '관심 통합',
        key: 'interestManage',
        url: '/interest/manage',
      },
    ],
  },
  {
    title: '고객 지원',
    key: 'help',
    icon: 'question-circle',
    children: [
      {
        title: '공지사항',
        key: 'helpNotices',
        url: '/help/notices',
      },
      {
        title: 'QnA',
        key: 'helpQnA',
        url: '/help/qnas',
      },
    ],
  },
]
