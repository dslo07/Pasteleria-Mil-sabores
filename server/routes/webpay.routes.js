import { Router } from "express";
import pkg from "transbank-sdk";
import dotenv from 'dotenv'
dotenv.config()

const {
  Environment,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Options,
  WebpayPlus
} = pkg;

const router = Router();

const webpayOptions = new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
);

// Variables
let PagoExitosoURL = process.env.VITE_URL_PAGO_EXITOSO;
let PagoFallidoURL = process.env.VITE_URL_PAGO_FALLIDO;
let returnUrl = process.env.VITE_URL_WEBPAY_CONFIRM

router.post("/create", async (req, res) => {
  const { amount, buyOrder, sessionId } = req.body;

  if (!amount || !buyOrder || !sessionId) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }

  try {
    const tx = new WebpayPlus.Transaction(webpayOptions);

    const response = await tx.create(
      buyOrder,
      sessionId,
      amount,
      returnUrl
    );

    return res.json(response);

  } catch (error) {
    console.error("Error creando transacción:", error);
    return res.status(500).json({ error: "Error creando transacción" });
  }
});

router.get("/confirm", async (req, res) => {

  const { token_ws } = req.query;

  if (!token_ws) {
    return res.status(400).send("Token faltante");
  }

  try {
    const tx = new WebpayPlus.Transaction(webpayOptions);
    const result = await tx.commit(token_ws);

    console.log("Resultado Webpay:", result);

    // Validación correcta para Webpay Plus
    const autorizado =
      result.status === "AUTHORIZED" &&
      result.response_code === 0 &&
      result.vci === "TSY";

    if (autorizado) {
      return res.redirect(PagoExitosoURL);
    }

    return res.redirect(PagoFallidoURL);

  } catch (err) {
    console.error("Error confirmando pago:", err);
    return res.redirect(PagoFallidoURL);
  }
});


export default router;
