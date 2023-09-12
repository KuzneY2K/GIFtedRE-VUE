import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"
import { Gift } from "../models/Gift.js"

class GiftService {

    async getGifts() {
        let res = await api.get('api/gifts')
        AppState.gifts = res.data.map(gift => new Gift(gift))
        logger.log(AppState.gifts[3])
    }

}

export const giftService = new GiftService()