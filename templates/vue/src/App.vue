<template>
    <div class="wrapper">
        <span>
            <img :src="logo" alt=""/></span>
        <h3 class="info" v-text="componentTitle"></h3>
        <div v-for="sample in sampleList" v-text="sample"></div>
    </div>
</template>

<script>
    import logo from './logo.svg';

    export default {
        name: 'App',
        data() {
            return {
                logo,
                componentTitle: 'Hello Freelog !',
                sampleList: [
                    'Create with React',
                    'Build as Web Component',
                    'Use it anywhere!',
                ]
            }
        },
        components: {
        }
    }
</script>

<style lang="less">
    .wrapper {
        font-size: 24px;
        text-align: center;
        display: flex;
        flex-direction: column;
        line-height: 2;
        padding: 30px;
    }

    @keyframes App-logo-spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    img {
        width: 200px;
        animation: App-logo-spin infinite 20s linear;
    }

</style>
