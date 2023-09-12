<template>
  <section class="row p-0 m-0">
    <!-- GIFT CARDS -->
    <div class="col-md-8 offset-4 p-0">
      <section class="row p-0 m-0">
        <div class="col-4 p-3 m-0 container-fluid" v-for="gift in gifts" :key="gift">
          <div class="card">
            <img class="img-fluid" :src="gift.gifUrl" />
            <div class="card-body">
              <p class="card-text"> {{ gift.message }}
              </p>
              <a href="#!" class="btn btn-primary">Button</a>
            </div>
          </div>
        </div>
      </section>
    </div>
    <!-- FORM CONTAINER -->
  </section>
  <div class="btn-container d-flex justify-content-center mt-5">
    <button class="btn btn-success" @click="getGifts()">Get GIFTS</button>
  </div>
</template>

<script>
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { giftService } from '../services/GiftService.js'
import { AppState } from '../AppState.js'
import { computed, onMounted } from 'vue';

export default {
  setup() {
    async function getGifts() {
      try {
        logger.log('Getting Gifts')
        await giftService.getGifts()
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(getGifts)
    return {
      gifts: computed(() => AppState.gifts),
    }

  }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
</style>
