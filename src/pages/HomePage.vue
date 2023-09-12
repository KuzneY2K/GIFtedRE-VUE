<template>
  <div class="col-4 gift-cont p-0 m-0">

  </div>
</template>

<script>
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { giftService } from '../services/GiftService.js'

export default {
  setup() {
    return {
      async getGifts() {
        try {
          logger.log('Getting Gifts')
          await giftService.getGifts()
        } catch (error) {
          Pop.error(error)
        }
      }
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
