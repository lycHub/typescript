interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}

const deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],   // 花色
    cards: Array(52),   // 52张牌
    createCardPicker(this: Deck) {
        return () => {
            // [0, 1) => [0, 52)  也就是最多取到索引51
            const pickedCard = Math.floor(Math.random() * 52);

            // [0, 4)
            const pickedSuit = Math.floor(pickedCard / 13);

            return {
                // 现在这里的this是any
                suit: this.suits[pickedSuit],
                card: pickedCard % 13   // 52张牌 13个点数
            };
        };
    }
}

const cardPicker = deck.createCardPicker();
const pickedCard = cardPicker();

console.log("card: " + pickedCard.card + " of " + pickedCard.suit);