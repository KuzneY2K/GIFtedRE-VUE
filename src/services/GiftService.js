import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Gift } from "../models/Gift.js"

class GiftService {

    async getGifts() {
        let res = await api.get('api/gifts')
        AppState.gifts = res.data.map(gift => new Gift(gift))
        logger.log(AppState.gifts)
    }

    async submitGift(data) {
        let res = await api.post('api/gifts', data)
        let newGift = new Gift(res.data)
        AppState.gifts.push(newGift)
    }

    async openGift(giftId) {
        let foundGift = AppState.gifts.find(gift => gift.id == giftId)
        foundGift.opened = true
        const res = await api.put(`api/gifts/${foundGift.id}`, foundGift)
        let openedGift = new Gift(res.data)
        logger.log(openedGift.opened)
    }

}

export const giftService = new GiftService()