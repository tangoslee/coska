export interface Menu {
    pgid?: string;
    title: string;
    type?: string;
    subMenu?: Menu[];
    url?: string;
    format?: string;

    layout?: string;
    doctype?: string;
    display?: string;
}
