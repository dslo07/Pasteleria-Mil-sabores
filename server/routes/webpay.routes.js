import { Router } from "express";
import pkg from "transbank-sdk";

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

router.post("/create", async (req, res) => {
  const { amount, buyOrder, sessionId } = req.body;

  if (!amount || !buyOrder || !sessionId) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }

  try {
    const tx = new WebpayPlus.Transaction(webpayOptions);

    const returnUrl = "http://localhost:5174/api/webpay/confirm";

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
      return res.redirect("http://localhost:5173/pago-exitoso");
    }

    return res.redirect("http://localhost:5173/pago-fallido");

  } catch (err) {
    console.error("Error confirmando pago:", err);
    return res.redirect("http://localhost:5173/pago-fallido");
  }
});


export default router;
