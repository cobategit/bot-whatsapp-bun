import { Transaksi } from "@/domains/transaksi"
import { TransaksiRepo } from "@/repositories/transaksi"

export class TransaksiService {
    constructor(private readonly transaksiRepo: TransaksiRepo) {}

    async record(tx: Omit<Transaksi, 'id' | 'createdAt'>) {
        return await this.transaksiRepo.save(tx)
      }
}