const { v4: uuidv4 } = require('uuid');
const { create, getById, getAll } = require('../repositories/purchaseOrderRepository');
const { getCustomerById } = require('./customerService');
const { getSupplierById } = require('./supplierService');

const createPurchaseOrder = async (data) => {

    const customer = await getCustomerById(data.customerId);
    if (!customer) {
        throw new Error('Customer not found');
    }

    const supplier = await getSupplierById(data.supplierId);
    if (!supplier) {
        throw new Error('Supplier not found');
    }

    const purchaseOrder = {
        purchaseOrderId: uuidv4(),
        products: data.products,
        amount: data.amount,
        status: data.status,
        shippingLocation: data.shippingLocation,
        customerId: data.customerId,
        supplierId: data.supplierId,
        createdAt: new Date().toISOString(),
    };
    return await create(purchaseOrder);
}

const getPurchaseOrderById = async (purchaseOrderId) => {
    return await getById(purchaseOrderId);
}

const getAllPurchaseOrders = async () => {
    return await getAll();
}

module.exports = {
    createPurchaseOrder,
    getPurchaseOrderById,
    getAllPurchaseOrders,
};