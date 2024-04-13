import { v4 as uuidv4 } from 'uuid';

export class Item {
    private id: string;
    private name: string;
    private price: number;
    private description: string;

    constructor(name: string, price: number, description: string) {
        this.id = uuidv4();
        this.name = name;
        this.price = price;
        this.description = description;
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }
    setName(value: string) {
        this.name = value;
    }

    getPrice(): number {
        return this.price;
    }
    setPrice(value: number) {
        this.price = value;
    }

    getDescription(): string {
        return this.description;
    }
    setDescription(value: string) {
        this.description = value;
    }
}
