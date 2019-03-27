const source = [
  {
    id: 1,
    label: 'Australia',
    isExpand: true,
    isSelect: false,
    children: [
      {
        id: 11,
        label: 'NSW',
        isExpand: false,
        isSelect: false,
        children: [
          {
            id: 111,
            label: 'Sydney',
            isSelect: false
          },
          {
            id: 112,
            label: 'Central Coast',
            isSelect: false
          }
        ]
      },
      {
        id: 12,
        label: 'QLD',
        isExpand: false,
        children: [
          {
            id: 121,
            label: 'Gold Coast'
          },
          {
            id: 122,
            label: 'Sunshine Coast'
          }
        ]
      },
      {
        id: 13,
        label: 'Victoria',
        isExpand: false,
        children: [
          {
            id: 131,
            label: 'Melbourne'
          }
        ]
      },
      {
        id: 14,
        label: 'Western Australia',
        isExpand: false,
        children: [
          {
            id: 141,
            label: 'Perth'
          }
        ]
      },
      {
        id: 15,
        label: 'ACT'
      }
    ]
  },
  {
    id: 2,
    label: 'New Zealand'
  }
];

export default source;
