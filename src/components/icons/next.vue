<script setup lang="ts">
import { iconsProps } from '../../types';

const props = withDefaults(defineProps<iconsProps>(), {
    width: 24,
    height: 24,
    color: '#eee'
})

</script>
<template>
    <svg :fill="color" :height="height" :width="width" version="1.1" viewBox="0 0 511.947 511.947">
        <g>
            <g>
                <path
                    d="M407.553,248.453L161.9,3.12c-4.16-4.16-10.88-4.16-15.04,0l-42.453,42.347c-4.16,4.16-4.16,10.88,0,15.04l195.733,195.52 l-195.733,195.52c-4.16,4.16-4.16,10.88,0,15.04l42.347,42.24c4.16,4.16,10.88,4.16,15.04,0l245.653-245.333 C411.713,259.44,411.713,252.613,407.553,248.453z M154.327,486.32l-27.307-27.2L322.753,263.6c4.16-4.16,4.16-10.88,0-15.04 L127.127,53.04l27.307-27.2L384.94,256.027L154.327,486.32z">
                </path>
            </g>
        </g>
    </svg>
</template>
