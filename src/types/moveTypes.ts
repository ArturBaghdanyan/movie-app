export interface Item {
  Id: string;
  Title: string;
  TitleImage?: string;
  CoverImage?: string;
  ReleaseYear: string;
  MpaRating: string;
  Category: string;
  Duration: string;
  VideoUrl?: string;
  Description: string;
  Date: string;
}

export interface Data {
  Featured: Item;
  TendingNow: Item[];
}
