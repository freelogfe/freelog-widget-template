<template>
    <div class="wrapper">
        <span>
            <img :src="logo" alt=""/></span>
        <h3 class="info" v-text="componentTitle"></h3>
        <div v-for="sample in sampleList" v-text="sample"></div>
    </div>
</template>

<script>
    import logo from '../assets/logo.svg';

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

