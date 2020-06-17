export const getMenuData = [
  {
    category: true,
    title: 'Apps & Pages',
  },
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
    title: '관심 정보',
    key: 'interestarea',
    icon: 'pushpin',
    children: [
      { // TEST
        title: '관심 정보 관리',
        key: 'interestManage',
        url: '/interest/manage',
      },
      {
        title: '주변 상권',
        key: 'interestStores',
        url: '/interest/stores',
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
