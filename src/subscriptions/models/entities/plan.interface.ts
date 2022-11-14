import type Benefits from "@/subscriptions/models/entities/benefits.interface";

export default interface Plan {
    tittle: string;
    description: string;
    price: number;
    benefits: Array<Benefits>
}
