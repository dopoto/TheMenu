import { MenuSection } from "./menu-section";

export interface Menu {
    id: string; // TODO Guid?
    name: string;
    sections: MenuSection[];
    currency: string; // TODO use enum
}