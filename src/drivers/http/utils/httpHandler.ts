export const httpHandler =  function createControllerCallback(controller) {
  return async (req, res) => {
    const httpRequest = {
      body: req.body,
      query: req.query,
      params: req.params,
      method: req.method,
      path: req.path,
      pagination : req.pagination,
      headers: {
        "Content-Type": req.get("Content-Type"),
        Referer: req.get("referer"),
        "User-Agent": req.get("User-Agent"),
        Lang: req.get("Lang") || "en",
        authorization: req.get("authorization"),
      },
    };
    controller(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }
        res.type("json");
        res.status(200).send(httpResponse);
      })
      .catch((e) => {
        res.status(500).send({
          error: "An unknown error occurred.",
        });
      });
  };
}
