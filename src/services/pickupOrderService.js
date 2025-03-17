const { v4: uuidv4 } = require('uuid');
const { create, getById, getAll } = require('../repositories/pickupOrderRepository');
const { getSupplierById } = require('../services/supplierService');
const { getPurchaserOrderById } = require('../services/purchaserOrderService');
const { getDistributionCenterById } = require('../services/distributionCenterService');
const { getDroneById } = require('../services/droneService');

const createPickupOrder = async (data) => {
    const supplier = await getSupplierById(data.supplierId);
    if (!supplier) {
        throw new Error('Supplier not found');
    }
    const purchaserOrder = await getPurchaserOrderById(data.purchaserOrderId);
    if (!purchaserOrder) {
        throw new Error('Purchaser Order not found');
    }
    const distributionCenter = await getDistributionCenterById(data.distributionCenterId);
    if (!distributionCenter) {
        throw new Error('Distribution Center not found');
    }
    
    const pickupOrder = {
        pickupOrderId: uuidv4(),
        supplierId: data.supplierId,
        purchaserOrderId: data.purchaserOrderId,
        distributionCenterId: data.distributionCenterId,
        droneId: data.droneId,
        pickUpLocation: data.pickUpLocation,
        destinationLocation: data.destinationLocation,
        status: data.status,
        createdAt: new Date().toISOString(),
    };
    return await create(pickupOrder);
}

const getPickupOrderById = async (pickupOrderId) => {
    return await getById(pickupOrderId);
}

const getAllPickupOrders = async () => {
    return await getAll();
}

module.exports = {
    createPickupOrder,
    getPickupOrderById,
    getAllPickupOrders,
};