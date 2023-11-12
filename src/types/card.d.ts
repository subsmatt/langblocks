export interface IEntry {
    id: string
}

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

export interface IRecordAttribute {
    id: string,
    cardId: string,
    important: number,
    pinned: number,
    updateDate: string
}

export interface IRecordChangeLog {
    id: string,
    cardId: string,
    operation: string,
    changeDate: string
}

export interface ICard {
    rec: IRecord
}

declare enum dbEntity {
    Cards = "cards",
    cardAttributes = "cardattributes",
    changeLogs = "changelogs"
}