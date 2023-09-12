<template>
  <section class="row p-0 m-0">
    <!-- FORM CONTAINER -->
    <div class="col-md-4 col-12 p-0 m-0">
      <h3 class="text-center mt-3">
        SEND EVERYONE A GIFT
      </h3>
      <form class="p-0 m-0 p-3" @submit.prevent="submitGift">
        <SearchForm />
        <div class="form-outline mt-3">
          <input v-model="url" type="url" id="url" name="url" class="form-control" />
          <label class="form-label" for="url">URL input</label>
        </div>
        <div class="form-outline mt-3">
          <textarea v-model="tag" class="form-control" id="tag" name="tag" rows="4"></textarea>
          <label class="form-label" for="tag">Message</label>
        </div>
        <div class="btn-container text-center mt-3">
          <button type="submit" class="btn btn-success">SUBMIT GIFT</button>
        </div>
      </form>
    </div>
    <!-- GIFT CARDS -->
    <div class="col-md-8 col-12 p-0">
      <section class="row p-0 m-0">
        <div class="col-md-4 col-12 p-3 m-0 container-fluid" v-for="gift in gifts" :key="gift">
          <div class="card">
            <img class="img-fluid" :src="gift.gifUrl" />
            <div class="card-body">
              <p class="card-text"> {{ gift.message }}
              </p>
              <a href="#" class="btn btn-primary" @click="openGift(gift.id)" v-if="gift.opened == false">OPEN GIF(t)</a>
              <a href="#" class="btn btn-primary" v-if="gift.opened == true">THANK YOU</a>
            </div>
          </div>
        </div>
      </section>
    </div>
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
import { computed, onMounted, ref } from 'vue';

export default {
  setup() {
    const url = ref('')
    const tag = ref('')
    async function getGifts() {
      try {
        logger.log('Getting Gifts')
        await giftService.getGifts()
      } catch (error) {
        Pop.error(error)
      }
    }

    async function openGift(giftId) {
      logger.log(`[OPENING GIFT ID]: ${giftId}`)
      await giftService.openGift(giftId)
      location.reload()
    }

    async function submitGift() {
      try {
        logger.log('[GIFT SUBMITTED]')
        let data = {
          url: url.value,
          tag: tag.value
        }
        await giftService.submitGift(data)
        location.reload()
      } catch (error) {
        Pop.error(error)
      }
    }
    onMounted(getGifts)
    return {
      gifts: computed(() => AppState.gifts),
      submitGift,
      openGift,
      url,
      tag
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
