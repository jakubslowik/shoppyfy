/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/ssr-apis/
 */

import wrapWithProvider from "./wrap-with-provider";

export const wrapRootElement = wrapWithProvider;