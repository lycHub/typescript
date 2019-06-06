{
  /*
  * 类型别名type定义函数接口，相当于：
   interface Add {
      (x: number, y: number): number
   }
  * */
  type Add = (x: number, y: number) => number;
  const addFunc: Add = (arg1: number, arg2: number) => arg2 + arg1;
  addFunc(1, 2);
}


{
	
	let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function() {
        // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
			return () => {
				let pickedCard = Math.floor(Math.random() * 52);
				let pickedSuit = Math.floor(pickedCard / 13);
				
				// 现在这里的this是any
				return {suit: this.suits[pickedSuit], card: pickedCard % 13};
			}
		}
	}

	let cardPicker = deck.createCardPicker();
	let pickedCard = cardPicker();

	alert("card: " + pickedCard.card + " of " + pickedCard.suit);
}


{
	
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
		createCardPicker(this: Deck) {	// 加参数，约束this类型
			return () => {
				// [0, 1) => [0, 52)  也就是最多取到索引51
				const pickedCard = Math.floor(Math.random() * 52);

				// [0, 4)
				const pickedSuit = Math.floor(pickedCard / 13);

				return {
					// 现在这里的this是deck
					suit: this.suits[pickedSuit],
					card: pickedCard % 13   // 52张牌 13个点数
				};
			};
		}
	}

	const cardPicker = deck.createCardPicker();
	const pickedCard = cardPicker();

	console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
}


{
  /* 
    定义了两个函数重载来约束函数实体
  */
  function merge(arg1: number, arg2: number): number;
  function merge(arg1: string, arg2: string): string;

  // 即使参数都是any，ts还是会按照上面两个重载的原则去检测
  function merge(arg1: any, arg2: any) {
    return arg1 + arg2;
  }

  merge(11, 11);
  //  merge(11, 11).length;  error, 数字没有length
  merge('11', '11');
  // merge('11', 11);  error
}