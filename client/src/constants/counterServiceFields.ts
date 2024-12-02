import Day from "@/assets/images/day.svg";
import Night from "@/assets/images/night.svg";
import WaterHot from "@/assets/images/waterHot.svg";
import WaterCold from "@/assets/images/waterCold.svg";
import Fire from "@/assets/images/fire.svg";

interface IIcons {
  waterHot: string;
  waterCold: string;
  day: string;
  night: string;
  fire: string;
}

const icons: IIcons = {
  waterHot: WaterHot,
  waterCold: WaterCold,
  day: Day,
  night: Night,
  fire: Fire,
};

export interface ICountersObject {
  type: string;
  name: string;
  label: string;
  number: string;
  icon: string;
}

export interface ICountersData {
  service: string;
  counters: ICountersObject[];
}

export const countersData: ICountersData[] = [
  {
    service: "khimvolokno",
    counters: [
      {
        type: "Гаряча вода (Кухня)",
        name: "hotWaterKitchenCounterKhimvolokno",
        label: "Поточний показник",
        number: "№60734845_033454",
        icon: icons.waterHot,
      },
      {
        type: "Гаряча вода (Ванна)",
        name: "hotWaterBathroomCounterKhimvolokno",
        label: "Поточний показник",
        number: "№60734845_033221",
        icon: icons.waterHot,
      },
    ],
  },
  {
    service: "teplokomun",
    counters: [
      {
        type: "Гаряча вода (Кухня)",
        name: "hotWaterKitchenCounterTeplokomun",
        number: "№60734845_033454",
        icon: icons.waterHot,
        label: "Поточний показник",
      },
      {
        type: "Гаряча вода (Ванна)",
        name: "hotWaterBathroomCounterTeplokomun",
        number: "№60734845_033221",
        icon: icons.waterHot,
        label: "Поточний показник",
      },
    ],
  },
  {
    service: "energozbut",
    counters: [
      {
        type: "День",
        name: "dayCounterEnergozbut",
        number: "№32198-24",
        icon: icons.day,
        label: "Поточний показник",
      },
      {
        type: "Ніч",
        name: "nightCounterEnergozbut",
        number: "№32198-24",
        icon: icons.night,
        label: "Поточний показник",
      },
    ],
  },
  {
    service: "vodokanal",
    counters: [
      {
        type: "Холодна вода (Кухня)",
        name: "coldWaterKitchenCounterVodokanal",
        number: "№033221",
        icon: icons.waterCold,
        label: "Поточний показник",
      },
      {
        type: "Гаряча вода (Кухня)",
        name: "hotWaterKitchenCounterVodokanal",
        number: "№534216",
        icon: icons.waterHot,
        label: "Поточний показник",
      },
      {
        type: "Холодна вода (Санвузол)",
        name: "coldWaterBathroomCounterVodokanal",
        number: "№531213",
        icon: icons.waterCold,
        label: "Поточний показник",
      },
      {
        type: "Гаряча вода (Санвузол)",
        name: "hotWaterBathroomCounterVodokanal",
        number: "№534332",
        icon: icons.waterHot,
        label: "Поточний показник",
      },
    ],
  },
  {
    service: "naftogas",
    counters: [
      {
        type: "Газовий лічильник",
        name: "gasCounterNaftogas",
        number: "EIC: 54VE59B23752218X",
        icon: icons.fire,
        label: "Поточний показник",
      },
    ],
  },
  {
    service: "cherkasygas",
    counters: [
      {
        type: "Газовий лічильник",
        name: "gasCounterCherkasygas",
        number: "EIC: 54VE59B23752218X",
        icon: icons.fire,
        label: "Поточний показник",
      },
    ],
  },
  {
    service: "gazmeregi",
    counters: [
      {
        type: "Газовий лічильник",
        name: "gasCounterGazmeregi",
        number: "EIC: 54VE59B23752218X",
        icon: icons.fire,
        label: "Поточний показник",
      },
    ],
  },
];
