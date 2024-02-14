const OFFICIAL_PROJECT_ID = "675cb1f0-fa3c-11e8-ac99-6374d9643cb2";

export default ({ config } = {}) => ({
  ...config,
  "extra": {
    "eas": {
      "projectId": process.env.EAS_PROJECT_ID ?? OFFICIAL_PROJECT_ID
    }
  }
});