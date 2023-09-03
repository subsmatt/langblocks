export interface IRecord {
    id: string,
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