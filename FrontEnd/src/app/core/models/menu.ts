import { MenuCategory } from "./menu-category";

export interface Menu {
    id: string; // TODO Guid?
    name: string;
    categories: MenuCategory[];
    currency: string; // TODO use enum
}