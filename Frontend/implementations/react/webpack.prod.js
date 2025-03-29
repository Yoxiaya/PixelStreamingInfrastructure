// Copyright Epic Games, Inc. All Rights Reserved.

const { merge } = require('webpack-merge');
const common = require('@epicgames-ps/react-pixelstreamingfrontend-react-ue5.5/webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    optimization: {
        usedExports: true,
        minimize: true
    },
    stats: 'errors-only',
    performance: {
        hints: false
    }
});
