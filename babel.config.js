/**
 * targets for babel preset env
 * default browserslist(> 0.5%, last 2 versions, Firefox ESR, not dead)
 * exclude ie 11
 * supports maintained node versions by node foundation
 * more info at https://github.com/browserslist/browserslist#query-composition
 */
const targets = "defaults, not ie 11, maintained node versions"

export default {
  presets: [
    [
      "@babel/preset-env",
      {
        targets,
        // Converts modern syntax that is broken in some browsers to the closest equivalent syntax that is not broken in those browsers
        // more info - https://web.dev/serve-modern-code-to-modern-browsers/#enable-modern-bugfixes
        bugfixes: true,
      },
    ],
  ],
}
