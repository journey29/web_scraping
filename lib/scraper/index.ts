"use server";
import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractPrice } from "../utils";

export async function scrapeAmazonProduct(url: string) {
  if (!url) {
    return;
  }
  const userName = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const host = "brd.superproxy.io";
  const sessionId = (100000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${userName}-session-${sessionId}`,
      password,
    },
    host,
    port,
    rejectUnauthorized: false,
  };

  try {
    const res = await axios.get(url, options);
    const $ = cheerio.load(res.data);

    const title = $("#productTitle").text().trim();
    const currPrice = extractPrice(
      $(".a-price span.a-offscreen"),
      $("span.aok-align-center span.a-offscreen"),
      $("#price_inside_buybox"),
      $(".priceToPay span.a-price-whole"),
      $(".a.size.base.a-color-price"),
      $(".a-button-selected .a-color-base")
    );

    const originalPrice = extractPrice(
      $(".puis-light-weight-text span.a-offscreen"),
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen"),
      $("#listPrice"),
      $("#priceblock_dealprice"),
      $(".a-size-base.a-color-price")
    );

    const images =
      $("#imgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";

    const imagesUrl = Object.keys(JSON.parse(images));
    const currency = extractCurrency($(".a-price-symbol"));
    const description = $(".a-spacing-mini .a-list-item").text().trim();

    const data = {
      url,
      title,
      imageUrl: imagesUrl[0],
      originalPrice,
      currPrice,
      currency,
      description,
      priceHistory: [],
      lowestPrice: Number(currPrice) || Number(originalPrice) || 0,
      highestPrice: Number(originalPrice) || Number(currPrice) || 0,
      users: [],
    };

    return data;
  } catch (err: any) {
    throw new Error(`Failed to scrape product: ${err.message}`);
  }
}

export async function scrapePromProduct(url: string) {
  if (!url) {
    return;
  }
  const userName = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const host = "brd.superproxy.io";
  const sessionId = (100000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${userName}-session-${sessionId}`,
      password,
    },
    host,
    port,
    rejectUnauthorized: false,
  };

  try {
    const res = await axios.get(url, options);
    const $ = cheerio.load(res.data);

    const title = $("h1._3Trjq").text().trim();
    const currPrice = $(".tqUsL .bkjEo").attr("data-qaprice");
    const currency = $(".tqUsL .bkjEo").attr("data-qacurrency");
    const originalPrice = $(".tqUsL .XXdUM .yzKb6").text().trim();
    const images = $("img.MPQaS").attr("src");
    const description = $(".z1xg5 p").text().trim();

    console.log(description);

    const data = {
      url,
      title,
      imageUrl: images,
      currency,
      originalPrice,
      currPrice,
      description,
      priceHistory: [],
      lowestPrice: Number(currPrice) || Number(originalPrice),
      highestPrice: Number(originalPrice) || Number(currPrice),
      users: [],
    };

    return data;
  } catch (err: any) {
    throw new Error(`Failed to scrape product: ${err.message}`);
  }
}

export async function scrapeOlxProduct(url: string) {
  if (!url) {
    return;
  }
  const userName = String(process.env.BRIGHT_DATA_USERNAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 22225;
  const host = "brd.superproxy.io";
  const sessionId = (100000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${userName}-session-${sessionId}`,
      password,
    },
    host,
    port,
    rejectUnauthorized: false,
  };

  try {
    const res = await axios.get(url, options);
    const $ = cheerio.load(res.data);

    const title = $("h1.css-1dhh6hr").text().trim();
    const currPrice = $("h3.css-1twl9tf").text().trim();
    const images = $("img.css-1bmvjcs").attr("src");
    const description = $(".css-1t507yq").text().trim();

    const data = {
      url,
      title,
      imageUrl: images,
      currPrice,
      description,
      priceHistory: [],
      lowestPrice: Number(currPrice) || 0,
      highestPrice: Number(currPrice) || 0,
      users: [],
    };

    return data;
  } catch (err: any) {
    throw new Error(`Failed to scrape product: ${err.message}`);
  }
}
