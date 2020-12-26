import { IPobieranieMangiWynikDTOChapter, IPobieranieMangiWynikDTOManga } from "./IPobieranieMangiWynikDTO";

export interface IZapisanieMangiKryteriaDTOManga extends IPobieranieMangiWynikDTOManga {
  url: string;
  aktualnyChapter: string;
}

export default interface IZapisanieMangiKryteriaDTO {
  manga: IZapisanieMangiKryteriaDTOManga;
  chaptery: IPobieranieMangiWynikDTOChapter[];
}
