module.exports = {
    root: true,
    env: {
        node: true,
    },
    globals: {
        // Ref sugar (take 2)
        $: 'readonly',
        $$: 'readonly',
        $ref: 'readonly',
        $shallowRef: 'readonly',
        $computed: 'readonly',

        // index.d.ts
        // global.d.ts
        Fn: 'readonly',
        PromiseFn: 'readonly',
        RefType: 'readonly',
        LabelValueOptions: 'readonly',
        EmitType: 'readonly',
        TargetContext: 'readonly',
        ComponentElRef: 'readonly',
        ComponentRef: 'readonly',
        ElRef: 'readonly',
        global: 'readonly',
        ForDataType: 'readonly',
        ComponentRoutes: 'readonly',

        // script setup
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
    },
    extends: [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/typescript/recommended',
        '@vue/prettier',
        '@vue/eslint-config-typescript',
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        jsxPragma: 'React',
        ecmaFeatures: {
            jsx: true,
        },
    },
    overrides: [
        {
            files: ['*.ts', '*.vue'],
            rules: {
                'no-undef': 'off',
            },
        },
        {
            files: ['*.vue'],
            parser: 'vue-eslint-parser',
            parserOptions: {
                parser: '@typescript-eslint/parser',
                extraFileExtensions: ['.vue'],
                ecmaVersion: 'latest',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            rules: {
                'no-undef': 'off',
            },
        },
    ],
    rules: {
        'vue/no-v-html': 'off',
        'vue/require-default-prop': 'off',
        'vue/require-explicit-emits': 'off',
        'vue/multi-word-component-names': 'off',
        '@typescript-eslint/no-explicit-any': 'off', // any
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0, // allow debugger during development
        'arrow-parens': 0, // 箭头函数用小括号括起来
        'no-tabs': 'off',
        quotes: ['error', 'single'],
        'no-console': 'off', //禁止使用console
        'generator-star-spacing': 'off', // allow async-await
        camelcase: [
            'error',
            {
                properties: 'never',
            },
        ], //强制驼峰法命名
        eqeqeq: 'error', //  #使用带引号替代双引号
        'no-extend-native': 2, //禁止扩展native对象
        'no-multi-spaces': 1, //不能用多余的空格
        'no-multiple-empty-lines': [
            1,
            {
                max: 2,
            },
        ], //空行最多不能超过2行
        'no-native-reassign': 2, //不能重写native对象
        'no-trailing-spaces': 1, //一行结束后面不要有空格
        'no-undef': 1, //不能有未定义的变量
        'no-eval': 1, //禁止使用eval
        'no-dupe-keys': 2, //在创建对象字面量时不允许键重复 {a:1,a:1}
        'no-dupe-args': 2, //函数参数不能重复
        'prefer-template': 'error', //以编程方式构建字符串时，使用模板字符串而不是连接符 例:How are you, ${name}?
        'prefer-arrow-callback': 'error', //当你必须要使用匿名函数（如在传递内联回调时），请使用箭头函数
        'no-dupe-class-members': 'error', //避免重复的类成员
        'no-var': 'error', //不得申明var用let
        '@typescript-eslint/explicit-module-boundary-types': 'off', // setup()
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'always',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        'no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            },
        ],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
    },
}
