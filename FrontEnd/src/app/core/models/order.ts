import { OrderItem } from "src/app/core/models/order-item";
import { OrderStatusTypes } from "./order-status-types";

export interface Order {
    date: Date;
    locationId: string;
    tableId: string;
    serverId: string;
    items: OrderItem[];
    status: OrderStatusTypes;
}