const API_ENDPOINT = `https://5fb52d15e473ab0016a179bd.mockapi.io`;
const colorPrimary = "#7e10b9";
const colorSecondary = "#b91081";

const FETCH_STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  SUCCESS: "success",
  ERROR: "error"
};

const CART_STATE = {
  OPEN: "open",
  PAYMENT_IN_PROGRESS: "payment_in_progress",
  CLOSED: "closed"
};

export {
  API_ENDPOINT,
  colorPrimary,
  colorSecondary,
  FETCH_STATUS,
  CART_STATE
};