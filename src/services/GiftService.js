import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class GiftService {

    async getGifts() {
        let res = await api.get('api/gifts')
        logger.log(res.data)
    }

}

export const giftService = new GiftService()