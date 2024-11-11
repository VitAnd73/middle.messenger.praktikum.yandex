import autoprefixer from 'autoprefixer';
import postcssExtend from 'postcss-extend';
import postcssPresetEnv from 'postcss-preset-env';

export default {
    plugins: [
        postcssPresetEnv(),
        autoprefixer(),
        postcssExtend(),
    ],
};
