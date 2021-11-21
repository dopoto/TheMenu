import { OrderItem } from "src/app/core/models/order-item";

export interface Order {
    date: Date;
    locationId: string;
    tableId: string;
    serverId: string;
    items: OrderItem[];
}