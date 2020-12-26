export interface IPobieranieMangiWynikDTOChapter {
  url: string;
  dataDodania: string;
  numer: string;
  kolejnosc: number;
}

export interface IPobieranieMangiWynikDTOManga {
  tytul: string;
  okladka: string;
}

export default interface IPobieranieMangiWynikDTO {
  manga: IPobieranieMangiWynikDTOManga;
  chaptery: IPobieranieMangiWynikDTOChapter[];
}
