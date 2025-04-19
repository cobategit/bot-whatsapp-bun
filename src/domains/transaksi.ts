export class Transaksi {
    constructor(
        public readonly id: number | undefined,
        public readonly userPhone: string,
        public readonly productId: number,
        public readonly productName: string,
        public readonly price: number,
        public readonly quantity: number,
        public readonly totalPrice: number,
        public readonly status: string,
        public readonly createdAt: Date = new Date(),
        public readonly updatedAt: Date = new Date()
    ) { }
}
