import { Product } from "@/types";
const Notification = {
  WELCOME: "WELCOME",
  CHANGE_OF_STOCK: "CHANGE_OF_STOCK",
  LOWEST_PRICE: "LOWEST_PRICE",
  THRESHOLD_MET: "THRESHOLD_MET",
};

export function extractPrice(...elements: any) {
  for (const element of elements) {
    const priceText = element.text().trim();

    if (priceText) {
      return priceText;
    }
  }

  return "";
}

export function extractCurrency(element: any) {
  const currency = element.text().trim().slice(0, 1);
  return currency ? currency : "";
}

export function getHighestPrice(priceList: { price: number }[]) {
  let highestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price > highestPrice.price) {
      highestPrice = priceList[i];
    }
  }

  return highestPrice.price;
}

export function getLowestPrice(priceList: { price: number }[]) {
  let lowestPrice = priceList[0];

  for (let i = 0; i < priceList.length; i++) {
    if (priceList[i].price < lowestPrice.price) {
      lowestPrice = priceList[i];
    }
  }

  return lowestPrice.price;
}

export const getEmailNotifType = (
  scrapedProduct: Product,
  currentProduct: Product
) => {
  const lowestPrice = getLowestPrice(currentProduct.priceHistory);

  if (Number(scrapedProduct.currPrice) < lowestPrice) {
    return Notification.LOWEST_PRICE as keyof typeof Notification;
  }

  return null;
};

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
