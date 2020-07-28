<template>
    <div class="wrapper">
        <span><img :src="logo" alt=""/></span>
        <h3 class="info" v-text="title"></h3>
    </div>
</template>

<script>
    import logo from './logo.svg'

    export default {
        name: 'App',
        data() {
            return {
                logo,
                title: 'Hello freelog app!',
            }
        },
        components: {}
    }
</script>

<style lang="less">
.wrapper {
    box-sizing: border-box;
    display: flex; flex-direction: column; justify-content: center; align-items: center;
    height: 90vh; 
    font-size: 24px;
    h3 { margin-top: 20px; }
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
