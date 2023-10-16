"use server";
import { revalidatePath } from "next/cache";
import Product from "../models";
import {
  scrapeAmazonProduct,
  scrapeOlxProduct,
  scrapePromProduct,
} from "../scraper";
import { connectToDB } from "../mongoose";
import { generateEmailBody, sendEmail } from "../nodemailer";

export async function scrapeProduct(
  productUrl: string | undefined,
  selectedShop: string
) {
  if (!productUrl || !selectedShop) {
    return;
  }

  try {
    let scrapedProduct = null;
    connectToDB();

    if (selectedShop === "prom") {
      scrapedProduct = await scrapePromProduct(productUrl);
    } else if (selectedShop === "olx") {
      scrapedProduct = await scrapeOlxProduct(productUrl);
    } else {
      scrapedProduct = await scrapeAmazonProduct(productUrl);
    }
    if (!scrapedProduct) return;

    await Product.findOneAndUpdate(
      { url: scrapedProduct.url },
      scrapedProduct,
      { upsert: true, new: true }
    );

    revalidatePath(`/product/${productUrl}`);
  } catch (err: any) {
    throw new Error(`Failed to create/update product ${err.message}`);
  }
}

export async function getProductById(productId: string) {
  try {
    connectToDB();

    const product = Product.findOne({ _id: productId });

    return product;
  } catch (err: any) {
    throw new Error(`Failed to find product ${err.message}`);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();

    const product = Product.find();

    return product;
  } catch (err: any) {
    throw new Error(`Failed to find products ${err.message}`);
  }
}

export async function addUserEmailToProduct(
  productId: string,
  userEmail: string
) {
  try {
    const product = await Product.findById(productId);

    if (!product) return;

    const userExists = product.users.some(
      (user: { email: string }) => user.email === userEmail
    );

    if (!userExists) {
      product.users.push({ email: userEmail });

      await product.save();

      const emailContent = await generateEmailBody(product, "WELCOME");

      await sendEmail(emailContent, [userEmail]);
    }
  } catch (error) {
    console.log(error);
  }
}
