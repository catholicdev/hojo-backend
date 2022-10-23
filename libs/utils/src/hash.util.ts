import * as jwt from "jsonwebtoken";
import * as hash from "object-hash";

/**
 * This utility generates a hash for the given payload object. The caller must
 * ensure that the given payload is of Object type
 */
export const hashPayload = (payload) => {
  return hash(payload, {
    excludeKeys: (key) => {
      return key === "notes";
    },
  });
};

/**
 * This utility signs a given payload hash using the JWT secret defined in the config.
 * By default each token generated has an expiry of 15 minutes. This is done to ensure
 * old tokens are not sent for booking delivery.
 */
export const signHash = (payloadHash: any) => {
  const payload = { hash: payloadHash };
  const jwtToken = jwt.sign(payload, process.env.SECRET, { expiresIn: 60 * 60 * 12 });
  return jwtToken;
};

/**
 * Helper to validate the given JWT token. This method returns a promise that
 * evaluates the given JWT token and decodes the hash if verification was successful.
 */
export const verifyToken = (jwtToken: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(jwtToken, process.env.SECRET, (e, decodedPayload) => {
      if (e) reject(e);
      else resolve(decodedPayload);
    });
  });
};
