"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class SequelizeNotificationListFetchingService {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    // async getShops(offset: number, limit: number): Promise<Shop[]> {
    //   const seqShops = await SequelizeShop.findAll({ offset, limit })
    //   const shops: Shop[] = _.map(seqShops, (shop: SequelizeShop): Shop => {
    //     return {
    //       id: shop.id,
    //       name: shop.shopName,
    //       imageURL: shop.thumbnailImageURL,
    //       address: shop.address,
    //     }
    //   })
    //   return shops
    // }
    getNotificationList(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO
            return [
                {
                    id: '1',
                    title: 'Notification 1',
                    description: 'Notification 1 description',
                    dateString: '28/08/2567',
                    imageURL: 'https://images.unsplash.com/photo-1532710093739-9470acff878f?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                },
                {
                    id: '2',
                    title: 'Notification 2',
                    description: 'Notification 2 description',
                    dateString: '01/07/2567',
                    imageURL: 'https://images.unsplash.com/photo-1593702288056-7927b442d0fa?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                },
                {
                    id: '3',
                    title: 'Notification 3',
                    description: 'Notification 3 description',
                    dateString: '20/05/2567',
                    imageURL: 'https://images.unsplash.com/photo-1532710093739-9470acff878f?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                },
            ];
        });
    }
}
exports.default = SequelizeNotificationListFetchingService;
