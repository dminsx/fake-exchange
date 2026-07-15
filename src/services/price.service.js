export function getActualPrice(shares) {
  const newStocksPrice = {};

  shares.forEach((item) => {
    const randomPercent = (Math.random() * 2 - 1) * 3;

    newStocksPrice[item.stockTicker] =
      item.currentPrice * (1 + randomPercent / 100);
  });
  return newStocksPrice;
}
