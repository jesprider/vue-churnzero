module.exports = {
    roots: ['<rootDir>/src/'],
    collectCoverage: true,
    coverageReporters: ['html'],
    transform: {
        '^.+\\.js$': 'babel-jest',
    },
};
