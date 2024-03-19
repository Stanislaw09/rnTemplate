export type Note = {
   value: string;
   user: string;
   date: string;
};

export interface Track {
   id: number;
   title: string;
   author: string;
}

export interface Music {
   tracks: Track[];
}
