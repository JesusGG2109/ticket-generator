const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const isProd = process.env.NODE_ENV === "production";

  if (
    err?.type === "entity.parse.failed" ||
    (err instanceof SyntaxError && err.status === 400 && "body" in err)
  ) {
    return res.status(400).json({
      message: "JSON invalido en el body de la peticion",
    });
  }

  if (err?.type === "entity.too.large") {
    return res.status(413).json({
      message: "Payload demasiado grande",
    });
  }

  console.error("[error.middleware]", err);

  const status = err.status || err.statusCode || 500;
  const safeMessage =
    status === 500
      ? "Error interno del servidor"
      : err.message || "Error en la peticion";

  const body = { message: safeMessage };

  if (!isProd && status === 500) {
    body.detail = err.message;
  }

  return res.status(status).json(body);
};

module.exports = errorMiddleware;
