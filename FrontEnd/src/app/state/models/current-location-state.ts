import { Server } from "src/app/core/models/server";
import { Menu } from "src/app/core/models/menu";
import { Order } from "src/app/core/models/order";
import { Table } from "src/app/core/models/table";

export interface CurrentLocationState {
    id: string;
    name: string;
    menus: Menu[];
    tables: Table[];
    servers: Server[];
    orders: Order[];
}