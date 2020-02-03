<template>
    <div id="app">
        <Transition mode="out-in" name="slide-up">
            <!-- <keep-alive> -->
            <router-view></router-view>>
            <!-- </keep-alive> -->
        </Transition>
    </div>
</template>

<script>
export default {
    name: 'App',
    methods: {
        //
    }
}
</script>

<style lang="scss">
    //
</style>
