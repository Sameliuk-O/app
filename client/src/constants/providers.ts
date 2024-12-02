import vodokanal from "@/assets/images/vodokanal.svg";
import naftogas from "@/assets/images/naftogas.svg";
import gazmeregi from "@/assets/images/gazmeregi.svg";
import cherkasyGas from "@/assets/images/cherkasyGas.svg";
import energozbut from "@/assets/images/energozbut.svg";
import khimvolokno from "@/assets/images/khimvolokno.svg";
import teplokomun from "@/assets/images/teplokomun.svg";

interface IProvider {
  id: number;
  service: string;
  provider: string;
  icon: string;
  providerName: string;
  serviceName: string;
  contact: string;
}

export const providers: IProvider[] = [
  {
    id: 0,
    service: "Нафтогаз",
    provider: "Газопостачання",
    icon: naftogas,
    providerName: "gas-supply",
    serviceName: "naftogas",
    contact: "097-111-22-33",
  },
  {
    id: 1,
    service: "Черкасигаз",
    provider: "Газопостачання",
    icon: cherkasyGas,
    providerName: "gas-supply",
    serviceName: "cherkasygas",
    contact: "097-111-22-33",
  },
  {
    id: 2,
    service: "Газмережі Черкаси",
    provider: "Газопостачання",
    icon: gazmeregi,
    providerName: "gas-supply",
    serviceName: "gazmeregi",
    contact: "097-111-22-33",
  },
  {
    id: 3,
    service: "Черкасиводоканал",
    provider: "Водопостачання",
    icon: vodokanal,
    providerName: "water-supply",
    serviceName: "vodokanal",
    contact: "097-111-22-33",
  },
  {
    id: 4,
    service: "Черкасиенергозбут",
    provider: "Електропостачання",
    icon: energozbut,
    providerName: "electricity-supply",
    serviceName: "energozbut",
    contact: "097-111-22-33",
  },
  {
    id: 5,
    service: "ТЕЦ Хімволокно",
    provider: "Теплопостачання",
    icon: khimvolokno,
    providerName: "heat-supply",
    serviceName: "khimvolokno",
    contact: "097-111-22-33",
  },
  {
    id: 6,
    service: "Теплокомуненерго",
    provider: "Теплопостачання",
    icon: teplokomun,
    providerName: "heat-supply",
    serviceName: "teplokomun",
    contact: "097-111-22-33",
  },
];
