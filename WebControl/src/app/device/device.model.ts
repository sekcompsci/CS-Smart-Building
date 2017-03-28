export class Device {
    id: number;
    catagoryName: string;
    catagoryDescription: string;

    constructor() {
        this.id = Date.now();
    }
}