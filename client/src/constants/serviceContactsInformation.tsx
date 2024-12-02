import kyivstar from "@/assets/images/kyivstar.svg";
import vodafone from "@/assets/images/vodafone.svg";
import lifecell from "@/assets/images/lifecell.svg";
import stationary_phone from "@/assets/images/stationary_phone.svg";
import mobile from "@/assets/images/mobile.svg";

import khimvolokno from "@/assets/images/khimvolokno.svg";
import naftogas from "@/assets/images/naftogas.svg";
import energozbut from "@/assets/images/energozbut.svg";
import gazmeregi from "@/assets/images/gazmeregi.svg";
import vodokanal from "@/assets/images/vodokanal.svg";
import teplokomun from "@/assets/images/teplokomun.svg";

export interface IContact {
  icon: string;
  provider: string;
  phones: string[];
}

interface IServiceContactsInformation {
  name: string;
  providerName: string;
  department: string;
  icon: string;
  site: string;
  workSchedule: string;
  contacts: IContact[];
}

export const serviceContactsInformation: IServiceContactsInformation[] = [
  {
    name: "Хімволокно",
    providerName: "heat-supply",
    department: "Теплопостачання",
    icon: khimvolokno,
    site: "https://khimvolokno.com.ua/",
    workSchedule:
      "Графік роботи: З понеділка по четвер з 8:00 до 17:00, п’ятниця до 16:00 (без перерви)",
    contacts: [
      {
        icon: vodafone,
        provider: "Vodafonе",
        phones: ["+38 050 82 01 867", "+38 050 82 01 847"],
      },
      {
        icon: kyivstar,
        provider: "Kyivstar",
        phones: ["+38 067 57 47 496", "+38 067 57 74 839"],
      },
      { icon: lifecell, provider: "Lifecell", phones: ["+38 093 17 03 473"] },
      {
        icon: stationary_phone,
        provider: "Стаціонарний",
        phones: ["+38 (0472) 31 96 90"],
      },
    ],
  },
  {
    name: "Нафтогаз",
    department: "Газопостачання",
    providerName: "gas-supply",
    site: "https://gas.ua/uk/home",
    icon: naftogas,
    workSchedule:
      "Графік роботи: З понеділка по четвер з 8:00 до 17:00, п’ятниця до 16:00 (без перерви)",
    contacts: [
      {
        icon: vodafone,
        provider: "Vodafonе",
        phones: ["+38 066 300 2 888"],
      },
      {
        icon: kyivstar,
        provider: "Kyivstar",
        phones: ["+38 098 300 2 888"],
      },
      {
        icon: lifecell,
        provider: "Lifecell",
        phones: ["+38 093 300 2 888"],
      },
    ],
  },
  {
    name: "Черкасиенергозбут",
    providerName: "electricity-supply",
    department: "Електропостачання",
    icon: energozbut,
    site: "https://energozbut.ck.ua/",
    workSchedule:
      "Графік роботи: З понеділка по четвер з 8:00 до 17:00, п’ятниця до 16:00 (без перерви)",
    contacts: [
      {
        icon: stationary_phone,
        provider: "Стаціонарний",
        phones: ["+38 (0472) 316 316"],
      },
    ],
  },
  {
    name: "Газмережі Черкаси",
    providerName: "gas-supply",
    department: "Газопостачання",
    icon: gazmeregi,
    site: "https://ck.grmu.com.ua/",
    workSchedule:
      "Графік роботи: З понеділка по четвер з 8:00 до 17:00, п’ятниця до 16:00 (без перерви)",
    contacts: [
      {
        icon: vodafone,
        provider: "Vodafonе",
        phones: ["+38 066 300 2 888"],
      },
      {
        icon: kyivstar,
        provider: "Kyivstar",
        phones: ["+38 098 300 2 888"],
      },
      {
        icon: lifecell,
        provider: "Lifecell",
        phones: ["+38 093 300 2 888"],
      },
    ],
  },
  {
    name: "Черкасиводоканал",
    providerName: "water-supply",
    department: "Водопостачання",
    icon: vodokanal,
    site: "https://vodokanal-cherkasy.ck.ua/",
    workSchedule:
      "Графік роботи: З понеділка по четвер з 8:00 до 17:00, п’ятниця до 16:00 (Перерва з 12:00 до 12:48)",
    contacts: [
      {
        icon: mobile,
        provider: "З мобільних",
        phones: ["0 800 300 410"],
      },
    ],
  },
  {
    name: "Теплокомуненерго",
    providerName: "heat-supply",
    department: "Теплопостачання",
    icon: teplokomun,
    site: "https://tke.ck.ua/",
    workSchedule:
      "Графік роботи: З понеділка по четвер з 8:00 до 17:00, п’ятниця до 16:00 (Перерва з 12:00 до 12:48)",
    contacts: [
      {
        icon: mobile,
        provider: "З мобільних",
        phones: ["0 800 505 200"],
      },
    ],
  },
];
