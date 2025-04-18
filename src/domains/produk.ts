export class Produk {
    constructor(
        public readonly id: number,
        public readonly name: string,
        public stock: number,
        public readonly price: number
    ) { }

    isAvailable(): boolean {
        return this.stock > 0
    }

    decreaseStock(qty: number = 1): void {
        if (this.stock < qty) throw new Error('Stok tidak cukup')
        this.stock -= qty
    }
}
