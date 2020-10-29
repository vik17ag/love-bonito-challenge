module.exports = {
  preset: "@vue/cli-plugin-unit-jest/presets/no-babel",
    collectCoverage: true,
    collectCoverageFrom: [
        "src/**/*.{js,vue}",
        "!**/node_modules/**"
    ],
    coverageReporters: [
        "html",
        "text-summary"
    ],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
    },
    moduleFileExtensions: [
        "js",
        "json",
        // tell Jest to handle `*.vue` files
        "vue"
    ],
    transform: {
        // process `*.vue` files with `vue-jest`
        ".*\\.(vue)$": "vue-jest"
    }
};
