export enum MenuTypes {
    header,
    html,
    divider,
    extlink
}


export interface Menu {
    pgid?: string;
    title: string;
    type?: MenuTypes;
    subMenu?: Menu[];
    url?: string;
}
