import { Address } from "../models/index.js";
import { Errors } from "../utils/ApiError.js";

class AddressService {
  static async createAddress(data) {
    const addressExists = await Address.findOne({
      where: { ...data },
    });

    if (addressExists) {
      throw Errors.badRequest("Address already exists");
    }

    return await Address.create(data);
  }
}

export default AddressService;
