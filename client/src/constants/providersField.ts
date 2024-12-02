interface Field {
  label: string;
  type: "email" | "phone" | "text" | "date" | "number" | "checkbox";
  validation?: RegExp;
}

export interface ProviderFields {
  userEmail?: Field;
  userPhone?: Field;
  personalAccount?: Field;
  lastName?: Field;
  firstName?: Field;
  patronymic?: Field;
  lastPayedSum?: Field;
  date?: {
    month: {
      label: string;
      type: string;
    };
    year: {
      label: string;
      type: string;
    };
  };
  amountDue?: Field;
  street?: Field;
  building?: Field;
  apartment?: Field;
  privateHome?: Field;
  threeFirstLaterLastName?: Field;
  description?: string;
}

interface ProvidersField {
  khimvolokno: ProviderFields;
  teplokomun: ProviderFields;
  energozbut: ProviderFields;
  vodokanal: ProviderFields;
  cherkasygas: ProviderFields;
  naftogas: ProviderFields;
  gazmeregi: ProviderFields;
}

interface ProvidersField {
  [key: string]: ProviderFields;
}

export const providersField: ProvidersField = {
  khimvolokno: {
    userEmail: {
      label: "Електронна пошта",
      type: "email",
      validation: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },
    userPhone: {
      label: "Номер телефону",
      type: "phone",
      validation: /^(?:\+38)?\s?0\d{2}[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/,
    },
    personalAccount: {
      label: "Особовий рахунок",
      type: "number",
      validation: /^\d+$/,
    },
    lastName: {
      label: "Прізвище",
      type: "text",
      validation: /^[A-Za-zА-Яа-яІіЇїЄє]{2,}$/,
    },
    firstName: {
      label: "Ім’я",
      type: "text",
      validation: /^[A-Za-zА-Яа-яІіЇїЄє]{2,}$/,
    },
    description:
      "Оберіть вашу обслуговуючу компанію та внесіть дані про останню оплачену суму.",
    lastPayedSum: {
      label: "Остання оплачена сума",
      type: "text",
      validation: /^\d+$/,
    },
  },
  teplokomun: {
    userPhone: {
      label: "Номер телефону",
      type: "phone",
    },
    personalAccount: {
      label: "Особовий рахунок",
      type: "number",
      validation: /^\d+$/,
    },
    description:
      "Оберіть послугу з платіжки та внесіть дані про останню оплачену суму.",
    lastPayedSum: {
      label: "Остання оплачена сума",
      type: "number",
    },
  },
  energozbut: {
    userEmail: {
      label: "Електронна пошта",
      type: "email",
      validation: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },
    userPhone: {
      label: "Номер телефону",
      type: "phone",
      validation: /^(?:\+38)?\s?0\d{2}[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/,
    },
    personalAccount: {
      label: "Особовий рахунок",
      type: "number",
      validation: /^\d+$/,
    },
    lastName: {
      label: "Прізвище",
      type: "text",
      validation: /^[A-Za-zА-Яа-яІіЇїЄє]{2,}$/,
    },
    firstName: {
      label: "Ім’я",
      type: "text",
      validation: /^[A-Za-zА-Яа-яІіЇїЄє]{2,}$/,
    },
    patronymic: {
      label: "По-батькові",
      type: "text",
    },
    description:
      "Внесіть дані про нарахування (сума до сплати) з рахунку за електроенергію за один з трьох останніх місяців.",
    date: {
      month: {
        label: "Місяць",
        type: "date",
      },
      year: {
        label: "Рік",
        type: "date",
      },
    },
    amountDue: {
      label: "Сума до сплати",
      type: "number",
      validation: /^\d+$/,
    },
  },
  vodokanal: {
    userEmail: {
      label: "Електронна пошта",
      type: "email",
      validation: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },
    userPhone: {
      label: "Номер телефону",
      type: "phone",
      validation: /^(?:\+38)?\s?0\d{2}[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/,
    },
    personalAccount: {
      label: "Особовий рахунок",
      type: "number",
      validation: /^\d+$/,
    },
    street: {
      label: "Вулиця",
      type: "text",
    },
    building: {
      label: "Будинок",
      type: "text",
    },
    apartment: {
      label: "Квартира",
      type: "text",
    },
    privateHome: {
      label: "В мене приватний будинок",
      type: "checkbox",
    },
  },
  cherkasygas: {
    userEmail: {
      label: "Електронна пошта",
      type: "email",
      validation: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },
    userPhone: {
      label: "Номер телефону",
      type: "phone",
      validation: /^(?:\+38)?\s?0\d{2}[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/,
    },
    personalAccount: {
      label: "Особовий рахунок",
      type: "number",
      validation: /^\d+$/,
    },
    threeFirstLaterLastName: {
      label: "Перші три літери прізвища",
      type: "text",
      validation: /^[A-Za-zА-Яа-яІіЇїЄє]{3}$/,
    },
    description:
      "Для авторизаціх введіть перші три літери прізвища власника рахунку.",
  },
  naftogas: {
    userEmail: {
      label: "Електронна пошта",
      type: "email",
      validation: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },
    userPhone: {
      label: "Номер телефону",
      type: "phone",
      validation: /^(?:\+38)?\s?0\d{2}[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/,
    },
    personalAccount: {
      label: "Особовий рахунок",
      type: "number",
      validation: /^\d+$/,
    },
    threeFirstLaterLastName: {
      label: "Перші три літери прізвища",
      type: "text",
      validation: /^[A-Za-zА-Яа-яІіЇїЄє]{3}$/,
    },
    description:
      "Для авторизаціх введіть перші три літери прізвища власника рахунку",
  },
  gazmeregi: {
    userEmail: {
      label: "Електронна пошта",
      type: "email",
      validation: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    },
    userPhone: {
      label: "Номер телефону",
      type: "phone",
      validation: /^(?:\+38)?\s?0\d{2}[-\s]?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/,
    },
    personalAccount: {
      label: "Особовий рахунок",
      type: "number",
      validation: /^\d+$/,
    },
    threeFirstLaterLastName: {
      label: "Перші три літери прізвища",
      type: "text",
      validation: /^[A-Za-zА-Яа-яІіЇїЄє]{3}$/,
    },
    description:
      "Для авторизаціх введіть перші три літери прізвища власника рахунку",
  },
};
