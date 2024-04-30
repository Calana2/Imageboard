export interface threadForm{
 name: null | string;
 title: null | string;
 comment: String;
}

export interface commentForm{
 name: null | string;
 comment: string;
}

export interface threadFromDatabase{
 id: Int;
 date: DateTime;
 owner: String;
 title: null | String;
 comment: String;
 attached: null | string | StaticImport;
}

export interface commentFromDatabase{
 id: Int;
 date: DateTime;
 idThread: Int;
 owner: null | String;
 comment: String;
 attached: null | String | StaticImport;
}

export interface threadContext{
 setThread: (newThread: boolean) => void;
 board: string;
 refresh: boolean;
 setRefresh: (newRefresh: boolean) => void; 
}

export interface commentContext{
 setComment: (newComment: boolean) => void;
 board: String;
 idThread: null | String;
 refresh: boolean;
 setRefresh: (newRefresh: boolean) => void; 
}


