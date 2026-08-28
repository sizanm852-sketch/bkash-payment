import type { Request, Response } from "express";
import axios from "axios"
import { getValue, setValue } from "node-global-storage"
import { v4 as uuidv4 } from "uuid";

export const createPayment = async (req: Request, res: Response) => {
  const { amount } = req.body

  // Always generate a unique invoice ID from UUID
  const merchantInvoiceNumber = `INV-${uuidv4().replace(/-/g, "").substring(0, 12).toUpperCase()}`

  try {
    const data: any = await axios.post(process.env.bkash_create_payment_url!, {
      mode: "0011",
      payerReference: "1",
      callbackURL: "http://localhost:5001/bkash/payment/callback",
      amount: amount,
      currency: "BDT",
      intent: "sale",
      merchantInvoiceNumber,
    }, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: getValue("id_token"),
        "x-app-key": process.env.bkash_api_key,
      }
    })


    const paymentID: string = data?.data?.paymentID
    const bkashURL: string = data?.data?.bkashURL

    if (!bkashURL) {
      return res.status(500).json({ error: "No bKash URL returned" })
    }

    // Save invoice keyed by paymentID so we can retrieve in callback
    if (paymentID) {
      setValue(`invoice_${paymentID}`, merchantInvoiceNumber)
      setValue(`amount_${paymentID}`, amount?.toString())
    }

    return res.status(200).json({ url: bkashURL })

  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export const callbackPayment = async (req: Request, res: Response) => {
  const { paymentID, status } = req.query as { paymentID: string; status: string }

  if (status === "cancel" || status === "failure") {
    return res.redirect(`http://localhost:5173/error?status=${status}`)
  }

  if (status === "success") {
    try {
      const { data }: any = await axios.post(
        process.env.bkash_execute_payment_url!,
        { paymentID },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            authorization: getValue("id_token"),
            "x-app-key": process.env.bkash_api_key,
          },
        }
      )


      // bKash sandbox wraps fields under data.data
      // We also fall back to root-level fields just in case
      const statusCode = data?.statusCode ?? data?.data?.statusCode

      if (statusCode === "0000") {
        const trxID    = data?.trxID    ?? data?.data?.trxID    ?? "N/A"
        const amount   = data?.amount   ?? data?.data?.amount
                         ?? getValue(`amount_${paymentID}`)    ?? "N/A"
        // bKash sandbox often omits merchantInvoiceNumber in execute response
        // so we fall back to what we stored during createPayment
        const invoiceID = data?.merchantInvoiceNumber
                          ?? data?.data?.merchantInvoiceNumber
                          ?? getValue(`invoice_${paymentID}`)
                          ?? "N/A"


        return res.redirect(
          `http://localhost:5173/success?trxID=${trxID}&amount=${amount}&invoiceID=${encodeURIComponent(invoiceID)}`
        )
      } else {
        return res.redirect(
          `http://localhost:5173/error?status=failed&message=${encodeURIComponent(data?.statusMessage ?? "Unknown error")}`
        )
      }
    } catch (error: any) {
      return res.redirect(`http://localhost:5173/error?status=failed`)
    }
  }

  return res.redirect(`http://localhost:5173/error?status=unknown`)
}
