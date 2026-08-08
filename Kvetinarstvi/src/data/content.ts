import {
  Flower2,
  HeartHandshake,
  Sprout,
  Truck,
  type LucideIcon,
} from 'lucide-react';

export type Category = {
  id: string;
  title: string;
  description: string;
  items: string[];
  icon: LucideIcon;
};

export const categories: Category[] = [
  {
    id: 'rezane-kytice',
    title: 'Řezané květiny a kytice',
    description:
      'Čerstvé řezané květiny každý den – od klasických růží po sezónní kompozice. Kytice svážeme na počkání podle přání nebo příležitosti.',
    items: ['Kytice na míru', 'Sezónní květiny', 'Výročí a narozeniny'],
    icon: Flower2,
  },
  {
    id: 'svatby-akce',
    title: 'Svatby a sváteční výzdoba',
    description:
      'Svatební kytice, výzdoba obřadu a hostiny, smuteční vazby i firemní a sváteční aranžmá. Od konzultace až po instalaci na místě.',
    items: ['Svatební kytice a výzdoba', 'Smuteční vazby', 'Firemní a sváteční akce'],
    icon: HeartHandshake,
  },
  {
    id: 'pokojove-rostliny',
    title: 'Pokojové rostliny',
    description:
      'Pokojové rostliny do bytu i kanceláře, květináče a substráty. Poradíme s výběrem podle světla i péče, kterou jim chcete věnovat.',
    items: ['Pokojové rostliny', 'Květináče a substráty', 'Poradenství o péči'],
    icon: Sprout,
  },
  {
    id: 'rozvoz',
    title: 'Rozvoz a donáška',
    description:
      'Objednanou kytici doručíme až ke dveřím adresáta, nebo si ji vyzvednete osobně v naší prodejně. Doručujeme i jako dárek s přáním.',
    items: ['Rozvoz na adresu', 'Osobní odběr v prodejně', 'Dárkové balení a přání'],
    icon: Truck,
  },
];

export type FlowerType = { name: string; note: string };

export const flowerTypes: FlowerType[] = [
  { name: 'Růže', note: 'Klasika na každou příležitost' },
  { name: 'Pivoňky', note: 'Sezónní, bohaté aranžmá' },
  { name: 'Eukalyptus', note: 'Zeleň do kytic a věnců' },
  { name: 'Slunečnice', note: 'Letní, jasné barvy' },
  { name: 'Gerbery', note: 'Veselé a barevné' },
  { name: 'Tulipány', note: 'Jarní klasika' },
  { name: 'Levandule', note: 'Sušené i čerstvé svazky' },
];

export type Step = {
  number: string;
  title: string;
  description: string;
};

export const steps: Step[] = [
  {
    number: '01',
    title: 'Vyberte si kytici nebo nám napište přání',
    description:
      'Vyberte si z nabídky nebo popište příležitost, barvy a rozpočet ve formuláři. Rádi poradíme s výběrem i skladbou květin.',
  },
  {
    number: '02',
    title: 'Ručně zavážeme čerstvé květiny',
    description:
      'Kytici nebo výzdobu ručně sestavíme z čerstvých květin obvykle do 24 hodin od objednávky, podle domluveného termínu.',
  },
  {
    number: '03',
    title: 'Doručíme, nebo si ji vyzvednete',
    description:
      'Kytici doručíme na zvolenou adresu, nebo si ji vyzvednete osobně v prodejně – podle toho, co je pro vás pohodlnější.',
  },
];

export type SortimentOption = {
  value: string;
  label: string;
};

export const sortimentOptions: SortimentOption[] = [
  { value: 'rezane-kytice', label: 'Řezané květiny a kytice' },
  { value: 'svatby-akce', label: 'Svatební a sváteční výzdoba' },
  { value: 'pokojove-rostliny', label: 'Pokojové rostliny' },
  { value: 'rozvoz', label: 'Rozvoz / donáška' },
  { value: 'jine', label: 'Jiné / kombinace / nevím jistě' },
];
