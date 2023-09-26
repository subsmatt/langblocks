export interface IRecord {
    id: string,
    cid: string | undefined,
    lang: string,
    word: string,
    desc_lang: string,
    desc: string,
    type: string,
    hits: number,
    examples: string[] | undefined | never,
    iknowthis: boolean
}

export interface ICard {
    rec: IRecord
}
