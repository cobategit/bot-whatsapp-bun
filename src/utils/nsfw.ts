export class NSFWFilter {
    private readonly nsfwWords: string[]

    constructor() {
        this.nsfwWords = ['babi', 'anjing', 'tolol', 'kontol', 'memek', 'bangsat', 'ngentot', 'asu', "pantek", "bajingan"] // Ganti dengan kata-kata yang ingin difilter
    }

    containsNSFW(text: string): boolean {
        return this.nsfwWords.some(word => text.toLowerCase().includes(word))
    }
}
