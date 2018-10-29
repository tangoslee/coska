export interface Menu {
    pgid?: string;
    title: string;
    type?: string;
    subMenu?: Menu[];
    url?: string;
}
