const OPERATES = {
  LAST: 'last',
  NEXT: 'next',
  SAVETOLIST: 'saveToList',
  SAVETODETAIL: 'saveToDetail',
  CANCEL: 'cancel',
  FREE: 'free'
}

/* 
  仔细观察OPERATES里的值是什么不重要，只要互不相等就行
  所以推荐使用symbol
*/

const OPERATES = {
  LAST: Symbol(),
  NEXT: Symbol(),
  SAVETOLIST: Symbol(),
  SAVETODETAIL: Symbol(),
  CANCEL: Symbol(),
  FREE: Symbol()
}