interface IPobieranieChapterowChapterDTO {
  url: string;
  numer: string;
  kolejnosc: number;
}

interface IPobieranieChapterowWynikDTO {
  nazwaMangi: string;
  chaptery: IPobieranieChapterowChapterDTO[];
}

export { IPobieranieChapterowWynikDTO as default, IPobieranieChapterowChapterDTO };
