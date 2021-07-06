export const getAgendaItemLanguageOptions = () => [
  { value: null, text: "Не указано" },
  { value: "RU", text: "RU" },
  { value: "EN", text: "EN" },
];

export const getAgendaItemsFieldSpecifications = () => {
  const common = [
    {
      title: "Нестандартный текст (необязательно)",
      field: "title",
      component: "app-input",
      model: { prop: "value", event: "input" },
      props: {},
    },
  ];

  return {
    registration: [...common],
    opening: [...common],
    talk: [
      {
        title: "Тема",
        field: "title",
        component: "app-input",
        model: { prop: "value", event: "input" },
        props: {},
      },
      {
        title: "Докладчик",
        field: "speaker",
        component: "app-input",
        model: { prop: "value", event: "input" },
        props: {},
      },
      {
        title: "Описание",
        field: "description",
        component: "app-input",
        model: { prop: "value", event: "input" },
        props: {
          multiline: true,
        },
      },
      {
        title: "Язык",
        field: "language",
        component: "dropdown-button",
        model: { prop: "value", event: "change" },
        props: {
          options: getAgendaItemLanguageOptions(),
          title: "Язык",
        },
      },
    ],
    break: [...common],
    coffee: [...common],
    closing: [...common],
    afterparty: [...common],
    other: [
      {
        title: "Заголовок",
        field: "title",
        component: "app-input",
        model: { prop: "value", event: "input" },
        props: {},
      },
      {
        title: "Описание",
        field: "description",
        component: "app-input",
        model: { prop: "value", event: "input" },
        props: {
          multiline: true,
        },
      },
    ],
  };
};
