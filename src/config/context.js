import { AsyncLocalStorage } from "async_hooks";

const asyncLocalStorage = new AsyncLocalStorage();

export function setUserContext(req, res, next) {
  const user = req.user || undefined;
  const ip = req.ip;
  const userAgent = req.headers["user-agent"];

  asyncLocalStorage.run({ user, ip, userAgent }, () => next());
}

export function getCurrentUser() {
  return asyncLocalStorage.getStore();
}
