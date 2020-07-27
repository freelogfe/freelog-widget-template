declare module "*.less";
declare module "*.gif";
declare module "*.jpg";
declare module "*.svg";
declare module "*.png";

declare let process: {
  env: {
    NODE_ENV: string;
  };
}