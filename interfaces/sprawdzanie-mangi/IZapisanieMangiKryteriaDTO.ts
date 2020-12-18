import { IPobieranieChapterowChapterDTO } from "./IPobieranieChapterowWynikDTO";

interface IZapisanieMangiKryteriaDTO {
  mangaNazwa: string;
  mangaUrl: string;
  mangaAktualnyChapter: string;
  chaptery: IPobieranieChapterowChapterDTO[];
}

export default IZapisanieMangiKryteriaDTO;
