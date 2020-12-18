import { IChapter } from "../../models/apps/sprawdzanie-mangi/ChapterModel";

interface IOdswiezenieMangiWynikDTO {
  chaptery: IChapter[];
  ostatnieOdswiezenie: Date;
}

export default IOdswiezenieMangiWynikDTO;
