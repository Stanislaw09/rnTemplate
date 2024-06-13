export type Note = {
   value: string;
   user: string;
   date: string;
};

export interface Track {
   id: number;
   title: string;
   author: string;
   image: string | null;
   link: string | null;
}

export interface Music {
   tracks: Track[];
}
