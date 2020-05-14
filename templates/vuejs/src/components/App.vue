<template>
    <div class="wrapper">
        <span>
            <img :src="logo" alt=""/></span>
        <h3 class="info">{{componentTitle}}</h3>
        <div v-for="sample in sampleList">{{sample}}</div>
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

