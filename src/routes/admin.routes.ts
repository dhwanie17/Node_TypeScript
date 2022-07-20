export function initRoutes(app, router) {
  router.get('/', (req, res) => res.status(200).send({ message: res.__('admin').AdminServer }));
  return router;
}
